import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dotdotdot from "react-dotdotdot";

const GhostCard = ({
  ghostCard,
  currentManaCost,
  displaySettings,
  isHovering = false,
  cardImageRef,
  flipX,
  flipY,
  movePopup,
  bigImageSrc,
  imageVariant,
}) => {
  const toggleVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const nameToggleVariant = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: 50,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="">
      <div
        className="cardArtContainer"
        onMouseEnter={(e) => {
          movePopup(e, cardImageRef);
        }}
      >
        <AnimatePresence>
          {displaySettings.displayMana && (
            <motion.div
              variants={toggleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={
                isHovering
                  ? "manaHover cardColorContainer ghostColorContainer"
                  : "cardColorContainer ghostColorContainer"
              }
            >
              {currentManaCost}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {displaySettings.displayQuantity && (
            <motion.div
              variants={toggleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="ghostQuantContainer"
            >
              <div className="ghostCardQuantity">
                <span
                  className="quantInput"
                  contentEditable="false"
                  suppressContentEditableWarning="true"
                  type="text"
                >
                  {ghostCard.quantity}
                </span>
                <p className="quantityX">x</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <img
          className="cardArt ghostArt"
          src={ghostCard.cardArt}
          alt="Whoopsie"
        ></img>
      </div>
      <AnimatePresence>
        {displaySettings.displayName && (
          <motion.div
            className="cardNameContainer"
            variants={nameToggleVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Dotdotdot clamp={4}>
              <p className="cardName ghostName">{ghostCard.name}</p>
            </Dotdotdot>
          </motion.div>
        )}
      </AnimatePresence>
      {isHovering ? (
        <motion.img
          className={`bigCardImage bigGhostImage ${
            !flipX && !flipY
              ? "popupBR"
              : flipX && !flipY
              ? "popupBL"
              : !flipX && flipY
              ? "popupTR"
              : "popupTL"
          }`}
          draggable="false"
          src={bigImageSrc}
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        ></motion.img>
      ) : (
        <div
          className={`bigCardImage hiddenCard ${
            !flipX && !flipY
              ? "popupBR"
              : flipX && !flipY
              ? "popupBL"
              : !flipX && flipY
              ? "popupTR"
              : "popupTL"
          }`}
          ref={cardImageRef}
        />
      )}
    </div>
  );
};

export default GhostCard;
