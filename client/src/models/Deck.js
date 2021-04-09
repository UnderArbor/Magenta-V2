const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeckSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  format: {
    type: String,
  },
  boards: [
    {
      name: { type: String },
      boardTypes: [
        {
          name: {
            type: String,
          },
          open: {
            type: Boolean,
          },
          cards: [
            {
              name: {
                type: String,
              },
              quantity: {
                type: Number,
              },
              setName: {
                type: String,
              },
              cardArt: {
                type: String,
              },
              cardImage: {
                type: String,
              },
              cmc: {
                type: Number,
              },
              modifiedCMC: [{ type: Number }],
              manaCost: [
                {
                  type: String,
                },
              ],
              secondManaCost: [
                {
                  type: String,
                },
              ],
              mainType: {
                type: String,
              },
              types: [
                {
                  type: String,
                },
              ],
              modifiedTypes: [{ type: String }],
              subtypes: [
                {
                  type: String,
                },
              ],
              colors: [
                {
                  type: String,
                },
              ],
              tokens: [
                {
                  name: { type: String },
                  image: { type: String },
                  cardImage: { type: String },
                  parentName: { type: String },
                },
              ],
              secondCard: {
                name: { type: String },
                cardArt: { type: String },
                cardImage: { type: String },
                cmc: { type: Number },
                manaCost: [
                  {
                    type: String,
                  },
                ],
                types: [
                  {
                    type: String,
                  },
                ],
                modifiedTypes: [{ type: String }],
                subtypes: [
                  {
                    type: String,
                  },
                ],
                colors: [
                  {
                    type: String,
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
  picture: {
    type: String,
  },
  colors: {
    red: {
      type: Number,
    },
    blue: {
      type: Number,
    },
    green: {
      type: Number,
    },
    white: {
      type: Number,
    },
    black: {
      type: Number,
    },
  },
  displaySettings: {
    displayMana: {
      type: Boolean,
    },
    displayQuantity: {
      type: Boolean,
    },
    displayName: {
      type: Boolean,
    },
    displayIndicator: {
      type: Boolean,
    },
    cardSize: {
      type: Number,
    },
  },
  toolBooleans: {
    manaCurve: {
      type: Boolean,
    },
    displaySettings: {
      type: Boolean,
    },
  },
});

module.exports = Deck = mongoose.model("Deck", DeckSchema);
