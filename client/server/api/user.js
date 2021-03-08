const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../..//src/models/User");
const Deck = require("../../src/models/Deck");
const { JsonWebTokenError } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("userName", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errors: ", errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        userName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.delete("/all", async (req, res) => {
  try {
    await User.deleteMany({}, async function (err) {
      if (err) {
        res.status(500).send({ error: "Could not clear user database..." });
      } else {
        Deck.deleteMany({}, function (err) {
          if (err) {
            res.status(500).send({ error: "Could not clear deck database..." });
          } else {
            res
              .status(200)
              .send({ message: "All user info was deleted succesfully..." });
          }
        });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
