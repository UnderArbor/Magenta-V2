import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "react-switch";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import DownArrow from "../../../utils/icons/format-down.svg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const DeckToolsItems = ({
  tools,
  displaySettings,
  toggleDisplaySetting,
  cardSize,
  setCardSize,
}) => {
  const toolsVariant = {
    hidden: {
      right: 0,
      width: "0px",
    },
    visible: {
      right: "30vw",
      width: "30vw",
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

  const handleSliderChange = (event, newValue) => {
    setCardSize(newValue);
  };

  const SizeSlider = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          color: "#dbd599",
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: "#fff340",
          marginTop: -10,
          marginLeft: -12,
          boxShadow: "0 0 0 0 #000",
          "&:hover": {
            boxShadow: "0 0 2px 7px rgba(219, 213, 153, 0.2)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              boxShadow: "0 0 0 0 #000",
            },
          },
          "&:active": {
            boxShadow: "0 0 3px 10px rgba(219, 213, 153, 0.35)",
          },
        },
        valueLabel: {
          left: -4,
          "& *": {
            background: "#601466",
            color: "#f1e6f2",
          },
        },
        track: {
          height: 4,
          borderRadius: 2,
        },
        rail: {
          height: 4,
          borderRadius: 2,
        },
      },
    },
  });

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
              <div className="displaySetting">
                <p className="displaySettingName">Card Size %</p>
                <div className="displaySlider">
                  <ThemeProvider theme={SizeSlider}>
                    <Slider
                      value={cardSize}
                      min={60}
                      max={120}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                    />
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeckToolsItems;
