import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import CardContainer from "./Card/CardContainer";
import GhostCardContainer from "./Card/GhostCardContainer";
import TypeHeader from "./TypeHeader";
import { AnimatePresence, motion } from "framer-motion";

import { ItemTypes } from "../../../Constants";
import CommanderContainer from "./CommanderContainer";

const TypeContainer = ({
  type,
  typeIndex,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  moveCard,
  cardDrag,
  setCardDrag,
  toggleType,
  boards,
  currentBoard,
  moveBoards,
  moveType,
  ghostCards,
  modifyProperty,
  changeMainProperty,
  currentCategory,
  propertyList,
  displaySettings,
  format,
}) => {
  const typeRef = useRef(null);
  const typeHeaderRef = useRef(null);

  var quantity = 0;
  for (var i = 0; i < type.cards.length; ++i) {
    quantity = Number(quantity) + Number(type.cards[i].quantity);
  }

  var ghostQuantity = 0;
  if (typeof ghostCards !== "undefined") {
    for (var i = 0; i < ghostCards.cards.length; ++i) {
      ghostQuantity =
        Number(ghostQuantity) + Number(ghostCards.cards[i].quantity);
    }
  }

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.TYPE,
      typeIndex,
      name: type.name,
    },
    isDragging: (monitor) => {
      return type.name === monitor.getItem().name;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, typeDrop] = useDrop({
    accept: ItemTypes.TYPE,
    hover: (item, monitor) => {
      if (item.typeIndex === typeIndex) {
        return;
      } else if (item.typeIndex !== typeIndex) {
        moveType(item.typeIndex, typeIndex);
        item.typeIndex = typeIndex;
      }
    },
  });

  typeDrop(drag(typeHeaderRef));

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

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 1,
        delayChildren: 1,
        when: "afterChildren",
        duration: 1,
      },
    },
    exit: {},
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      if (item.typeIndex !== typeIndex) {
        moveCard(item.typeIndex, item.cardIndex, typeIndex, type.cards.length);
      }
    },
    canDrop: (item) => item.typeIndex !== typeIndex,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(typeRef);

  return (
    <motion.div
      className={`typeContent ${type.name}`}
      variants={headerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      // style={{ width: "500px" }}
    >
      <TypeHeader
        name={
          currentCategory === "Cost" && type.name === -1
            ? "Commander"
            : type.name
        }
        open={type.open}
        toggleType={toggleType}
        typeIndex={typeIndex}
        quantity={
          type.name !== "Commander" &&
          !(type.name === -1 && currentCategory === "Cost")
            ? quantity
            : type.cards.length === 1
            ? type.cards[0].name
            : type.cards.length === 2
            ? `${type.cards[0].name} & ${type.cards[1].name}`
            : false
        }
        ghostQuantity={ghostQuantity}
        typeHeaderRef={typeHeaderRef}
        isDragging={isDragging}
        currentCategory={currentCategory}
      />
      <motion.div
        ref={typeRef}
        className={`${type.name !== "Commander" && "typeContainer"} ${
          isDragging && "dragType"
        }`}
        variants={containerVariant}
        id={`type${typeIndex}`}
        style={
          isOver && canDrop
            ? {
                opacity: 0.4,
                backgroundColor: "rgba(0, 0, 0, 0.4",
                border: "3px dotted grey",
                borderTop: "none",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }
            : { opacity: 1, backgroundColor: "transparent" }
        }
      >
        <AnimatePresence>
          {type.name !== "Commander" ? (
            type.cards.map((card, cardIndex) => {
              if (type.open) {
                return (
                  <CardContainer
                    typeIndex={typeIndex}
                    cardIndex={cardIndex}
                    card={card}
                    key={card.name}
                    changeQuantity={changeQuantity}
                    changeCardSet={changeCardSet}
                    changeDeckArt={changeDeckArt}
                    moveCard={moveCard}
                    cardDrag={cardDrag}
                    setCardDrag={setCardDrag}
                    boards={boards}
                    currentBoard={currentBoard}
                    moveBoards={moveBoards}
                    modifyProperty={modifyProperty}
                    changeMainProperty={changeMainProperty}
                    propertyList={propertyList}
                    format={format}
                  />
                );
              }
            })
          ) : type.name === "Commander" && type.open ? (
            <CommanderContainer
              commanders={type.cards}
              typeIndex={typeIndex}
              boards={boards}
              currentBoard={currentBoard}
              moveBoards={moveBoards}
              changeCardSet={changeCardSet}
              changeDeckArt={changeDeckArt}
              modifyProperty={modifyProperty}
              moveCard={moveCard}
              changeMainProperty={changeMainProperty}
              propertyList={propertyList}
            />
          ) : null}
          {typeof ghostCards !== "undefined" &&
          type.open &&
          displaySettings.displayGhosts
            ? ghostCards.cards.map((ghostCard) => {
                if (type.open) {
                  return (
                    <GhostCardContainer
                      ghostCard={ghostCard}
                      key={ghostCard.name + "ghost"}
                    />
                  );
                }
              })
            : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TypeContainer;
