import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const url = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = {
  content: String,
  important: Boolean,
};

const Note = mongoose.model("note", noteSchema);

const note = new Note({
  content: "Mongoose makes things easy",
  important: true,
});

note.save().then((result) => {
  console.log("Note saved");
  mongoose.connection.close();
});
