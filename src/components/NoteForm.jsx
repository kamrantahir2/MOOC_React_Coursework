import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("a new note...");

  const addNote = (event) => {
    event.preventDefault();

    if (newNote.content === "") {
      return;
    } else {
      createNote({
        content: newNote,
        important: Math.random() < 0.5,
      });
      setNewNote("");
    }
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => {
            setNewNote(event.target.value);
          }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
