const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const fetch = require("node-fetch");
const fs = require("fs");

const DIST_DIR = path.join(__dirname, "./client/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(DIST_DIR));

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add Cron Scheduler For Database Updates

// Define Routes
app.use("/api/auth", require("./server/api/auth"));
app.use("/api/user", require("./server/api/user"));
app.use("/api/deck", require("./server/api/deck"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(DIST_DIR));

  app.get("*", (req, res) => {
    res.sendFile(HTML_FILE);
  });
}

// cron.schedule("* * * * *", async () => {
//   await fetch("https://api.scryfall.com/catalog/card-names")
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       const cardNames = JSON.stringify(json.data);
//       fs.writeFile("./client/src/utils/json/names.json", cardNames, (err) => {
//         if (err) {
//           console.log("Error writing file", err);
//         } else {
//           console.log("Successfully wrote file");
//         }
//       });
//     });
// });

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("App listening on port: " + port);
  }
});
