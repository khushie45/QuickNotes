"use client";

import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "./RemoveBtn";
import { useState } from "react";
import EditNoteForm from "./EditNoteForm";
import { useNotes } from "@/context/NotesContext";

const NotesList = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const { notes, updateNote } = useNotes();

  const openModal = (note) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  return (
    <>
      {notes.map((note) => (
        <div
          key={note._id}
          className="p-4 mx-10 border border-slate-300 rounded-md flex justify-between gap-5 my-4"
        >
          <div>
            <h2 className="font-bold text-xl">{note.title}</h2>
            <p>{note.description}</p>
          </div>

          <div className="flex items-start gap-2">
            <HiPencilAlt size={24} onClick={() => openModal(note)} />
            <RemoveBtn id={note._id} />
          </div>
        </div>
      ))}
      {selectedNote && (
        <EditNoteForm
          closeModal={closeModal}
          note={selectedNote}
          updateNote={updateNote}
        />
      )}
    </>
  );
};

export default NotesList;
