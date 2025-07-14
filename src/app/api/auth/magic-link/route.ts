import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user exists, if not create them
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email },
      });
    }

    // Generate magic link token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    // Store verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // In production, send this via email
    // For now, we'll log it
    const magicLink = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}&email=${email}`;
    
    console.log("Magic link for", email, ":", magicLink);

    // In production, integrate with your email service
    // Example with your ConvertKit setup:
    /*
    if (process.env.CONVERTKIT_API_KEY) {
      // Send email via ConvertKit broadcast or your preferred email service
    }
    */

    return NextResponse.json({
      message: "Check your email for the magic link!",
      // In development, include the link
      ...(process.env.NODE_ENV === "development" && { magicLink }),
    });
  } catch (error) {
    console.error("Magic link error:", error);
    return NextResponse.json(
      { error: "Failed to send magic link" },
      { status: 500 }
    );
  }
}