import fetch from "node-fetch";

import cardTypes from "../json/cardTypes.json";

const SCRYFALL_API = "https://api.scryfall.com";

const getCardInfo = async (name, quantity) => {
  try {
    if (!quantity) {
      quantity = 1;
    }
    let cardName = name.replace(/\s*$/, "");
    let imageURL = "";
    let cardImageURL = "";
    let cmc = "";
    let manaCost = "";
    let types = ["", ""];
    let colors = "";
    let set = "";
    let tokens = [];
    let secondCard = {
      name: "",
      imageURL: "",
      cardImageURL: "",
      cmc: "",
      manaCost: "",
      types: ["", ""],
      colors: "",
    };

    await fetch(`${SCRYFALL_API}/cards/named?exact=${name}`)
      .then((response) => {
        return response.json();
      })
      .then(async (json) => {
        //Get card info
        set = json.set_name;

        let secondJSON = null;
        if (!json.image_uris) {
          secondJSON = json.card_faces[1];
          json = json.card_faces[0];
        }
        imageURL = json.image_uris.art_crop;
        cardImageURL = json.image_uris.normal;
        cmc = json.cmc;
        manaCost = json.mana_cost;
        types = json.type_line.split("—");
        colors = json.colors;

        //Get Second Card
        if (secondJSON !== null) {
          const names = cardName.split(" // ");
          // cardName = names[0];
          secondCard.name = names[1];
          secondCard.imageURL = secondJSON.image_uris.art_crop;
          secondCard.cardImageURL = secondJSON.image_uris.normal;
          secondCard.cmc = secondJSON.cmc;
          secondCard.manaCost = secondJSON.mana_cost;
          secondCard.types = secondJSON.type_line.split("-");
          secondCard.colors = secondJSON.colors;
        }

        //Get Tokens
        if (json.all_parts) {
          for (var i = 0; i < json.all_parts.length; ++i) {
            if (json.all_parts[i].component === "token") {
              await fetch(json.all_parts[i].uri)
                .then((response) => {
                  return response.json();
                })
                .then(async (json) => {
                  tokens.push({
                    name: json.name,
                    image: json.image_uris.art_crop,
                    cardImage: json.image_uris.normal,
                    parentName: cardName,
                  });
                });
            }
          }
        }
      });

    if (!types[1]) {
      types[1] = "";
    }

    const mainTypeList = types[0].trim().split(" ");

    var mainType = "";

    for (var i = 0; i < cardTypes.length; ++i) {
      if (mainTypeList.includes(cardTypes[i])) {
        mainType = cardTypes[i];
        break;
      }
    }

    manaCost = manaCost.replace(/\{/g, "").replace(/\}/g, ",").split(",");

    manaCost.pop();

    //Create new card
    const card = {
      name: cardName,
      quantity: quantity,
      setName: set,
      cardArt: imageURL,
      cardImage: cardImageURL,
      cmc,
      manaCost,
      mainType,
      types: mainTypeList,
      subtypes: types[1].trim().split(" "),
      colors,
      tokens,
      secondCard,
    };

    return card;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

export default getCardInfo;
