import React, { useState } from "react";
import produce from "immer";

import SearchBar from "./SearchBar";

import getCardInfo from "../../../utils/functions/getCardInfo";
import jsonNames from "../../../utils/json/names.json";

const SearchBarContainer = ({
  types,
  setTypes,
  tokens,
  setTokens,
  changeQuantity,
  deckImage,
  changeDeckArt,
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
      var index1 = -1;
      for (var i = 0; i < types.length; ++i) {
        if (types[i].name === card.mainType) {
          index1 = i;
          break;
        }
      }
      if (index1 === -1) {
        setTypes((types) => [
          ...types,
          { name: card.mainType, open: true, cards: [card] },
        ]);
      } else {
        const quantChange = await changeQuantity(card.name, card.mainType, 1);
        if (!quantChange) {
          setTypes((prevTypes) => {
            return prevTypes.map((type, index) => {
              if (index === index1) {
                return {
                  ...prevTypes[index],
                  cards: [...prevTypes[index].cards, card],
                };
              } else {
                return type;
              }
            });
          });
        }
      }
      if (card.tokens.length > 0) {
        var exists = false;
        const newTokens = produce(tokens, (draft) => {
          for (var i = 0; i < card.tokens.length; ++i) {
            for (var j = 0; j < tokens.length; ++j) {
              if (tokens[j].name === card.tokens[i].name) {
                exists = true;
                break;
              }
            }
            if (!exists) {
              draft.push(card.tokens[i]);
            }
          }
        });
        setTokens(newTokens);
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
