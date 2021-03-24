import React from "react";
import ReactHoverObserver from "react-hover-observer";
import { motion, AnimatePresence } from "framer-motion";
import Dotdotdot from "react-dotdotdot";

const Token = ({
  token,
  imageVariant,
  cardVariant,
  cardImageRef,
  flipX,
  flipY,
  movePopup,
  displaySettings,
}) => {
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
    <motion.div
      className="tokenContainer"
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={(e) => {
        movePopup(e, cardImageRef);
      }}
    >
      <ReactHoverObserver
        hoverDelayInMs={170}
        {...{
          onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
            console.log("e: ", e.target.className);
            if (
              e.target.className.includes("bigCardImage") ||
              e.target.className === "cardName"
            ) {
              unsetIsHovering();
            } else {
              setIsHovering();
            }
          },
        }}
      >
        {({ isHovering }) => (
          <div>
            <div className="cardArtContainer">
              <img src={token.image} className="cardArt" />
            </div>
            {isHovering ? (
              <motion.img
                className={`bigCardImage ${
                  !flipX && !flipY
                    ? "popupBR"
                    : flipX && !flipY
                    ? "popupBL"
                    : !flipX && flipY
                    ? "popupTR"
                    : "popupTL"
                }`}
                draggable="false"
                src={token.cardImage}
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
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
        )}
      </ReactHoverObserver>
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
              <p className="cardName">{token.name}</p>
            </Dotdotdot>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Token;
