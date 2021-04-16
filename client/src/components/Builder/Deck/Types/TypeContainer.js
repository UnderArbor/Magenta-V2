import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import CardContainer from "./Card/CardContainer";
import GhostCardContainer from "./Card/GhostCardContainer";
import TypeHeader from "./TypeHeader";
import { AnimatePresence, motion } from "framer-motion";

import { ItemTypes } from "../../../Constants";

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
}) => {
  const typeRef = useRef(null);
  const typeHeaderRef = useRef(null);
  const typeContainerRef = useRef(null);

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

  drag(typeHeaderRef);
  typeDrop(typeContainerRef);

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
      className="typeContent"
      variants={headerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={typeContainerRef}
    >
      <TypeHeader
        type={type}
        toggleType={toggleType}
        typeIndex={typeIndex}
        quantity={quantity}
        ghostQuantity={ghostQuantity}
        typeHeaderRef={typeHeaderRef}
        isDragging={isDragging}
        currentCategory={currentCategory}
      />
      <motion.div
        ref={typeRef}
        className={`typeContainer ${isDragging && "dragType"}`}
        variants={containerVariant}
        id={`type${typeIndex}`}
        style={
          isOver && canDrop
            ? { opacity: 0.4, backgroundColor: "rgba(0, 0, 0, 0.4" }
            : { opacity: 1, backgroundColor: "transparent" }
        }
      >
        <AnimatePresence>
          {type.cards.map((card, cardIndex) => {
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
                />
              );
            }
          })}
          {typeof ghostCards !== "undefined"
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
