import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
};
