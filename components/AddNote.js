"use client";

import { HiOutlinePlus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useNotes } from "@/context/NotesContext";

const AddNote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { fetchNotes } = useNotes();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("api/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        fetchNotes();
      } else {
        throw new Error("Failed to create a new note.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-10 pt-4 text-lg"
        onClick={openModal}
      >
        <HiOutlinePlus />
        Add note
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="rounded-lg shadow-lg p-4 border-2 border-green-600">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 mx-2 mt-2 md:mx-10 md:mt-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">Add title and description:</p>
                <button onClick={closeModal}>
                  <RxCross2 size={22} />
                </button>
              </div>
              <input
                type="text"
                name="addTitle"
                id="addTitle"
                placeholder="Add Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <input
                type="text"
                name="addDescription"
                id="addDescription"
                placeholder="Add Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <button className="bg-green-600 text-white font-bold px-6 py-2 w-fit my-2">
                Add Note
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNote;
