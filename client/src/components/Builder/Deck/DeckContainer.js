import React from "react";
import TypeContainer from "./Types/TypeContainer";
import { motion, AnimatePresence } from "framer-motion";

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
  settingsCloak,
  moveType,
  ghostCards,
}) => {
  const cloakVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 0.6,
      transition: {
        duration: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

  const breakpointColumnsObj = {
    default: 3,
    1380: 2,
    920: 1,
  };

  return (
    <div className="deckContainer">
      <AnimatePresence>
        {settingsCloak && (
          <motion.div
            className="settingsCloak"
            variants={cloakVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>
      <SearchBarContainer
        types={types}
        setTypes={setTypes}
        tokens={tokens}
        setTokens={setTokens}
        changeQuantity={changeQuantity}
        deckImage={deckImage}
        changeDeckArt={changeDeckArt}
      />
      <DeckToolsContainer tools={tools} setTools={setTools} />
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
            />
          );
        })}
      </Masonry>

      {Object.keys(tokens).length > 0 && <TokenContainer tokens={tokens} />}
    </div>
  );
};

export default DeckContainer;
