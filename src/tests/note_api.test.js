import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Note from "../models/note.js";
const api = supertest(app);
import helper from "./test_helper.js";

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(helper.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only JavaScript");
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };
  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  const contents = notesAtEnd.map((r) => r.content);
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);
  expect(contents).toContain("async/await simplifies making async calls");
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

test("a specific note can be viewed", async () => {
  const notesAtStart = await helper.notesInDb();
  //   console.log("notesAtStart = ", notesAtStart);
  const noteToView = notesAtStart[0];

  console.log("ID = ", noteToView);
  noteToView._id = noteToView._id.toString();

  const resultNote = await api
    .get(`/api/notes/${noteToView._id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  console.log("resultNote: ", resultNote.body);

  expect(resultNote.body).toEqual(noteToView);
});

afterAll(async () => {
  await mongoose.connection.close();
});
