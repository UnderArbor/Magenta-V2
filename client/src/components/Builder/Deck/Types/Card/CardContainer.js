import React, { useState, useRef, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SettingsContainer from "./Settings/SettingsContainer";

import ReactHoverObserver from "react-hover-observer";
import { useDrag, useDrop } from "react-dnd";

import { motion } from "framer-motion";

import { ItemTypes } from "../../../../Constants";
import Card from "./Card";
import { adjustSettingProperties } from "../../../../../actions/deck";

const CardContainer = ({
  typeIndex,
  cardIndex,
  card,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  moveCard,
  cardDrag,
  setCardDrag,
  displaySettings,
  boards,
  currentBoard,
  moveBoards,
  adjustSettingProperties,
  modifyProperty,
  changeMainProperty,
  settingBooleans,
  propertyList,
  format,
}) => {
  const cardRef = useRef(null);
  const cardImageRef = useRef(null);

  const [bigImageSrc, setImageSrc] = useState(card.cardImage);
  const [flips, setFlips] = useState({
    flipX: false,
    flipY: false,
  });

  const { flipX, flipY } = flips;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      typeIndex,
      cardIndex,
      name: card.name,
      image: card.cardArt,
    },
    begin() {
      setCardDrag(true);
    },
    end() {
      setCardDrag(false);
    },
    isDragging: (monitor) => {
      return card.name === monitor.getItem().name;
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {
      if (item.typeIndex === typeIndex && item.cardIndex === cardIndex) {
        return;
      } else if (item.typeIndex === typeIndex) {
        moveCard(item.typeIndex, item.cardIndex, typeIndex, cardIndex);
        item.cardIndex = cardIndex;
      }
    },
  });

  drag(drop(cardRef));

  const [openSettings, setOpenSettings] = useState(false);

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.6,
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      transition: {
        ease: "easeOut",
        duration: 0.4,
      },
    },
  };

  const imageVariant = {
    hidden: {
      opacity: 0,
      y: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.45,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
    },
  };

  const currentManaCost = [];

  const manaCost = card.manaCost;

  for (var j = 0; j < manaCost.length; ++j) {
    for (var k = 0; k < manaCost[j].length; ++k) {
      switch (manaCost[j][k]) {
        case "W":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot white"
              alt="W"
            />
          );
          break;
        case "U":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot blue"
              alt="U"
            />
          );
          break;
        case "B":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot black"
              alt="B"
            />
          );
          break;
        case "G":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot green"
              alt="G"
            />
          );
          break;
        case "R":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot red"
              alt="R"
            />
          );
          break;
        case "C":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot C"
              alt="C"
            />
          );
          break;
        case "X":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot X"
              alt="X"
            />
          );
          break;
        case "S":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot S"
              alt="S"
            />
          );
          break;
        case "0":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana0"
              alt="0"
            />
          );
          break;
        case "1":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana1"
              alt="1"
            />
          );
          break;
        case "2":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana2"
              alt="2"
            />
          );
          break;
        case "3":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana3"
              alt="3"
            />
          );
          break;
        case "4":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana4"
              alt="4"
            />
          );
          break;
        case "5":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana5"
              alt="5"
            />
          );
          break;
        case "6":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana6"
              alt="6"
            />
          );
          break;
        case "7":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana7"
              alt="7"
            />
          );
          break;
        case "8":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana8"
              alt="8"
            />
          );
          break;
        case "9":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana9"
              alt="9"
            />
          );
          break;
        case "10":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana10"
              alt="10"
            />
          );
          break;
        case "11":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana11"
              alt="11"
            />
          );
          break;
        case "12":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana12"
              alt="12"
            />
          );
          break;
        case "13":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana13"
              alt="13"
            />
          );
          break;
        case "14":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana14"
              alt="14"
            />
          );
          break;
        case "15":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana15"
              alt="15"
            />
          );
          break;
        case "16":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana16"
              alt="16"
            />
          );
          break;
        case "17":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana17"
              alt="17"
            />
          );
          break;
        case "18":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana18"
              alt="18"
            />
          );
          break;
        case "19":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana19"
              alt="19"
            />
          );
          break;
        case "20":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot mana20"
              alt="20"
            />
          );
          break;
        case "2/U":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot Uor2"
              alt="2/U"
            />
          );
          break;
        case "2/G":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot Gor2"
              alt="2/G"
            />
          );
          break;
        case "2/R":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot Ror2"
              alt="2/R"
            />
          );
          break;
        case "2/W":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot Wor2"
              alt="2/W"
            />
          );
          break;
        case "2/B":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot Uor2"
              alt="2/B"
            />
          );
          break;
        case "R/W":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot RorW"
              alt="R/W"
            />
          );
          break;
        case "G/U":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot GorU"
              alt="G/U"
            />
          );
          break;
        case "B/G":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot BorG"
              alt="B/G"
            />
          );
          break;
        case "B/R":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot BorR"
              alt="B/R"
            />
          );
          break;
        case "G/W":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot GorW"
              alt="G/W"
            />
          );
          break;
        case "R/G":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot RorG"
              alt="R/G"
            />
          );
          break;
        case "W/B":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot WorB"
              alt="W/B"
            />
          );
          break;
        case "U/B":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot UorB"
              alt="U/B"
            />
          );
          break;
        case "U/R":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot UorR"
              alt="U/R"
            />
          );
          break;
        case "W/U":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot WorU"
              alt="W/U"
            />
          );
          break;
        case "R/P":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot RP"
              alt="R/P"
            />
          );
          break;
        case "G/P":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot GP"
              alt="G/P"
            />
          );
          break;
        case "U/P":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot UP"
              alt="U/P"
            />
          );
          break;
        case "W/P":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot WP"
              alt="W/P"
            />
          );
          break;
        case "B/P":
          currentManaCost.push(
            <li
              key={`${card.name + j + k}`}
              className="cardColorDot BP"
              alt="B/P"
            />
          );
          break;
        case "HW":
          currentManaCost.push(
            <img
              key={`${card.name + j + k}`}
              className="cardColorDot HW"
              alt="HW"
            />
          );
          break;
        default:
          break;
      }
    }
    if (j + 1 !== manaCost.length) {
      currentManaCost.push(
        <p className="manaDivider" key={`${card.name + j}divider`}>
          //
        </p>
      );
    }
  }

  const movePopup = (e, cardImageRef) => {
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const correctedWidth = windowWidth / 2;

    const bounding = cardImageRef.current.getBoundingClientRect();

    switch (
      bounding.bottom > windowHeight ||
      (flipY &&
        bounding.bottom -
          e.currentTarget.offsetHeight +
          cardImageRef.current.offsetHeight >
          windowHeight)
    ) {
      case true:
        switch (
          bounding.left > correctedWidth ||
          (flipX &&
            bounding.left +
              e.currentTarget.offsetWidth +
              cardImageRef.current.offsetWidth >
              correctedWidth)
        ) {
          case true:
            return setFlips({ flipY: true, flipX: true });
          case false:
            return setFlips({ flipY: true, flipX: false });
        }
      case false:
        switch (
          bounding.left > correctedWidth ||
          (flipX &&
            bounding.left +
              e.currentTarget.offsetWidth +
              cardImageRef.current.offsetWidth >
              correctedWidth)
        ) {
          case true:
            return setFlips({ flipY: false, flipX: true });
          case false:
            return setFlips({ flipY: false, flipX: false });
        }
    }
  };

  return (
    <motion.div
      className="cardContainer"
      key={card.name}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      id={card.name}
    >
      <ReactHoverObserver
        hoverDelayInMs={170}
        {...{
          onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
            if (
              e.target.classList.contains("bigCardImage") ||
              e.target.className.includes("cardName") ||
              e.target.className === "settings"
            ) {
              unsetIsHovering();
            } else {
              if (!openSettings) {
                if (e.target.classList.contains("secondCover")) {
                  setImageSrc(card.secondCard.cardImage);
                } else {
                  setImageSrc(card.cardImage);
                }
                setIsHovering();
              }
            }
          },
          onMouseOut: ({ unsetIsHovering }) => {
            unsetIsHovering();
          },
        }}
      >
        {({ isHovering }) => (
          <Fragment>
            <Card
              dragRef={cardRef}
              isDragging={isDragging}
              card={card}
              changeQuantity={changeQuantity}
              isHovering={isHovering}
              openSettings={openSettings}
              setOpenSettings={setOpenSettings}
              currentManaCost={currentManaCost}
              cardDrag={cardDrag}
              cardImageRef={cardImageRef}
              movePopup={movePopup}
              displaySettings={displaySettings}
              cardIndex={cardIndex}
              typeIndex={typeIndex}
              format={format}
            />
            <SettingsContainer
              typeIndex={typeIndex}
              cardIndex={cardIndex}
              setOpenSettings={setOpenSettings}
              card={card}
              changeCardSet={changeCardSet}
              changeDeckArt={changeDeckArt}
              boards={boards}
              currentBoard={currentBoard}
              moveBoards={moveBoards}
              adjustSettingProperties={adjustSettingProperties}
              modifyProperty={modifyProperty}
              moveCard={moveCard}
              changeMainProperty={changeMainProperty}
              settingBooleans={settingBooleans}
              propertyList={propertyList}
              openSettings={openSettings}
            />
            {isHovering && !cardDrag ? (
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
                src={bigImageSrc}
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              ></motion.img>
            ) : (
              <div
                id={`cardImage${card.name}`}
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
          </Fragment>
        )}
      </ReactHoverObserver>
    </motion.div>
  );
};

CardContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
  settingBooleans: PropTypes.object.isRequired,
  adjustSettingProperties: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
  settingBooleans: state.deck.settingBooleans,
});

export default connect(mapStateToProps, {
  adjustSettingProperties,
})(CardContainer);
