import express from "express";
const app = express();
import notesRouter from "./controllers/notes.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import cors from "cors";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose
  .connect(config.url)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/notes", notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.use("/api/notes", notesRouter);
export default app;
