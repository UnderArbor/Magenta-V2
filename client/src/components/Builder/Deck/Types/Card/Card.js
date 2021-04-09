import React, { useEffect, Fragment } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Dotdotdot from "react-dotdotdot";

import settingsIcon from "../../../../../utils/images/Settings_Cog.png";
import { current } from "immer";

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
  cloakSettings,
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
    <div className={isDragging ? "dragCard" : null}>
      <div
        ref={dragRef}
        id={card.name}
        className="cardArtContainer"
        onMouseEnter={(e) => {
          movePopup(e, cardImageRef);
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
          {displaySettings.displayIndicator && (
            <motion.div
              variants={toggleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={
                Number(card.quantity) === 1
                  ? "shadowBox shadow1"
                  : Number(card.quantity) === 2
                  ? "shadowBox shadow2"
                  : Number(card.quantity) === 3
                  ? "shadowBox shadow3"
                  : Number(card.quantity) >= 4
                  ? "shadowBox shadow4"
                  : "shadowBox"
              }
            />
          )}
        </AnimatePresence>
        <img className="cardArt" src={card.cardArt} alt="Whoopsie"></img>
        <div
          className={`settingsCover quantCover ${
            isHovering && !openSettings && !cardDrag && "settingsHover"
          }`}
          onClick={(e) => {
            if (!openSettings) {
              setOpenSettings(true);
              const currentCard = document.getElementById(card.name);
              currentCard.style.zIndex = 100;
              cloakSettings(true);
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
                const currentCard = document.getElementById(card.name);
                currentCard.style.zIndex = 100;
                cloakSettings(true);
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
                onClick={() => changeQuantity(card.name, card.mainType, -1)}
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
                      card.name,
                      card.mainType,
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
                onClick={() => changeQuantity(card.name, card.mainType, 1)}
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
