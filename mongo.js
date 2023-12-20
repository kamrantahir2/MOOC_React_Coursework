import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const url = `mongodb+srv://kamrantahir117:${process.env.PASSWORD}@cluster0.qkxhsol.mongodb.net/noteApp?retryWrites=true&w=majority`;

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
