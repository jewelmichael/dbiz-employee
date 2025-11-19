// app/lib/definitions.ts
import * as z from "zod";

/**
 * SIGNUP
 */
export const SignupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email." }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
});

// used by signup (your existing usage)
export type FormState =
  | {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

/**
 * LOGIN
 */
export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required." }),
});

export type LoginFormState =
  | {
    errors?: {
      email?: string[];
      password?: string[];
      general?: string[];
    };
    message?: string;
  }
  | undefined;
