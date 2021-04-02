import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import StickyBox from "react-sticky-box";

import { toggleDisplaySetting } from "../../../actions/deck";

import DeckToolsItems from "./DeckToolsItems";

const DeckToolsContainer = ({
  tools,
  setTools,
  displaySettings,
  toggleDisplaySetting,
}) => {
  const [cardSize, setCardSize] = useState(100);
  const toolsButtonHTML = tools ? "Close" : "Tools";

  const buttonVariant = {
    hidden: {
      x: 15,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        easing: "easeIn",
        duration: 0.5,
        delay: 0.8,
      },
    },
  };

  useEffect(() => {
    root.style.setProperty("--card-width", (cardSize / 100) * 120 + "px");
    root.style.setProperty("--card-height", (cardSize / 100) * 168 + "px");
    root.style.setProperty("--card-name-size", (cardSize / 100) * 18 + "px");
    root.style.setProperty("--quant-button-size", (cardSize / 100) * 40 + "px");
    root.style.setProperty("--quant-size", (cardSize / 100) * 30 + "px");
  }, [cardSize]);

  return (
    <div className="decktoolsContainer">
      <motion.button
        variants={buttonVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={tools ? "activeDeckTools" : "inactiveDeckTools"}
        onClick={() => {
          let deckWindow = document.querySelectorAll(".typeGrid");
          deckWindow.forEach((item) => {
            if (!tools) {
              item.classList.add("skinnyGrid");
            } else {
              item.classList.remove("skinnyGrid");
            }
          });
          setTools(!tools);
        }}
      >
        {toolsButtonHTML}
      </motion.button>
      <StickyBox>
        <DeckToolsItems
          tools={tools}
          displaySettings={displaySettings}
          toggleDisplaySetting={toggleDisplaySetting}
          cardSize={cardSize}
          setCardSize={setCardSize}
        />
      </StickyBox>
    </div>
  );
};

DeckToolsContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
  toggleDisplaySetting: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
});

export default connect(mapStateToProps, { toggleDisplaySetting })(
  DeckToolsContainer
);
