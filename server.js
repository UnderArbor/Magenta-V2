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

//UPDATE CARD LIST
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

//UPDATE COMMANDER LIST
// cron.schedule("* * * * *", async () => {
//   var commanderArray = [];
//   var next_page = undefined;
//   await fetch("https://api.scryfall.com/cards/search?q=is:commander")
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       next_page = json.next_page;
//       for (var i = 0; i < json.data.length; ++i) {
//         commanderArray.push({
//           name: json.data[i].name,
//           partner:
//             json.data[i].oracle_text !== undefined &&
//             json.data[i].oracle_text.includes("Partner"),
//         });
//       }
//     });

//   while (next_page !== undefined) {
//     await fetch(next_page)
//       .then((response) => {
//         return response.json();
//       })
//       .then((json) => {
//         next_page = json.next_page;
//         for (var i = 0; i < json.data.length; ++i) {
//           commanderArray.push({
//             name: json.data[i].name,
//             partner:
//               json.data[i].oracle_text !== undefined &&
//               json.data[i].oracle_text.includes("Partner"),
//           });
//         }
//       });
//   }
//   fs.writeFile(
//     "./client/src/utils/json/commanders.json",
//     JSON.stringify(commanderArray),
//     (err) => {
//       if (err) {
//         console.log("Error writing file", err);
//       } else {
//         console.log("Successfully wrote file");
//       }
//     }
//   );
// });

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

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("App listening on port: " + port);
  }
});
