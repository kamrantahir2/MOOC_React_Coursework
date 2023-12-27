/* eslint-disable no-undef */
import dotenv from "dotenv";

dotenv.config();

const password = process.env.PASSWORD;

const url = `mongodb+srv://kamrantahir117:${password}@cluster0.qkxhsol.mongodb.net/noteApp?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3001;

export default { url, PORT };
