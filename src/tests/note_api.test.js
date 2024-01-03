import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 notes", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  expect(response.body[0].content).toBe("HTML is easy");
});

afterAll(async () => {
  await mongoose.connection.close();
});
