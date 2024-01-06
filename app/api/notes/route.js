import Note from "@/models/notes";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { title, description } = await req.json();

  await Note.create({ title, description });

  return NextResponse.json(
    { message: "Note added successfully" },
    { status: 201 }
  );
};

export const GET = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const note = await Note.findOne({ _id: id });
    return NextResponse.json({ note }, { status: 200 });
  } else {
    const notes = await Note.find();
    return NextResponse.json({ notes });
  }
};

export const DELETE = async (req) => {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: "Note deleted." }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
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
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
