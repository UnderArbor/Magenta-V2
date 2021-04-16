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
    let cmc = [];
    let manaCost = [""];
    let types = [[], []];
    var mainType = "";
    let colors = "";
    let set = "";
    let tokens = [];
    let secondCard = {
      name: "",
      cardArt: "",
      cardImage: "",
      cmc: [],
      modifiedCMC: [],
      manaCost: [],
      types: [],
      modifiedTypes: [],
      subtypes: [],
      colors: [],
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
        if (json.cmc !== undefined) {
          cmc = [json.cmc];
        }
        manaCost = [json.mana_cost];

        //Parse CMC
        if (json.mana_cost.includes("//") || cmc.length === 0) {
          manaCost = json.mana_cost.split(" // ");
          var alternateCMC = [];

          for (var i = 0; i < manaCost.length; ++i) {
            for (var j = 0; j < manaCost[i].length; ++j) {
              const manaCharacter = manaCost[i][j];
              if (manaCharacter !== "}" && manaCharacter !== "{") {
                if (isNaN(manaCharacter)) {
                  if (alternateCMC[i] === undefined) {
                    alternateCMC[i] = 1;
                  } else {
                    alternateCMC[i] += 1;
                  }
                } else {
                  if (alternateCMC[i] === undefined) {
                    alternateCMC[i] = Number(manaCharacter);
                  } else {
                    alternateCMC[i] += Number(manaCharacter);
                  }
                }
              }
            }
          }
          for (var i = 0; i < alternateCMC.length; ++i) {
            if (
              cmc.filter((currentCMC) => {
                return currentCMC === alternateCMC[i];
              }).length === 0
            ) {
              cmc.push(alternateCMC[i]);
            }
          }
        }

        //Parse Types
        const typeLine = json.type_line.split(" // ");
        for (var i = 0; i < typeLine.length; ++i) {
          const typeItems = typeLine[i].split("—");
          for (var j = 0; j < typeItems.length; ++j) {
            const typeCategories = typeItems[j].trim().split(" ");
            for (var k = 0; k < typeCategories.length; ++k) {
              if (
                types[j].filter((type) => {
                  return type === typeCategories[k];
                }).length === 0
              ) {
                types[j].push(typeCategories[k]);
              }
            }
          }
        }
        colors = json.colors;

        //Get Second Card
        if (secondJSON !== null) {
          const names = cardName.split(" // ");
          const typeLine = secondJSON.type_line.split("—");
          const mainTypeList = typeLine[0].trim().split(" ");
          cardName = names[0];
          secondCard.name = names[1];
          secondCard.cardArt = secondJSON.image_uris.art_crop;
          secondCard.cardImage = secondJSON.image_uris.normal;

          if (secondJSON.mana_cost !== "") {
            secondCard.manaCost = [secondJSON.mana_cost];

            const secondManaCost = secondCard.manaCost;

            var alternateCMC = [];

            for (var i = 0; i < secondManaCost.length; ++i) {
              for (var j = 0; j < secondManaCost[i].length; ++j) {
                const manaCharacter = secondManaCost[i][j];
                if (manaCharacter !== "}" && manaCharacter !== "{") {
                  if (isNaN(manaCharacter)) {
                    if (alternateCMC[i] === undefined) {
                      alternateCMC[i] = 1;
                    } else {
                      alternateCMC[i] += 1;
                    }
                  } else {
                    if (alternateCMC[i] === undefined) {
                      alternateCMC[i] = Number(manaCharacter);
                    } else {
                      alternateCMC[i] += Number(manaCharacter);
                    }
                  }
                }
              }
            }
            for (var i = 0; i < alternateCMC.length; ++i) {
              if (
                secondCard.cmc.filter((currentCMC) => {
                  return currentCMC === alternateCMC[i];
                }).length === 0
              ) {
                secondCard.cmc.push(alternateCMC[i]);
                secondCard.modifiedCMC.push(alternateCMC[i]);
              }
            }
          }
          secondCard.types = mainTypeList;
          secondCard.modifiedTypes = mainTypeList.filter((type) => {
            return (
              type !== "Legendary" &&
              type !== "Tribal" &&
              type !== "Snow" &&
              type !== "Basic"
            );
          });
          if (typeLine[1] !== undefined) {
            secondCard.subtypes = typeLine[1].trim().split(" ");
          }
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

    for (var i = 0; i < cardTypes.length; ++i) {
      if (types[0].includes(cardTypes[i])) {
        mainType = cardTypes[i];
        break;
      }
    }
    for (var i = 0; i < manaCost.length; ++i) {
      manaCost[i] = manaCost[i]
        .replace(/\{/g, "")
        .replace(/\}/g, ",")
        .split(",");
      manaCost[i].pop();
    }

    //Create new card
    const card = {
      name: cardName,
      quantity: quantity,
      setName: set,
      cardArt: imageURL,
      cardImage: cardImageURL,
      cmc,
      mainCMC: cmc[0],
      modifiedCMC: cmc,
      manaCost,
      mainType,
      types: types[0],
      modifiedTypes: types[0].filter((type) => {
        return (
          type !== "Legendary" &&
          type !== "Tribal" &&
          type !== "Snow" &&
          type !== "Basic"
        );
      }),
      subtypes: types[1],
      mainTag: undefined,
      tags: [],
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
