import Note from "@/models/notes";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
  try {
    const { title, description } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    await Note.create({ title, description, email: userEmail });

    return NextResponse.json(
      { message: "Note added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occured while adding a new note." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const notes = await Note.find({ email: userEmail });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occured while fetching all notes." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await Note.findByIdAndDelete(id);

    return NextResponse.json({ message: "Note deleted." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occured while deleting the note." },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { newTitle, newDescription } = await req.json();

    await Note.findByIdAndUpdate(id, {
      title: newTitle,
      description: newDescription,
    });

    return NextResponse.json({ message: "Note updated." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occured while updating the note." },
      { status: 500 }
    );
  }
};
