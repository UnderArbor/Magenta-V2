import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReactHoverObserver from "react-hover-observer";

import GhostCard from "./GhostCard";

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

const GhostCardContainer = ({ ghostCard, displaySettings }) => {
  const cardImageRef = useRef(null);

  const [bigImageSrc, setImageSrc] = useState(ghostCard.cardImage);
  const [flips, setFlips] = useState({
    flipX: false,
    flipY: false,
  });

  const { flipX, flipY } = flips;

  const movePopup = (e, cardImageRef) => {
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

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
          bounding.right > windowWidth ||
          (flipX &&
            bounding.right +
              e.currentTarget.offsetWidth +
              cardImageRef.current.offsetWidth >
              windowWidth)
        ) {
          case true:
            return setFlips({ flipY: true, flipX: true });
          case false:
            return setFlips({ flipY: true, flipX: false });
        }
      case false:
        switch (
          bounding.right > windowWidth ||
          (flipX &&
            bounding.right +
              e.currentTarget.offsetWidth +
              cardImageRef.current.offsetWidth >
              windowWidth)
        ) {
          case true:
            return setFlips({ flipY: false, flipX: true });
          case false:
            return setFlips({ flipY: false, flipX: false });
        }
    }
  };

  const currentManaCost = [];

  const manaCost = ghostCard.manaCost;

  for (var j = 0; j < manaCost.length; ++j) {
    switch (manaCost[j]) {
      case "W":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot white" alt="W" />
        );
        break;
      case "U":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot blue" alt="U" />
        );
        break;
      case "B":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot black" alt="B" />
        );
        break;
      case "G":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot green" alt="G" />
        );
        break;
      case "R":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot red" alt="R" />
        );
        break;
      case "C":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot C" alt="C" />
        );
        break;
      case "X":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot X" alt="X" />
        );
        break;
      case "S":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot S" alt="S" />
        );
        break;
      case "0":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana0" alt="0" />
        );
        break;
      case "1":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana1" alt="1" />
        );
        break;
      case "2":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana2" alt="2" />
        );
        break;
      case "3":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana3" alt="3" />
        );
        break;
      case "4":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana4" alt="4" />
        );
        break;
      case "5":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana5" alt="5" />
        );
        break;
      case "6":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana6" alt="6" />
        );
        break;
      case "7":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana7" alt="7" />
        );
        break;
      case "8":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana8" alt="8" />
        );
        break;
      case "9":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana9" alt="9" />
        );
        break;
      case "10":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana10" alt="10" />
        );
        break;
      case "11":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana11" alt="11" />
        );
        break;
      case "12":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana12" alt="12" />
        );
        break;
      case "13":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana13" alt="13" />
        );
        break;
      case "14":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana14" alt="14" />
        );
        break;
      case "15":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana15" alt="15" />
        );
        break;
      case "16":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana16" alt="16" />
        );
        break;
      case "17":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana17" alt="17" />
        );
        break;
      case "18":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana18" alt="18" />
        );
        break;
      case "19":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana19" alt="19" />
        );
        break;
      case "20":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot mana20" alt="20" />
        );
        break;
      case "2/U":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot Uor2" alt="2/U" />
        );
        break;
      case "2/G":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot Gor2" alt="2/G" />
        );
        break;
      case "2/R":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot Ror2" alt="2/R" />
        );
        break;
      case "2/W":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot Wor2" alt="2/W" />
        );
        break;
      case "2/B":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot Uor2" alt="2/B" />
        );
        break;
      case "R/W":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot RorW" alt="R/W" />
        );
        break;
      case "G/U":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot GorU" alt="G/U" />
        );
        break;
      case "B/G":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot BorG" alt="B/G" />
        );
        break;
      case "B/R":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot BorR" alt="B/R" />
        );
        break;
      case "G/W":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot GorW" alt="G/W" />
        );
        break;
      case "R/G":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot RorG" alt="R/G" />
        );
        break;
      case "W/B":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot WorB" alt="W/B" />
        );
        break;
      case "U/B":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot UorB" alt="U/B" />
        );
        break;
      case "U/R":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot UorR" alt="U/R" />
        );
        break;
      case "W/U":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot WorU" alt="W/U" />
        );
        break;
      case "R/P":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot RP" alt="R/P" />
        );
        break;
      case "G/P":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot GP" alt="G/P" />
        );
        break;
      case "U/P":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot UP" alt="U/P" />
        );
        break;
      case "W/P":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot WP" alt="W/P" />
        );
        break;
      case "B/P":
        currentManaCost.push(
          <li key={j} className="cardColorDot ghostColorDot BP" alt="B/P" />
        );
        break;
      case "HW":
        currentManaCost.push(
          <img key={j} className="cardColorDot ghostColorDot HW" alt="HW" />
        );
        break;
      default:
        break;
    }
  }

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="cardContainer ghostContainer"
    >
      <ReactHoverObserver
        hoverDelayInMs={170}
        {...{
          onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
            if (
              e.target.classList.contains("bigCardImage") ||
              e.target.className === "cardName" ||
              e.target.className === "settings"
            ) {
              unsetIsHovering();
            } else {
              // if (!openSettings) {
              if (e.target.classList.contains("secondCover")) {
                setImageSrc(ghostCard.secondCard.cardImageURL);
              } else {
                setImageSrc(ghostCard.cardImage);
              }
              setIsHovering();
              // }
            }
          },
        }}
      >
        <GhostCard
          ghostCard={ghostCard}
          currentManaCost={currentManaCost}
          displaySettings={displaySettings}
          cardImageRef={cardImageRef}
          flipX={flipX}
          flipY={flipY}
          movePopup={movePopup}
          bigImageSrc={bigImageSrc}
          imageVariant={imageVariant}
        />
      </ReactHoverObserver>
    </motion.div>
  );
};

GhostCardContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
});

export default connect(mapStateToProps)(GhostCardContainer);
