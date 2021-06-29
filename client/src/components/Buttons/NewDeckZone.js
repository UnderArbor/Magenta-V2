import React from "react";
import FormatOptions from "../Builder/Deck/FormatOptions";
import DownArrow from "../../utils/icons/down-arrow-dark.svg";

const NewDeckZone = ({
  createDeck,
  queryChange,
  currentFormat,
  openFormat,
  setOpenFormat,
  deckCommander,
  setDeckInfo,
  showCommanders,
  setShowCommanders,
  commanderList,
  commanderRef,
  showCommander,
}) => {
  return (
    <div className="createNewDeckZone">
      <p className="newDeckTitle">New Deck</p>
      <div className="fieldGroup">
        <p className="fieldTitle">Deck Name</p>
        <input
          className="newDeckField"
          placeholder="New Deck"
          onChange={(e) => {
            queryChange(e.target.value, "name");
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
        <div className="newFormatContainer">
          <button
            className="newDeckFormatField"
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
              banner={false}
            />
          )}
        </div>
        <div className="fieldGroup" ref={commanderRef}>
          <p className={`fieldTitle ${!showCommander && "nullFieldTitle"}`}>
            Commander:
          </p>
          <input
            className={`newDeckField ${!showCommander && "nullNewDeckField"}`}
            value={deckCommander}
            onChange={(e) => {
              queryChange(e.target.value, "commander");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createDeck();
              }
            }}
            onFocus={(e) => {
              if (showCommander) setShowCommanders(true);
              else e.target.blur();
            }}
          />
          {showCommanders && (
            <div className="commanderAutofillContainer">
              {commanderList.map((commander) => {
                return (
                  <div
                    className="commanderAutofill"
                    key={commander.name}
                    onClick={(e) => {
                      queryChange(e.target.innerHTML, "commander");
                      setShowCommanders(false);
                    }}
                  >
                    {commander.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={async () => createDeck()}
        className="headerButton builderEnter createDeckButton"
      >
        Create Deck
      </button>
    </div>
  );
};

export default NewDeckZone;
