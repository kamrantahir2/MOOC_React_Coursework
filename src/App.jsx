/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { useState, useEffect, useRef } from "react";
// import { Note } from "./components/Note";
import login from "./services/login.js";
import noteService from "./services/notes.js";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm.jsx";
import { NoteForm } from "./components/NoteForm.jsx";
import { Togglable } from "./components/Togglable.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Alert, Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const Home = ({ user }) => {
  return (
    <div>
      <h2>Notes App</h2>
      <h3>Logged in as {user}</h3>
    </div>
  );
};

const Note = ({ notes }) => {
  const { id } = useParams();

  const note = notes.find((n) => n._id === id);
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user.username}</div>
      <div>
        <strong>{note.important ? "important" : ""}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes, setNotes }) => {
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map((note) => {
            return (
              <tr key={note._id}>
                <td>
                  <Link to={`/notes/${note._id}`}>{note.content}</Link>
                </td>
                <td>{note.user.username}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ul></ul>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log(initialNotes);
      setNotes(initialNotes);
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

  // console.log("notes", notes);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`Welcome ${user.username}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
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
          {/* <button onClick={() => setLoginVisible(false)}>Cancel</button> */}
        </div>
      </div>
    );
  };

  const handleCancel = () => {
    return setLoginVisible(false);
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

  // return (
  //   <div>
  //     <h1>Notes</h1>
  //     <Notification message={errorMessage} />
  // {user === null ? loginForm() : noteForm()}
  //     <div>
  //       <button onClick={() => setShowAll(!showAll)}>
  //         show {showAll ? "important" : "all"}
  //       </button>
  //     </div>
  //     <ul>
  //       {notesToShow.map((note) => {
  //         return (
  //           <Note
  //             key={note._id}
  //             note={note}
  //             toggleImportance={() => toggleImportanceOf(note._id)}
  //           />
  //         );
  //       })}
  //     </ul>
  // <button onClick={handleLogout}>Logout</button>
  //     <Footer />
  //   </div>
  // );

  const padding = {
    padding: 5,
  };

  const userLogin = async () => {
    const navigate = useNavigate();

    await handleLogin();

    navigate("/");
  };

  return (
    <div className="container">
      {message && <Alert variant="success">{message}</Alert>}
      <Router>
        <Navbar collapseOnSelect bg="dark" variant="dark" className="p-3">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  Home
                </Link>{" "}
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/notes">
                  Notes
                </Link>{" "}
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  Users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ? (
                  <em>{user.username} logged in</em>
                ) : (
                  <Link style={padding} to="/login">
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/notes/:id" element={<Note notes={notes} />} />
          <Route
            path="/notes"
            element={<Notes notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/login"
            element={
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={userLogin}
                handleCancel={handleCancel}
              />
            }
          />
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate replace to="/login" />}
          />
          <Route path="/" element={<Home user={user.username} />} />
        </Routes>
        <button onClick={handleLogout}>Logout</button>
      </Router>
    </div>
  );
};

export default App;
