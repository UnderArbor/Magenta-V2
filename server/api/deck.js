const express = require("express");
const config = require("config");
const auth = require("../../client/src/utils/middleware/auth");
const fs = require("fs");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const SCRYFALL_API = config.get("ScryFallAPI");

const Deck = require("../../client/src/models/Deck");
const User = require("../../client/src/models/User");

//Fetch All Decks
router.get("/", async (req, res) => {
  try {
    const decks = await Deck.find();
    res.json(decks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Download Deck
router.get("/download", async (req, res) => {
  try {
    res.download(__dirname + "/../../testFile.txt", (error) => {
      if (error !== undefined) {
        console.log("Error : ", error);
      }
    });

    return res;
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Write deck into file
router.post("/writeFile", async (req, res) => {
  try {
    const { cardArray } = req.body;
    fs.writeFile("./testFile.txt", cardArray, (err) => {
      if (err) {
        console.log("Error writing file", err);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Fetch Deck
router.get("/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId });
    if (deck) {
      return res.json(deck);
    } else {
      return res.status(400).json({ msg: "Deck does not exist" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Create New Deck
router.post("/init", async (req, res) => {
  const { user, deckName, deckFormat } = req.body;

  const name = deckName !== "" ? deckName : `New Deck ${user.decks.length + 1}`;

  try {
    var newDeck = new Deck({
      name: name,
      format: deckFormat,
      picture: false,
      boards: [
        { name: "Mainboard", boardTypes: [] },
        { name: "Sideboard", boardTypes: [] },
        { name: "Maybepile", boardTypes: [] },
      ],
      user: user,
      displaySettings: {
        displayMana: true,
        displayQuantity: true,
        displayIndicator: false,
        displayName: true,
        cardSize: 100,
        sortCategory: "Types",
      },
    });

    await newDeck.save();

    var thisUser = await User.findById(user).select("-password");
    thisUser.decks.unshift(newDeck.id);
    await thisUser.save();

    res.json(newDeck);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Create New Deck
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { boards, deckInfo, user } = req.body;

  try {
    var newDeck = new Deck({
      name: deckInfo.deckName,
      format: deckInfo.deckFormat,
      picture: deckInfo.deckImage,
      boards: boards,
      user: user,
    });

    await newDeck.save();

    var thisUser = await User.findById(user).select("-password");
    thisUser.decks.unshift(newDeck.id);
    await thisUser.save();

    res.json(newDeck);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Update Deck Cards
router.put("/boardChange/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId });
    const { boards } = req.body;

    deck.boards = boards;
    await deck.save();
    return res.json(deck);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Update Tool Info
router.put("/toolChange/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId });
    const { displaySettings } = req.body;

    deck.displaySettings = displaySettings;
    await deck.save();
    return res.json(deck);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Update Deck Info
router.put("/infoChange/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId });
    const info = req.body;
    deck.name = info.deckName;
    deck.format = info.deckFormat;
    deck.picture = info.deckImage;
    await deck.save();
    return res.json(info);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//Delete All Decks
router.delete("/deleteAll", async (req, res) => {
  try {
    Deck.deleteMany({}, function (err) {
      if (err) {
        res.status(500).send({ error: "Could not clear deck database..." });
      } else {
        res
          .status(200)
          .send({ message: "All user info was deleted succesfully..." });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Delete One Deck
router.delete("/:deckId", async (req, res) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.deckId }, function (err) {
      if (err) console.log(err);
      else console.log("deck found");
    });

    const user = await User.findById(deck.user);

    const removeIndex = await user.decks
      .map((deck) => deck._id)
      .indexOf(req.params.deckId);
    await user.decks.splice(removeIndex, 1);

    await user.save();

    await Deck.findOneAndDelete({ _id: req.params.deckId }, function (err) {
      if (err) console.log(err);
      else console.log("successful deletion");
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
