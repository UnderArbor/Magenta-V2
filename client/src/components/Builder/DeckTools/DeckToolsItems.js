import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DisplayContainer from "./DisplayContainer";
import ManaCurveContainer from "./ManaCurveContainer";
import CardSorting from "./CardSorting";

import DownArrow from "../../../utils/icons/format-down.svg";

const DeckToolsItems = ({
  tools,
  displaySettings,
  toolBooleans,
  toggleDisplaySetting,
  toggleToolBooleans,
  manaCurveData,
  ghostCurveData,
  manaCurveLabels,
  currentCategory,
  setCategory,
}) => {
  const toolsVariant = {
    hidden: {
      width: "0px",
    },
    visible: {
      width: "500px",
      transition: {
        ease: "easeOut",
        duration: 0.35,
        delayChildren: 0.3,
      },
    },
    exit: {
      width: "0px",
      transition: {
        ease: "easeOut",
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };

  const titleVariant = {
    hidden: {
      opacity: 0,
      x: -4,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeIn",
        duration: 0.35,
      },
    },
    exit: {
      opacity: 0,
      x: -4,
      transition: {
        ease: "easeOut",
        duration: 0.35,
      },
    },
  };

  const handleSliderChange = (event, newValue) => {
    toggleDisplaySetting(newValue, "cardSize");
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {tools && (
        <motion.div
          className="toolsMenu"
          variants={toolsVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.p className="toolsTitle" variants={titleVariant}>
            Deck Tools
          </motion.p>
          <div className="toolsCategory">
            <p className="toolsName">
              Mana Curve
              <img
                src={DownArrow}
                className="menuDownArrow"
                onClick={() =>
                  toggleToolBooleans("manaCurve", !toolBooleans.manaCurve)
                }
              />
            </p>
            {toolBooleans.manaCurve && (
              <ManaCurveContainer
                manaCurveData={manaCurveData}
                ghostCurveData={ghostCurveData}
                manaCurveLabels={manaCurveLabels}
              />
            )}
          </div>
          <div className="toolsCategory">
            <p className="toolsName">
              Card Display Settings
              <img
                src={DownArrow}
                className="menuDownArrow"
                onClick={() =>
                  toggleToolBooleans(
                    "displaySettings",
                    !toolBooleans.displaySettings
                  )
                }
              />
            </p>
            {toolBooleans.displaySettings && (
              <DisplayContainer
                displaySettings={displaySettings}
                toggleDisplaySetting={toggleDisplaySetting}
                handleSliderChange={handleSliderChange}
              />
            )}
          </div>
          <div className="toolsCategory">
            <p className="toolsName">
              Sort Cards
              <img
                src={DownArrow}
                className="menuDownArrow"
                onClick={() =>
                  toggleToolBooleans("cardSorting", !toolBooleans.cardSorting)
                }
              />
            </p>
            {toolBooleans.cardSorting && (
              <CardSorting
                currentCategory={currentCategory}
                setCategory={setCategory}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeckToolsItems;
