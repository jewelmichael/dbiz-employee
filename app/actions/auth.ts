"use server";

import { getDb } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  type FormState,
  LoginFormSchema,
  type LoginFormState,
} from "@/app/lib/definitions";
import { createSessionToken } from "@/app/lib/auth";

/**
 * SIGNUP ACTION
 */
export async function signup(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        name: fieldErrors.name,
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
      message: "Please fix the errors below.",
    };
  }

  const { name: validName, email: validEmail, password: validPassword } =
    validatedFields.data;

  const db = await getDb();
  const users = db.collection("users");

  const existing = await users.findOne({ email: validEmail });
  if (existing) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
      message: "User with this email already exists.",
    };
  }

  const hashed = await bcrypt.hash(validPassword, 10);

  await users.insertOne({
    name: validName,
    email: validEmail,
    password_hashed: hashed,
    role: "employee",
    failedLoginAttempts: 0,
    lockUntil: null,
    createdAt: new Date(),
  });

  return {
    errors: undefined,
    message: "Signup successful!",
  };
}

/**
 * LOGIN ACTION
 * - Zod validation
 * - 5 failed attempts → lock 10 minutes
 * - JWT in HttpOnly cookie (stateless session)
 * - Redirects to /dashboard on success
 */
export async function login(
  _state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
      message: "Please fix the errors below.",
    };
  }

  const { email: validEmail, password: validPassword } = validatedFields.data;

  const db = await getDb();
  const users = db.collection("users");

  const user = await users.findOne<{
    _id: any;
    email: string;
    password_hashed: string;
    role?: string;
    failedLoginAttempts?: number;
    lockUntil?: Date | null;
  }>({ email: validEmail });

  // Don't leak if email exists or not
  if (!user) {
    return {
      errors: {
        general: ["Invalid email or password"],
      },
      message: "Invalid email or password.",
    };
  }

  const now = new Date();

  // Check lock
  if (user.lockUntil && user.lockUntil > now) {
    const remainingMs = user.lockUntil.getTime() - now.getTime();
    const remainingMin = Math.ceil(remainingMs / 60000);

    return {
      errors: {
        general: [
          `Too many failed attempts. Try again in ${remainingMin} minute(s).`,
        ],
      },
      message: "Account temporarily locked.",
    };
  }

  const passwordOk = await bcrypt.compare(
    validPassword,
    user.password_hashed
  );

  if (!passwordOk) {
    const currentFailed = user.failedLoginAttempts ?? 0;
    const newFailed = currentFailed + 1;

    if (newFailed >= 5) {
      const lockUntil = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            failedLoginAttempts: 0,
            lockUntil,
          },
        }
      );
    } else {
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            failedLoginAttempts: newFailed,
          },
        }
      );
    }

    return {
      errors: {
        general: ["Invalid email or password"],
      },
      message: "Invalid email or password.",
    };
  }

  // Success → reset counters
  await users.updateOne(
    { _id: user._id },
    { $set: { failedLoginAttempts: 0, lockUntil: null } }
  );

  const role = user.role || "employee";

  const token = await createSessionToken({
    userId: user._id.toString(),
    role,
  });

  const cookieStore = await cookies()
  const cookieData = cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/dashboard");

  // not actually reached, but TS wants a return type
  return {
    errors: undefined,
    message: "Logged in successfully.",
  };
}
