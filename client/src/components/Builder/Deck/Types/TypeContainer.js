import React, { useRef } from "react";
import { useDrop } from "react-dnd";

import CardContainer from "./Card/CardContainer";
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
}) => {
  const typeRef = useRef(null);

  var quantity = 0;
  for (var i = 0; i < type.cards.length; ++i) {
    quantity = Number(quantity) + Number(type.cards[i].quantity);
  }

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

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      moveCard(item.typeIndex, item.cardIndex, typeIndex, type.cards.length);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
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
    >
      <TypeHeader
        type={type}
        toggleType={toggleType}
        typeIndex={typeIndex}
        quantity={quantity}
      />
      <motion.div
        ref={typeRef}
        className="typeContainer"
        variants={containerVariant}
        id={`type${typeIndex}`}
        style={
          isOver
            ? { opacity: 0.4, backgroundColor: "rgba(0, 0, 0, 0.4" }
            : { opacity: 1, backgroundColor: "transparent" }
        }
      >
        <AnimatePresence>
          {type.cards.map((card, cardIndex) => {
            console.log("card: ", card);
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
                />
              );
            }
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TypeContainer;
