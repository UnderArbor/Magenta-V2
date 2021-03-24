import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import DeckNameDisplay from "./DeckNameDisplay";
import DeckFormatSelector from "./DeckFormatSelector";
import BoardSelector from "./BoardSelector";
import DeckColors from "./DeckColors";

import ExitIcon from "../../../utils/icons/exitButton.svg";

import { ItemTypes } from "../../Constants";

const DeckBanner = ({
  deckInfo,
  setDeckInfo,
  cardCount,
  setDeckId,
  boards,
  setBoardState,
  currentBoard,
  colors,
}) => {
  let history = useHistory();
  const deckImageRef = useRef(null);
  const [openFormat, setOpenFormat] = useState(false);
  const [showBars, setShowBars] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      setDeckInfo((prevState) => ({ ...prevState, deckImage: item.image }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(deckImageRef);

  const deckVariant = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeIn",
        duration: 0.5,
        staggerChildren: 1,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        ease: "easeIn",
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="deckBanner"
      variants={deckVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="deckInfo">
        <DeckNameDisplay deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
        <DeckFormatSelector
          deckFormat={deckInfo.deckFormat}
          setDeckInfo={setDeckInfo}
          openFormat={openFormat}
          setOpenFormat={setOpenFormat}
        />
      </div>
      <div className="deckArtCover">
        <img
          ref={deckImageRef}
          className={!isOver ? "deckArt" : "deckArt hoverArt"}
          src={deckInfo.deckImage}
          onMouseEnter={() => setShowBars(true)}
          onMouseLeave={() => setShowBars(false)}
        />
        <DeckColors colors={colors} showBars={showBars} />
      </div>
      <img
        className="builderExit"
        onClick={() => {
          setDeckId(null);
          history.push("/builder");
        }}
        src={ExitIcon}
      />
      <BoardSelector
        boards={boards}
        setBoardState={setBoardState}
        currentBoard={currentBoard}
        cardCount={cardCount}
      />
    </motion.div>
  );
};

export default DeckBanner;
