import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import { toggleDisplaySetting } from "../../../actions/deck";

import DeckToolsItems from "./DeckToolsItems";

const DeckToolsContainer = ({
  tools,
  setTools,
  displaySettings,
  toggleDisplaySetting,
}) => {
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
      <DeckToolsItems
        tools={tools}
        displaySettings={displaySettings}
        toggleDisplaySetting={toggleDisplaySetting}
      />
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
