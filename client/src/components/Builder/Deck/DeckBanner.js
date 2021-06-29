import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import DeckNameDisplay from "./DeckNameDisplay";
import DeckFormatSelector from "./DeckFormatSelector";
import DeckColors from "./DeckColors";

import exitIcon from "../../../utils/icons/close-deck.svg";
import DownloadIcon from "../../../utils/icons/download-button.svg";

import { ItemTypes } from "../../Constants";
import DeckBannerActions from "./DeckBannerActions";

const deckVariant = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.5,
      staggerChildren: 1,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.5,
    },
  },
};

const DeckBanner = ({
  deckInfo,
  setDeckInfo,
  cardCount,
  setDeckId,
  colors,
  isAuthenticated,
  deleteDeck,
  exportDeck,
  commanderDisplay,
}) => {
  let history = useHistory();
  const deckImageRef = useRef(null);
  const actionWindow = useRef(null);
  const downloadWindow = useRef(null);
  const [openFormat, setOpenFormat] = useState(false);
  const [showBars, setShowBars] = useState(false);

  const [displayActionOverlay, setActionOverlay] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      setDeckInfo((prevState) => ({ ...prevState, deckImage: item.image }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(deckImageRef);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !actionWindow.current.contains(event.target) &&
        !downloadWindow.current.contains(event.target)
      ) {
        setActionOverlay(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="deckBanner"
      variants={deckVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="deckInfoContainer">
        <img
          className="builderExit"
          onClick={() => {
            setDeckId(null);
            history.push("/builder");
          }}
          src={exitIcon}
        />
        <div className="deckInfo">
          <DeckNameDisplay deckInfo={deckInfo} setDeckInfo={setDeckInfo} />
          <div className="mainDeckInfo">
            <div className="leftDeckInfo">
              <div className="bannerGroup">
                <DeckFormatSelector
                  deckFormat={deckInfo.deckFormat}
                  setDeckInfo={setDeckInfo}
                  openFormat={openFormat}
                  setOpenFormat={setOpenFormat}
                  banner={true}
                />
                {commanderDisplay !== null && (
                  <p className="commanderDisplay">
                    {" "}
                    - Commader: {commanderDisplay}
                  </p>
                )}
              </div>

              <p className="cardCount">Total Cards: {cardCount}</p>
            </div>
            <div className="rightDeckInfo">
              <div className="bannerGroup">
                <p className="deckAuthor">Created By: User_Name</p>
                <div className="actionGroup downloadGroup" ref={downloadWindow}>
                  <img className="actionIcon" src={DownloadIcon} />
                  <button
                    onClick={() => {
                      setActionOverlay("download");
                    }}
                    className="exportDeck actionLabel"
                  >
                    Download
                  </button>

                  {displayActionOverlay === "download" && (
                    <div
                      className="actionBox downloadActionBox"
                      onClick={() => exportDeck()}
                    >
                      This is some example text for your message.
                    </div>
                  )}
                </div>
              </div>
              <DeckBannerActions
                isAuthenticated={isAuthenticated}
                history={history}
                setDeckId={setDeckId}
                deleteDeck={deleteDeck}
                deckInfo={deckInfo}
                displayActionOverlay={displayActionOverlay}
                setActionOverlay={setActionOverlay}
                actionWindow={actionWindow}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="deckImageCover">
        {deckInfo.deckImage !== "false" ? (
          <img
            ref={deckImageRef}
            className={!isOver ? "deckImage" : "deckImage hoverImage"}
            src={deckInfo.deckImage}
            onMouseEnter={() => setShowBars(true)}
            onMouseLeave={() => setShowBars(false)}
          />
        ) : (
          <div className="deckImagePlaceholder" />
        )}
        <DeckColors colors={colors} showBars={showBars} />
      </div>
    </motion.div>
  );
};

export default DeckBanner;
