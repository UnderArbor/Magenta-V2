import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "react-switch";

import DownArrow from "../../../utils/icons/format-down.svg";

const DeckToolsItems = ({ tools, displaySettings, toggleDisplaySetting }) => {
  const toolsVariant = {
    hidden: {
      right: 0,
      width: "0px",
    },
    visible: {
      right: 550,
      width: "550px",
      transition: {
        ease: "easeOut",
        duration: 0.35,
        delayChildren: 0.3,
      },
    },
    exit: {
      right: 0,
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
              <img src={DownArrow} className="menuDownArrow" />
            </p>
            <div className="manaCurveContainer">
              <p className="manaCurveText">In Development</p>
            </div>
          </div>
          <div className="toolsCategory">
            <p className="toolsName">
              Card Display Settings
              <img src={DownArrow} className="menuDownArrow" />
            </p>
            <div className="displayToggleContainer">
              <div className="displaySetting">
                <p className="displaySettingName">Display Mana</p>
                <Switch
                  id="manaDisplay"
                  onChange={(checked, e, id) =>
                    toggleDisplaySetting(checked, id)
                  }
                  checked={displaySettings.displayMana}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#dbd599"}
                  onHandleColor={"#fff340"}
                  offColor={"#707070"}
                  offHandleColor={"#a0a0a0"}
                  handleDiameter={36}
                />
              </div>
              <div className="displaySetting">
                <p className="displaySettingName">Display Quantity</p>
                <Switch
                  id="quantityDisplay"
                  onChange={(checked, e, id) =>
                    toggleDisplaySetting(checked, id)
                  }
                  checked={displaySettings.displayQuantity}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#dbd599"}
                  onHandleColor={"#fff340"}
                  offColor={"#707070"}
                  offHandleColor={"#a0a0a0"}
                  handleDiameter={36}
                />
              </div>
              <div className="displaySetting">
                <p className="displaySettingName">Quantity Indicator</p>
                <Switch
                  id="indicatorDisplay"
                  onChange={(checked, e, id) =>
                    toggleDisplaySetting(checked, id)
                  }
                  checked={displaySettings.displayIndicator}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#dbd599"}
                  onHandleColor={"#fff340"}
                  offColor={"#707070"}
                  offHandleColor={"#a0a0a0"}
                  handleDiameter={36}
                />
              </div>
              <div className="displaySetting">
                <p className="displaySettingName">Display Name</p>
                <Switch
                  id="nameDisplay"
                  onChange={(checked, e, id) =>
                    toggleDisplaySetting(checked, id)
                  }
                  checked={displaySettings.displayName}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#dbd599"}
                  onHandleColor={"#fff340"}
                  offColor={"#707070"}
                  offHandleColor={"#a0a0a0"}
                  handleDiameter={36}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeckToolsItems;
