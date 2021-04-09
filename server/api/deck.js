const express = require("express");
const config = require("config");
const auth = require("../../client/src/utils/middleware/auth");
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

router.post("/init", async (req, res) => {
  const { user, deckName, deckFormat } = req.body;

  const name = deckName !== "" ? deckName : `New Deck ${user.decks.length + 1}`;

  try {
    var newDeck = new Deck({
      name: name,
      format: deckFormat,
      picture:
        "https://images.pexels.com/photos/1376766/nature-milky-way-galaxy-space-1376766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
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
      },
      toolBooleans: {
        manaCurve: true,
        displaySettings: true,
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
    const { boardTypes, index } = req.body;

    deck.boards[index].boardTypes = boardTypes;
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
    const { displaySettings, toolBooleans } = req.body;

    if (displaySettings !== undefined) {
      deck.displaySettings = displaySettings;
    }
    if (toolBooleans !== undefined) {
      deck.toolBooleans = toolBooleans;
    }
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

module.exports = router;
