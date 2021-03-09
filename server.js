const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const DIST_DIR = path.join(__dirname, "./client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(DIST_DIR));

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Define Routes
app.use("/api/auth", require("./client/server/api/auth"));
app.use("/api/user", require("./client/server/api/user"));
app.use("/api/deck", require("./client/server/api/deck"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(DIST_DIR));

  app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
  });
}

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("App listening on port: " + port);
  }
});
