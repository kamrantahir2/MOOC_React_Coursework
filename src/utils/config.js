/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

// const url = process.env.MONGODB_URI;
const url = process.env.TEST_MONGODB_URI;

const PORT = process.env.PORT || 3001;

export default { url, PORT };
