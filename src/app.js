import express from "express";
const app = express();
import notesRouter from "./controllers/notes.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

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
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
