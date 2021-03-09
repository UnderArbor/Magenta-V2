import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

if (process.env.NODE_ENV !== 'production') {
axios.defaults.baseURL = "http://localhost:3000";
}

axios.defaults.headers.post["Content-Type"] = "application/json";

import "./css/reset.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
