import React, { useEffect, useState } from "react";
import { produce } from "immer";
import { motion, AnimatePresence } from "framer-motion";

const DeckColors = ({ colors }) => {
  const colorVariant = {
    hidden: {
      height: 0,
    },
    visible: {
      height: 175,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      height: 0,
      transition: {
        duration: 0.35,
        ease: "easeIn",
      },
    },
  };

  const [colorInfo, setColorInfo] = useState({
    classNames: {
      class1: "",
      class2: "",
      class3: "",
      class4: "",
      class5: "",
    },
    colorTotal: 0,
    heights: {
      height1: 0,
      height2: 0,
      height3: 0,
      height4: 0,
      height5: 0,
    },
  });

  const [showBars, setShowBars] = useState(false);

  useEffect(() => {
    var count = 0;
    const newColors = produce(colorInfo, (draft) => {
      draft.classNames.class1 = "";
      draft.classNames.class2 = "";
      draft.classNames.class3 = "";
      draft.classNames.class4 = "";
      draft.classNames.class5 = "";
      Object.keys(colors).map((color) => {
        if (colors[color] > draft.colorTotal) {
          draft.colorTotal = colors[color];
        }
        switch (count) {
          case 0:
            if (colors[color] > 0) {
              count++;
              draft.classNames.class1 = `${color}`;
              draft.heights.height1 = colors[color];
            }
            break;
          case 1:
            if (colors[color] > 0) {
              count++;
              draft.classNames.class2 = `${color}`;
              draft.heights.height2 = colors[color];
            }
            break;
          case 2:
            if (colors[color] > 0) {
              count++;
              draft.classNames.class3 = `${color}`;
              draft.heights.height3 = colors[color];
            }
            break;
          case 3:
            if (colors[color] > 0) {
              count++;
              draft.classNames.class4 = `${color}`;
              draft.heights.height4 = colors[color];
            }
            break;
          case 4:
            if (colors[color] > 0) {
              count++;
              draft.classNames.class5 = `${color}`;
              draft.heights.height5 = colors[color];
            }
            break;
          default:
            break;
        }
      });
    });
    console.log("total: ", newColors.colorTotal);
    setColorInfo(newColors);
  }, [colors]);

  useEffect(() => {
    console.log(
      "colors: ",
      (colorInfo.heights.height1 / colorInfo.colorTotal) * 100
    );
  }, [colorInfo]);

  return (
    <div className="deckColorContainer">
      <AnimatePresence>
        {showBars && (
          <motion.ul
            className="colorBarContainer"
            variants={colorVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <li
              className={`colorBar ${colorInfo.classNames.class1}Bar`}
              style={{
                height: `${
                  (colorInfo.heights.height1 / colorInfo.colorTotal) * 100
                }%`,
              }}
            ></li>
            <li
              className={`colorBar ${colorInfo.classNames.class2}Bar`}
              style={{
                height: `${
                  (colorInfo.heights.height2 / colorInfo.colorTotal) * 100
                }%`,
              }}
            ></li>
            <li
              className={`colorBar ${colorInfo.classNames.class3}Bar`}
              style={{
                height: `${
                  (colorInfo.heights.height3 / colorInfo.colorTotal) * 100
                }%`,
              }}
            ></li>
            <li
              className={`colorBar ${colorInfo.classNames.class4}Bar`}
              style={{
                height: `${
                  (colorInfo.heights.height4 / colorInfo.colorTotal) * 100
                }%`,
              }}
            ></li>
            <li
              className={`colorBar ${colorInfo.classNames.class5}Bar`}
              style={{
                height: `${
                  (colorInfo.heights.height5 / colorInfo.colorTotal) * 100
                }%`,
              }}
            ></li>
          </motion.ul>
        )}
      </AnimatePresence>
      <ul
        className="colorSymbolContainer"
        onMouseEnter={() => setShowBars(true)}
        onMouseLeave={() => setShowBars(false)}
      >
        <li className={`deckColorDot ${colorInfo.classNames.class1}`}></li>
        <li
          className={`deckColorDot ${colorInfo.classNames.class2}`}
          style={{
            height: `${
              (colorInfo.heights.height2 / colorInfo.colorTotal) * 100
            }%`,
          }}
        ></li>
        <li className={`deckColorDot ${colorInfo.classNames.class3}`}></li>
        <li className={`deckColorDot ${colorInfo.classNames.class4}`}></li>
        <li className={`deckColorDot ${colorInfo.classNames.class5}`}></li>
      </ul>
    </div>
  );
};

export default DeckColors;
