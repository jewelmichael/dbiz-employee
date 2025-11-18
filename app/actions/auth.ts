"use server";

import { getDb } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { SignupFormSchema, FormState } from '@/app/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const db = await getDb();
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    throw new Error("User with this email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashed,
    createdAt: new Date(),
  });

  // On success, go somewhere (home, login, dashboard, etc.)
  redirect("/signup-success");
  // Call the provider or db to create a user...
}