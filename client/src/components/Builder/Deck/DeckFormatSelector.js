import React from "react";
import FormatOptions from "./FormatOptions";
import DownArrow from "../../../utils/icons/format-down.svg";

const DeckFormatSelector = ({
  deckFormat,
  setDeckInfo,
  openFormat,
  setOpenFormat,
}) => {
  return (
    <div className="deckFormatContainer">
      <button className="formatInput" onClick={() => setOpenFormat(true)}>
        {deckFormat}
        <img className="menuDownArrow" src={DownArrow} />
      </button>
      {openFormat && (
        <FormatOptions
          currentFormat={deckFormat}
          setDeckInfo={setDeckInfo}
          setOpenFormat={setOpenFormat}
        />
      )}
    </div>
  );
};

export default DeckFormatSelector;
