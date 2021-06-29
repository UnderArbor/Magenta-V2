import React, { useEffect, Fragment } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Dotdotdot from "react-dotdotdot";

import settingsIcon from "../../../../../utils/images/Settings_Cog.png";

const Card = ({
  dragRef,
  isDragging,
  card,
  changeQuantity,
  isHovering,
  openSettings,
  setOpenSettings,
  currentManaCost,
  cardDrag,
  cardImageRef,
  movePopup,
  displaySettings,
  typeIndex,
  cardIndex,
  format,
}) => {
  useEffect(() => {
    const cardArt = document.querySelectorAll(".cardArtContainer");
    if (cardArt.length > 0) {
      movePopup(cardArt[0], cardImageRef);
    }
  }, []);

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
      height: "100%",
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
    <div id={card.name}>
      <div
        ref={dragRef}
        className={`cardArtContainer ${isDragging && "dragCard"}`}
        onMouseEnter={(e) => {
          if (!openSettings) {
            movePopup(e, cardImageRef);
          }
        }}
      >
        <div className="manaContainer">
          <AnimatePresence>
            {displaySettings.displayMana && (
              <motion.div
                variants={toggleVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={
                  isHovering && !openSettings && !isDragging
                    ? "manaHover cardColorContainer"
                    : "cardColorContainer"
                }
              >
                {currentManaCost}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="quantCover" />
        <AnimatePresence>
          {displaySettings.displayLegalities &&
            format !== "Brew" &&
            !card.legalities.includes(format) && (
              <motion.div
                variants={toggleVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="shadowBox illegalShadow"
              />
            )}
        </AnimatePresence>
        <img className="cardArt" src={card.cardArt} alt="Whoopsie"></img>
        <div
          className={`settingsCover ${
            isHovering && !openSettings && !cardDrag && "settingsHover"
          }`}
          onClick={(e) => {
            if (!openSettings) {
              setOpenSettings(true);
            }
          }}
        >
          <img src={settingsIcon} alt="settings" className="settingsIcon" />
        </div>
        {card.secondCard.name !== "" && (
          <div
            className={`secondCover ${
              isHovering && !openSettings && !cardDrag && "settingsHover"
            }`}
            onClick={(e) => {
              if (!openSettings) {
                setOpenSettings(true);
              }
            }}
          ></div>
        )}
        <AnimatePresence>
          {displaySettings.displayQuantity && (
            <motion.div
              className="quantContainer"
              variants={toggleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className={
                  isHovering && !openSettings
                    ? "decrementCard quantButton"
                    : "quantButton"
                }
                style={{ marginTop: "-2px" }}
                onClick={() => changeQuantity(typeIndex, cardIndex, -1)}
              >
                -
              </button>
              <div className="cardQuantity">
                <span
                  className="quantInput"
                  contentEditable="true"
                  suppressContentEditableWarning="true"
                  type="text"
                  onKeyPress={(e) => {
                    if (e.nativeEvent.key === "Enter") {
                      e.preventDefault();
                      if (!e.target.innerHTML) {
                        e.target.innerHTML = card.quantity;
                      }
                      e.target.blur();
                    } else if (
                      !Number.isInteger(Number(e.nativeEvent.key)) ||
                      e.target.innerHTML.length === 2
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onBlur={(e) => {
                    changeQuantity(
                      typeIndex,
                      cardIndex,
                      Number(e.target.innerHTML) - card.quantity
                    );
                  }}
                >
                  {card.quantity}
                </span>
                <p className="quantityX">x</p>
              </div>
              <button
                className={
                  isHovering && !openSettings && !cardDrag
                    ? "incrementCard quantButton"
                    : "quantButton"
                }
                style={{ marginTop: "1px" }}
                onClick={() => changeQuantity(typeIndex, cardIndex, 1)}
              >
                +
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
              <p className="cardName">{card.name}</p>
            </Dotdotdot>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
