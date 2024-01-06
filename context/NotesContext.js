"use client"

import { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();

      if (response.ok) {
        setNotes(data.notes);
      } else {
        console.error("Error fetching notes:", data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const response = await fetch(`/api/notes/?id=${updatedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        fetchNotes();
      } else {
        console.error("Error updating note:", await response.json());
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, fetchNotes, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
