"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useNotes } from "@/context/NotesContext";

const RemoveBtn = ({ id }) => {
  const { fetchNotes } = useNotes()

  const deleteNote = async () => {
    const confirmed = confirm("Are you sure you want to delete the note?");
    if (confirmed) {
      const res = await fetch(`api/notes?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchNotes()
      }
    }
  };

  return (
    <button onClick={deleteNote} className="text-red-500">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
