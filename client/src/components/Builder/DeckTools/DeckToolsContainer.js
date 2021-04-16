import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import StickyBox from "react-sticky-box";

import {
  toggleDisplaySetting,
  toggleToolBooleans,
  setSortCategory,
} from "../../../actions/deck";

import DeckToolsItems from "./DeckToolsItems";

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

const DeckToolsContainer = ({
  isAuthenticated,
  deckId,
  tools,
  setTools,
  displaySettings,
  toolBooleans,
  toggleDisplaySetting,
  toggleToolBooleans,
  types,
  currentCategory,
  setSortCategory,
}) => {
  const [manaCurveData, setCurveData] = useState([]);
  const [ghostCurveData, setGhostData] = useState([]);
  const [manaCurveLabels, setCurveLabels] = useState([]);

  useEffect(() => {
    var data = [];
    var ghostData = [];
    var labels = [];

    types.forEach((type) => {
      if (type.name !== "Land") {
        type.cards.forEach((card) => {
          for (var i = 0; i < card.modifiedCMC.length; ++i) {
            const currentCMC = card.modifiedCMC[i];

            if (currentCMC === card.mainCMC) {
              if (data[currentCMC] === undefined) {
                data[currentCMC] = Number(card.quantity);
              } else {
                data[currentCMC] += Number(card.quantity);
              }
            } else {
              if (ghostData[currentCMC] === undefined) {
                ghostData[currentCMC] = Number(card.quantity);
              } else {
                ghostData[currentCMC] += Number(card.quantity);
              }
            }
          }
          if (card.secondCard.name !== "") {
            for (var i = 0; i < card.secondCard.modifiedCMC.length; ++i) {
              const currentCMC = card.secondCard.modifiedCMC[i];

              if (currentCMC === card.mainCMC) {
                if (data[currentCMC] === undefined) {
                  data[currentCMC] = Number(card.quantity);
                } else {
                  data[currentCMC] += Number(card.quantity);
                }
              } else {
                if (ghostData[currentCMC] === undefined) {
                  ghostData[currentCMC] = Number(card.quantity);
                } else {
                  ghostData[currentCMC] += Number(card.quantity);
                }
              }
            }
          }
        });
      }
    });

    const dataLength =
      data.length > ghostData.length ? data.length : ghostData.length;
    for (var i = 0; i < dataLength; ++i) {
      labels.push(i);
      if (data[i] === undefined) {
        data[i] = 0;
      }
      if (ghostData[i] === undefined) {
        ghostData[i] = 0;
      }
    }
    setCurveData(data);
    setGhostData(ghostData);
    setCurveLabels(labels);
  }, [types]);

  useEffect(async () => {
    const cardSize = displaySettings.cardSize;
    root.style.setProperty("--card-width", (cardSize / 100) * 120 + "px");
    root.style.setProperty("--card-height", (cardSize / 100) * 168 + "px");
    root.style.setProperty("--card-name-size", (cardSize / 100) * 18 + "px");
    root.style.setProperty("--quant-button-size", (cardSize / 100) * 40 + "px");
    root.style.setProperty("--quant-size", (cardSize / 100) * 30 + "px");
    root.style.setProperty("--line-height", (cardSize / 100) * 20 + "px");
    if (isAuthenticated && deckId !== null) {
      const body = { displaySettings };
      await axios.put(`api/deck/toolChange/${deckId}`, body);
    }
  }, [displaySettings]);

  useEffect(async () => {
    if (isAuthenticated && deckId !== null) {
      const body = { toolBooleans };
      await axios.put(`api/deck/toolChange/${deckId}`, body);
    }
  }, [toolBooleans]);

  return (
    <div className="decktoolsContainer">
      <StickyBox>
        <div className="decktoolsSubContainer">
          <motion.button
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={
              tools ? "decktoolsButton" : "decktoolsButton inactiveToolsButton"
            }
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
          />
          <DeckToolsItems
            tools={tools}
            displaySettings={displaySettings}
            toolBooleans={toolBooleans}
            toggleDisplaySetting={toggleDisplaySetting}
            toggleToolBooleans={toggleToolBooleans}
            manaCurveData={manaCurveData}
            ghostCurveData={ghostCurveData}
            manaCurveLabels={manaCurveLabels}
            currentCategory={displaySettings.sortCategory}
            setCategory={setSortCategory}
          />
        </div>
      </StickyBox>
    </div>
  );
};

DeckToolsContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  deckId: PropTypes.string,
  toolBooleans: PropTypes.object.isRequired,
  toggleDisplaySetting: PropTypes.func.isRequired,
  toggleToolBooleans: PropTypes.func.isRequired,
  setSortCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
  isAuthenticated: state.auth.isAuthenticated,
  deckId: state.deck.deckId,
  toolBooleans: state.deck.toolBooleans,
});

export default connect(mapStateToProps, {
  toggleDisplaySetting,
  toggleToolBooleans,
  setSortCategory,
})(DeckToolsContainer);
