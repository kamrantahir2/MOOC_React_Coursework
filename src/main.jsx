import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { createStore } from "redux";

import noteReducer from "./reducers/noteReducer.js";

const store = createStore(noteReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
