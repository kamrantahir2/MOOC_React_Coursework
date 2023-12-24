import "./App.css";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n._id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(() => {
        noteService.getAll().then((initialNotes) => {
          setNotes(initialNotes);
          console.log(initialNotes);
        });
      })
      .catch((error) => {
        setErrorMessage(
          `Note ${note.content} was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
    console.log(notes);
  };

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
      console.log(initialNotes);
    });
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note._id)}
            />
          );
        })}
      </ul>

      <div>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default App;
