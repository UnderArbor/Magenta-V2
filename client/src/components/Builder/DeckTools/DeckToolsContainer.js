import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import barChart from "../../../utils/icons/bar-chart.svg";
import settings from "../../../utils/icons/setting.svg";
import description from "../../../utils/icons/edit.svg";

import {
  toggleDisplaySetting,
  setSortCategory,
  cloakSettings,
} from "../../../actions/deck";

import DeckToolsItems from "./DeckToolsItems";

const DeckToolsContainer = ({
  isAuthenticated,
  deckId,
  displaySettings,
  toggleDisplaySetting,
  mainCards,
  setSortCategory,
  cloakSettings,
}) => {
  const [manaCurveData, setCurveData] = useState([]);
  const [ghostCurveData, setGhostData] = useState([]);
  const [manaCurveLabels, setCurveLabels] = useState([]);
  const [toolsOption, setToolsOption] = useState(false);
  const toolsWindow = useRef(null);

  const closeTools = () => {
    setToolsOption(false);
    cloakSettings(false);
    const sticky = document.getElementById("stickyContainer");
    sticky.style.zIndex = null;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsWindow.current && !toolsWindow.current.contains(event.target)) {
        closeTools();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      cloakSettings(false);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    var data = [];
    var ghostData = [];
    var labels = [];
    mainCards.forEach((card) => {
      if (card.mainType !== "Land") {
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
  }, [mainCards]);

  useEffect(async () => {
    const cardSize = displaySettings.cardSize;
    root.style.setProperty("--card-width", (cardSize / 100) * 120 + "px");
    root.style.setProperty("--card-height", (cardSize / 100) * 168 + "px");
    root.style.setProperty("--card-name-size", (cardSize / 100) * 18 + "px");
    root.style.setProperty("--quant-button-size", (cardSize / 100) * 40 + "px");
    root.style.setProperty("--quant-size", (cardSize / 100) * 30 + "px");
    root.style.setProperty("--line-height", (cardSize / 100) * 20 + "px");
  }, [displaySettings.cardSize]);

  useEffect(async () => {
    if (isAuthenticated && deckId !== null) {
      const body = { displaySettings };
      await axios.put(`api/deck/toolChange/${deckId}`, body);
    }
  }, [displaySettings]);

  return (
    <div className="decktoolsContainer" ref={toolsWindow}>
      <div className="decktoolsSubContainer">
        <div className="decktoolsButtonContainer">
          <button
            className="decktoolsButton"
            onClick={() => {
              if (toolsOption === "stats") {
                closeTools();
              } else {
                setToolsOption("stats");
                cloakSettings(true);
                const sticky = document.getElementById("stickyContainer");
                sticky.style.zIndex = 100;
              }
            }}
          >
            {toolsOption !== "stats" && (
              <div
                className={`toolCover ${
                  toolsOption !== false && "extraToolCover"
                }`}
              ></div>
            )}
            <img className="toolsIcon" src={barChart} />
          </button>
          <button
            className="decktoolsButton"
            onClick={() => {
              if (toolsOption === "settings") {
                closeTools();
              } else {
                setToolsOption("settings");
                cloakSettings(true);
                const sticky = document.getElementById("stickyContainer");
                sticky.style.zIndex = 100;
              }
            }}
          >
            {toolsOption !== "settings" && (
              <div
                className={`toolCover ${
                  toolsOption !== false && "extraToolCover"
                }`}
              ></div>
            )}
            <img className="toolsIcon" src={settings} />
          </button>
          <button
            className="decktoolsButton"
            onClick={() => {
              if (toolsOption === "description") {
                closeTools();
              } else {
                setToolsOption("description");
                cloakSettings(true);
                const sticky = document.getElementById("stickyContainer");
                sticky.style.zIndex = 100;
              }
            }}
          >
            {toolsOption !== "description" && (
              <div
                className={`toolCover ${
                  toolsOption !== false && "extraToolCover"
                }`}
              ></div>
            )}
            <img className="toolsIcon" src={description} />
          </button>
        </div>
        <DeckToolsItems
          toolsOption={toolsOption}
          displaySettings={displaySettings}
          toggleDisplaySetting={toggleDisplaySetting}
          manaCurveData={manaCurveData}
          ghostCurveData={ghostCurveData}
          manaCurveLabels={manaCurveLabels}
          currentCategory={displaySettings.sortCategory}
          setCategory={setSortCategory}
        />
      </div>
    </div>
  );
};

DeckToolsContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  deckId: PropTypes.string,
  toggleDisplaySetting: PropTypes.func.isRequired,
  setSortCategory: PropTypes.func.isRequired,
  cloakSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
  isAuthenticated: state.auth.isAuthenticated,
  deckId: state.deck.deckId,
});

export default connect(mapStateToProps, {
  toggleDisplaySetting,
  setSortCategory,
  cloakSettings,
})(DeckToolsContainer);
