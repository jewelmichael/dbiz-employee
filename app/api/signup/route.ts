// src/app/api/signup/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs"; // run: npm i bcryptjs

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCollection = db.collection("Users");

    // Check if user already exists
    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password before saving
    const hashed = await bcrypt.hash(password, 10);

    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { ok: true, userId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
