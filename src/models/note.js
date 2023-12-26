import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const password = process.env.PASSWORD;

const url = `mongodb+srv://kamrantahir117:${password}@cluster0.qkxhsol.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJson", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("note", noteSchema);

export default Note;
