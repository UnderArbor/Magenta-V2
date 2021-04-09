import React from "react";
import TypeContainer from "./Types/TypeContainer";
import { motion, AnimatePresence } from "framer-motion";
import produce from "immer";

import Masonry from "react-masonry-css";

import SearchBarContainer from "../SearchBar/SearchBarContainer";
import DeckToolsContainer from "../DeckTools/DeckToolsContainer";
import TokenContainer from "./Types/TokenContainer";

const DeckContainer = ({
  types,
  setTypes,
  tokens,
  setTokens,
  tools,
  setTools,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  moveCard,
  cardDrag,
  setCardDrag,
  toggleType,
  deckImage,
  boards,
  currentBoard,
  moveBoards,
  moveType,
  ghostCards,
}) => {
  const breakpointColumnsObj = {
    default: 3,
    1380: 2,
    920: 1,
  };

  function modifyType(typeIndex, cardIndex, newType, addBoolean) {
    const card = types[typeIndex].cards[cardIndex];

    const newTypes = produce(types, (draft) => {
      if (addBoolean) {
        draft[typeIndex].cards[cardIndex].modifiedTypes.push(newType);
      } else {
        const removedIndex = card.modifiedTypes.findIndex((type) => {
          return type === newType;
        });
        draft[typeIndex].cards[cardIndex].modifiedTypes.splice(removedIndex, 1);
      }
    });
    setTypes(newTypes);
  }

  return (
    <div className="deckContainer">
      <SearchBarContainer
        types={types}
        setTypes={setTypes}
        tokens={tokens}
        setTokens={setTokens}
        changeQuantity={changeQuantity}
        deckImage={deckImage}
        changeDeckArt={changeDeckArt}
      />
      <DeckToolsContainer tools={tools} setTools={setTools} types={types} />
      {types.length === 0 && <div className="emptyDeck">Hi</div>}
      <AnimatePresence>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="typeGrid"
          columnClassName="typeGridColumn"
        >
          {types.map((type, typeIndex) => {
            return (
              <TypeContainer
                type={type}
                key={type.name}
                typeIndex={typeIndex}
                changeQuantity={changeQuantity}
                changeCardSet={changeCardSet}
                changeDeckArt={changeDeckArt}
                moveCard={moveCard}
                cardDrag={cardDrag}
                setCardDrag={setCardDrag}
                toggleType={toggleType}
                boards={boards}
                currentBoard={currentBoard}
                moveBoards={moveBoards}
                moveType={moveType}
                ghostCards={ghostCards.find(
                  (ghostType) => ghostType.name === type.name
                )}
                modifyType={modifyType}
              />
            );
          })}
        </Masonry>
      </AnimatePresence>

      {Object.keys(tokens).length > 0 && <TokenContainer tokens={tokens} />}
    </div>
  );
};

export default DeckContainer;
