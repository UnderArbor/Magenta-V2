import React, { useState } from "react";
import produce, { current } from "immer";

import SearchBar from "./SearchBar";

import getCardInfo from "../../../utils/functions/getCardInfo";
import jsonNames from "../../../utils/json/names.json";

const SearchBarContainer = ({
  types,
  setTypes,
  changeQuantity,
  deckImage,
  changeDeckArt,
  currentCategory,
}) => {
  const [query, setQuery] = useState({
    userQuery: "",
    loading: false,
  });

  const [results, setResults] = useState({ cards: "", resultIndex: 0 });

  //Query Change

  const queryChange = (e) => {
    setQuery({ ...query, userQuery: e.target.value });
    var recommendArray = [];

    if (e.target.value !== "") {
      const cardQuery = e.target.value.toUpperCase();
      for (var index = 0; index < jsonNames.length; ++index) {
        if (jsonNames[index].toUpperCase().startsWith(cardQuery)) {
          var tempName = jsonNames[index];
          recommendArray.push(tempName);
        }
      }
      if (recommendArray.length > 0) {
        setResults({ ...results, cards: recommendArray, resultIndex: 0 });
      } else {
        setQuery({ ...query, userQuery: e.target.value });
        setResults({ ...results, cards: "", resultIndex: 0 });
      }
    } else {
      setQuery({ ...query, userQuery: "", loading: false });
      setResults({ ...results, cards: "", resultIndex: 0 });
    }
  };

  //Search Card

  const searchCard = async (cardName) => {
    if (results.cards.length > 0) {
      setQuery({ ...query, loading: true });
      const card = await getCardInfo(cardName);
      if (
        deckImage ===
        "https://images.pexels.com/photos/1376766/nature-milky-way-galaxy-space-1376766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      ) {
        changeDeckArt((prevState) => ({
          ...prevState,
          deckImage: card.cardArt,
        }));
      }

      const mainProp =
        currentCategory === "Types"
          ? card.mainType
          : currentCategory === "Cost"
          ? card.mainCMC
          : currentCategory === "Tags" && card.mainTag !== undefined
          ? card.mainTag
          : currentCategory === "Tags"
          ? "untagged"
          : null;

      const typeIndex = types.findIndex((type) => {
        return type.name === mainProp;
      });
      if (typeIndex === -1) {
        setTypes((types) => [
          ...types,
          { name: mainProp, open: true, cards: [card] },
        ]);
      } else {
        const cardIndex = types[typeIndex].cards.findIndex((currentCard) => {
          return currentCard.name === card.name;
        });
        if (cardIndex === -1) {
          setTypes((prevTypes) => {
            return prevTypes.map((type, index) => {
              if (index === typeIndex) {
                return {
                  ...prevTypes[index],
                  cards: [...prevTypes[index].cards, card],
                };
              } else {
                return type;
              }
            });
          });
        } else {
          changeQuantity(typeIndex, types[typeIndex].cards.length, 1);
        }
      }
    }
    setQuery({ ...query, userQuery: "", loading: false });
    setResults({ ...results, cards: "", resultIndex: 0 });
  };

  return (
    <div className="searchbarContainer">
      <SearchBar
        query={query}
        searchCard={searchCard}
        queryChange={queryChange}
        results={results}
        setResults={setResults}
      />
    </div>
  );
};

export default SearchBarContainer;
