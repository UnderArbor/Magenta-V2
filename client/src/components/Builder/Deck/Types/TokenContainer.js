import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { AnimatePresence } from "framer-motion";
import Token from "./Token";

const TokenContainer = ({ tokens, displaySettings }) => {
  const cardImageRef = useRef(null);

  const [flips, setFlips] = useState({
    flipX: false,
    flipY: false,
  });

  const { flipX, flipY } = flips;

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
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };

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

  return (
    <div className="tokenContent">
      <div className="typeTitle">Tokens</div>
      <hr className="typeDivider" />
      <div className="typeContainer">
        <AnimatePresence>
          {tokens.map((token) => {
            return (
              <Token
                token={token}
                key={token.name}
                imageVariant={imageVariant}
                cardVariant={cardVariant}
                cardImageRef={cardImageRef}
                flipX={flipX}
                flipY={flipY}
                movePopup={movePopup}
                displaySettings={displaySettings}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

TokenContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
});

export default connect(mapStateToProps)(TokenContainer);
