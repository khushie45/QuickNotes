import mongoose, { Schema, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = models.Notes || mongoose.model("Notes", NoteSchema);

export default Note;
