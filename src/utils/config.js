/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = process.env.PORT || 3001;

export default { url, PORT };
