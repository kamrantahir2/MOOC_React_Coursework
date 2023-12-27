/* eslint-disable no-undef */
import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(config.url)
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
