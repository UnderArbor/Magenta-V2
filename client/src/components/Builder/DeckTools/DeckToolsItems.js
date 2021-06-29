import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DisplayContainer from "./DisplayContainer";
import ManaCurveContainer from "./ManaCurveContainer";
import CardSorting from "./CardSorting";

const DeckToolsItems = ({
  toolsOption,
  displaySettings,
  toggleDisplaySetting,
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
    // exit: {
    //   opacity: 0,
    //   x: -4,
    //   transition: {
    //     ease: "easeOut",
    //     duration: 0.35,
    //   },
    // },
  };

  const handleSliderChange = (event, newValue) => {
    toggleDisplaySetting(newValue, "cardSize");
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {toolsOption && (
        <motion.div
          className="toolsMenu"
          variants={toolsVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {toolsOption === "stats" ? (
            <div className="toolsCategory">
              <motion.p className="toolsTitle" variants={titleVariant}>
                Statistics
              </motion.p>
              <p className="toolsName">Mana Curve</p>
              <ManaCurveContainer
                manaCurveData={manaCurveData}
                ghostCurveData={ghostCurveData}
                manaCurveLabels={manaCurveLabels}
              />
            </div>
          ) : toolsOption === "settings" ? (
            <div className="toolsCategory">
              <motion.p className="toolsTitle" variants={titleVariant}>
                Visual Display
              </motion.p>
              <p className="toolsName">Sort Cards</p>
              <CardSorting
                currentCategory={currentCategory}
                setCategory={setCategory}
              />
              <p className="toolsName">Card Display Settings</p>
              <DisplayContainer
                displaySettings={displaySettings}
                toggleDisplaySetting={toggleDisplaySetting}
                handleSliderChange={handleSliderChange}
              />
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeckToolsItems;
