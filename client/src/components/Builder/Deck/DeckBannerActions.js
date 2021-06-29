import React from "react";
import copyIcon from "../../../utils/icons/copy-content.svg";
import shareIcon from "../../../utils/icons/share.svg";
import buyIcon from "../../../utils/icons/dollar-symbol.svg";
import trashIcon from "../../../utils/icons/delete.svg";
import trashNullIcon from "../../../utils/icons/null-delete.svg";

const DeckBannerActions = ({
  isAuthenticated,
  history,
  setDeckId,
  deleteDeck,
  deckInfo,
  displayActionOverlay,
  setActionOverlay,
  actionWindow,
}) => {
  return (
    <div className="deckActionContainer" ref={actionWindow}>
      <div className="actionGroup">
        <img className="actionIcon" src={shareIcon} />
        <button
          className="shareDeck actionLabel"
          onClick={() => {
            setActionOverlay("share");
          }}
        >
          Share
        </button>
        {displayActionOverlay === "share" && (
          <div className="actionBox shareActionBox">
            <div className="actionRow">
              <p className="actionSubLabel">URL:</p>
              <div className="urlBox">
                <input
                  className="urlInput"
                  placeholder={window.location.href}
                  disabled
                ></input>
                <vr className="urlVR" />
                <img
                  className="urlCopyButton"
                  src={copyIcon}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                ></img>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="actionGroup">
        <img className="actionIcon" src={buyIcon} />
        <button
          className="buyDeck actionLabel"
          onClick={() => {
            setActionOverlay("buy");
          }}
        >
          Buy
        </button>
        {displayActionOverlay === "buy" && (
          <div className="actionBox buyActionBox">
            <div className="actionRow">To Be Developed...</div>
          </div>
        )}
      </div>
      <vr className="actionVR" />
      <div className="actionGroup">
        <img
          className="actionIcon"
          src={isAuthenticated ? trashIcon : trashNullIcon}
          style={{ opacity: isAuthenticated ? 1 : 0.7 }}
        />
        <button
          className={`actionLabel ${
            isAuthenticated ? "deleteDeck" : "nullLabel"
          }`}
          onClick={() => {
            setActionOverlay("delete");
          }}
        >
          Trash
        </button>

        {displayActionOverlay === "delete" && (
          <div className="actionBox trashActionBox">
            <div className="actionRow">
              <p className="actionSubLabel">Trash Deck?</p>
              <div className="trashBox">
                <button
                  className="trashButton confirmTrash"
                  onClick={() => {
                    if (isAuthenticated) {
                      deleteDeck(deckInfo.deckId);
                      setDeckId(null);
                      history.push("/builder");
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="trashButton declineTrash"
                  onClick={() => setActionOverlay(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckBannerActions;
