import React, { useEffect, Fragment } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Dotdotdot from "react-dotdotdot";

import SettingsContainer from "./SettingsContainer";

import settingsIcon from "../../../../../utils/images/Settings_Cog.png";

const Card = ({
  dragRef,
  isDragging,
  typeIndex,
  cardIndex,
  card,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  isHovering = false,
  openSettings,
  setOpenSettings,
  currentManaCost,
  imageVariant,
  cardDrag,
  cardImageRef,
  flipX,
  flipY,
  movePopup,
  displaySettings,
}) => {
  const cardClass = isDragging ? "ghostCard" : null;

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
    <div className={cardClass}>
      <div
        ref={dragRef}
        className="cardArtContainer"
        onMouseEnter={(e) => {
          movePopup(e, cardImageRef);
        }}
      >
        {/* {card.secondCard.name !== "" && (
          <div className="cardSwitcher">Click Me</div>
        )} */}
        <AnimatePresence>
          {displaySettings.displayMana && (
            <motion.div
              variants={toggleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={
                isHovering && !openSettings && !cardDrag
                  ? "manaHover cardColorContainer"
                  : "cardColorContainer"
              }
            >
              {currentManaCost}
            </motion.div>
          )}
        </AnimatePresence>
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
          className={
            isHovering && !openSettings && !cardDrag
              ? "settingsHover quantCover settingsCover"
              : "quantCover settingsCover"
          }
          onClick={() => {
            if (!openSettings) {
              let cardContainers = document.querySelectorAll(".cardContainer");
              cardContainers.forEach(function (item) {
                if (card.name !== item.id) {
                  item.style.opacity = ".4";
                }
                item.style.pointerEvents = "none";
              });
              setOpenSettings(true);
            }
          }}
        >
          <img src={settingsIcon} alt="settings" className="settingsIcon" />
        </div>
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
      {openSettings ? (
        <SettingsContainer
          typeIndex={typeIndex}
          cardIndex={cardIndex}
          setOpenSettings={setOpenSettings}
          card={card}
          changeCardSet={changeCardSet}
          changeDeckArt={changeDeckArt}
          flipX={flipX}
          flipY={flipY}
        />
      ) : isHovering && !cardDrag ? (
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
          src={card.cardImage}
          variants={imageVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        ></motion.img>
      ) : (
        <div
          className={`bigCardImage hidden ${
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

export default Card;
