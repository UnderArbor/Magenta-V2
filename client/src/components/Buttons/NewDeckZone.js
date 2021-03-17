import React from "react";
import FormatOptions from "../Builder/Deck/FormatOptions";
import DownArrow from "../../utils/icons/format-down.svg";

const NewDeckZone = ({
  createDeck,
  queryChange,
  currentFormat,
  openFormat,
  setOpenFormat,
  setDeckInfo,
}) => {
  return (
    <div className="createNewDeckZone">
      <p className="newDeckTitle">New Deck</p>
      <div className="fieldGroup">
        <p className="fieldTitle">Name</p>
        <input
          className="newDeckField"
          placeholder="New Deck"
          onChange={(e) => {
            queryChange(e, "name");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createDeck();
            }
          }}
        />
      </div>
      <div className="fieldGroup">
        <p className="fieldTitle">Format</p>
        <div className="deckFormatContainer">
          <button
            className="newDeckFormatField formatInput"
            onClick={() => setOpenFormat(true)}
          >
            {currentFormat}
            <img className="menuDownArrow" src={DownArrow} />
          </button>
          {openFormat && (
            <FormatOptions
              currentFormat={currentFormat}
              setDeckInfo={setDeckInfo}
              setOpenFormat={setOpenFormat}
            />
          )}
        </div>
      </div>
      <div className="fieldGroup">
        <p className="fieldTitle notAllowed">Commander:</p>
        <input
          className="newDeckField notAllowed"
          style={{ backgroundColor: "grey" }}
          onChange={(e) => {
            queryChange(e, "commander");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createDeck();
            }
          }}
          disabled
        />
      </div>
      <button onClick={async () => createDeck()} className="createDeckButton">
        Create Deck
      </button>
    </div>
  );
};

export default NewDeckZone;
