import React, { useEffect, useState } from "react";
import TypeContainer from "./Types/TypeContainer";
import { motion, AnimatePresence } from "framer-motion";
import produce from "immer";
import Masonry from "masonry-layout";

import SearchBarContainer from "../SearchBar/SearchBarContainer";
import DeckToolsContainer from "../DeckTools/DeckToolsContainer";
import TokenContainer from "./Types/TokenContainer";

const emptyVariant = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 0.2,
    x: 0,
    transition: {
      delay: 3,
      duration: 2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headerVariant = {
  hidden: {
    x: -8,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      when: "beforeChildren",
      duration: 0.4,
      delayChildren: 0.8,
      delay: 0.0,
    },
  },
  exit: {
    x: -8,
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.4,
    },
  },
};

const DeckContainer = ({
  types,
  setTypes,
  tokens,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  moveCard,
  cardDrag,
  setCardDrag,
  toggleType,
  deckImage,
  boards,
  setBoardState,
  currentBoard,
  moveBoards,
  moveType,
  ghostCards,
  currentCategory,
  propertyList,
  deckInfo,
  addCard,
  setCardCount,
  displaySettings,
}) => {
  var masonry = null;

  useEffect(() => {
    masonry = new Masonry(".categoryGrid", {
      columnWidth: ".gridSizer",
      itemSelector: ".typeContent",
      percentPosition: true,
    });

    return () => {
      masonry.destroy();
    };
  }, [types]);

  function modifyProperty(propertyType, property, typeIndex, cardIndex, add) {
    const card = types[typeIndex].cards[cardIndex];

    const newTypes = produce(types, (draft) => {
      if (add) {
        switch (propertyType) {
          case "Types":
            draft[typeIndex].cards[cardIndex].modifiedTypes.push(property);
            break;
          case "Cost":
            draft[typeIndex].cards[cardIndex].modifiedCMC.push(property);
            break;
          case "Tags":
            draft[typeIndex].cards[cardIndex].tags.push(property);
            if (draft[typeIndex].cards[cardIndex].mainTag === undefined) {
              draft[typeIndex].cards[cardIndex].mainTag = property;
              if (propertyType === currentCategory) {
                const removedCard = draft[typeIndex].cards.splice(cardIndex, 1);
                const newTypeIndex = types.findIndex((type) => {
                  return type.name === property;
                });
                if (newTypeIndex === -1) {
                  draft.push({
                    name: property,
                    open: true,
                    cards: [removedCard[0]],
                  });
                } else {
                  const newCardIndex = draft[newTypeIndex].length;
                  draft[newTypeIndex].cards.splice(
                    newCardIndex,
                    0,
                    removedCard[0]
                  );
                  draft[newTypeIndex].open = true;
                }
              }
            }
            break;
          default:
            break;
        }
      } else {
        var removedIndex = -1;
        switch (propertyType) {
          case "Types":
            removedIndex = card.modifiedTypes.findIndex((type) => {
              return type === property;
            });
            draft[typeIndex].cards[cardIndex].modifiedTypes.splice(
              removedIndex,
              1
            );
            break;
          case "Cost":
            removedIndex = card.modifiedCMC.findIndex((cmc) => {
              return cmc === property;
            });
            draft[typeIndex].cards[cardIndex].modifiedCMC.splice(
              removedIndex,
              1
            );
            break;
          case "Tags":
            removedIndex = card.tags.findIndex((tag) => {
              return tag === property;
            });
            const newTag =
              card.tags.length > 1
                ? card.tags[
                    card.tags.findIndex((tag) => {
                      return tag !== card.tags[removedIndex];
                    })
                  ]
                : "untagged";
            const removedTag = draft[typeIndex].cards[cardIndex].tags.splice(
              removedIndex,
              1
            );
            if (card.mainTag === removedTag[0]) {
              draft[typeIndex].cards[cardIndex].mainTag =
                newTag === "untagged" ? undefined : newTag;
              if (propertyType === currentCategory) {
                const removedCard = draft[typeIndex].cards.splice(cardIndex, 1);
                var newTypeIndex = draft.findIndex((type) => {
                  return type.name === newTag;
                });
                if (newTypeIndex === -1) {
                  draft.push({
                    name: newTag,
                    open: true,
                    cards: [removedCard[0]],
                  });
                } else {
                  const newCardIndex = draft[newTypeIndex].length;
                  draft[newTypeIndex].cards.splice(
                    newCardIndex,
                    0,
                    removedCard[0]
                  );
                  draft[newTypeIndex].open = true;
                }
              }
            }
            break;
          default:
            break;
        }
      }
    });
    setTypes(newTypes);
  }

  function changeMainProperty(propertyType, property, typeIndex, cardIndex) {
    if (propertyType === currentCategory) {
      moveCard(typeIndex, cardIndex, property);
    } else {
      const newTypes = produce(types, (draft) => {
        switch (propertyType) {
          case "Types":
            draft[typeIndex].cards[cardIndex].mainType = property;
            break;
          case "Cost":
            draft[typeIndex].cards[cardIndex].mainCMC = property;
            break;
          case "Tags":
            draft[typeIndex].cards[cardIndex].mainTag = property;
            break;
          default:
            break;
        }
      });
      setTypes(newTypes);
    }
  }

  return (
    <div className="deckContainer">
      <SearchBarContainer
        types={types}
        setTypes={setTypes}
        changeQuantity={changeQuantity}
        deckImage={deckImage}
        currentCategory={currentCategory}
        deckInfo={deckInfo}
        addCard={addCard}
        boards={boards}
        setBoardState={setBoardState}
        currentBoard={currentBoard}
        setCardCount={setCardCount}
      />
      <AnimatePresence>
        {types.length === 0 && (
          <motion.div
            className="emptyDeck"
            variants={emptyVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            What to add first...
          </motion.div>
        )}
      </AnimatePresence>
      <div className="cardArea">
        <div className="categoryGrid">
          <div className="gridSizer"></div>
          {/* <div
            className="gridCategory"
            style={{ border: "1px solid red", height: 50, width: 50 }}
          ></div>
          <div
            className="gridCategory"
            style={{ border: "1px solid red", height: 50, width: 50 }}
          ></div>
          <div
            className="gridCategory"
            style={{ border: "1px solid red", height: 50, width: 50 }}
          ></div>
          <div
            className="gridCategory"
            style={{ border: "1px solid red", height: 50, width: 50 }}
          ></div>
          <div
            className="gridCategory"
            style={{ border: "1px solid red", height: 50, width: 50 }}
          ></div> */}
          <AnimatePresence>
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
                  modifyProperty={modifyProperty}
                  changeMainProperty={changeMainProperty}
                  currentCategory={currentCategory}
                  propertyList={propertyList}
                  displaySettings={displaySettings}
                  format={deckInfo.deckFormat}
                />
              );
            })}
          </AnimatePresence>
        </div>
        <div
          style={{
            position: "relative",
            height: "100vh",
            visibility: "hidden",
          }}
        />
        <div
          id="stickyContainer"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "140px",
          }}
        >
          <DeckToolsContainer
            mainCards={boards[0].cards}
            currentCategory={currentCategory}
          />
        </div>
      </div>

      {Object.keys(tokens).length > 0 && <TokenContainer tokens={tokens} />}
    </div>
  );
};

export default DeckContainer;
