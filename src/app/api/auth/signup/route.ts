import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = signupSchema.parse(body);

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await createUser(email, password, name);

    // Also add to ConvertKit if configured
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      try {
        const { createConvertKitClient } = await import("@/lib/convertkit");
        const convertkit = createConvertKitClient();
        await convertkit.addSubscriberWithWebhook(email, process.env.CONVERTKIT_FORM_ID);
      } catch (error) {
        console.error("ConvertKit error during signup:", error);
      }
    }

    return NextResponse.json(
      { 
        message: "Account created successfully! Please sign in.",
        user: { id: user.id, email: user.email, name: user.name }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}