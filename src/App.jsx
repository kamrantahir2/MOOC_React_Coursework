/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Note } from "./components/Note";
import login from "./services/login.js";
import noteService from "./services/notes.js";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm.jsx";
import { NoteForm } from "./components/NoteForm.jsx";
import { Togglable } from "./components/Togglable.jsx";
import noteReducer from "./reducers/noteReducer.js";

import { createStore } from "redux";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
      console.log(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // const addNote = (noteObject) => {
  //   noteFormRef.current.toggleVisibility();
  //   noteService.create(noteObject).then((returnedNote) => {
  //     setNotes(notes.concat(returnedNote));
  //   });
  // };

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    });
    console.log(store.getState());
  };

  const toggleImportance = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      payload: { id },
    });
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
      .catch(() => {
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };
  const noteFormRef = useRef();

  const noteForm = () => {
    return (
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    noteService.setToken(null);
    setUser(null);
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : noteForm()}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
      {/* <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note._id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note._id)}
            />
          );
        })}
      </ul> */}
      <button onClick={handleLogout}>Logout</button>
      <Footer />
    </div>
  );
};

export default App;
