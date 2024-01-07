import Note from "../models/note";
import User from "../models/user";

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

export default { initialNotes, nonExistingId, notesInDb, usersInDb };
