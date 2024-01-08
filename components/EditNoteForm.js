"use client";

import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const EditNoteForm = ({ closeModal, note, updateNote }) => {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newDescription, setNewDescription] = useState(note.description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert("Title and description are required.");
      return;
    }

    try {
      const updatedNote = {
        _id: note._id,
        newTitle: newTitle,
        newDescription: newDescription,
      };
      await updateNote(updatedNote);
      closeModal();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
        <div className="rounded-lg shadow-lg p-4 border-2 border-green-600">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-3 mx-2 mt-2 md:mx-10 md:mt-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Edit title and description:</p>
              <button onClick={closeModal}>
                <RxCross2 size={22} />
              </button>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              name="description"
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button className="bg-green-600 text-white font-bold px-6 py-2 w-fit mt-2">
              Update Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditNoteForm;
