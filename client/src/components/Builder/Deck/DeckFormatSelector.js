import React from "react";
import FormatOptions from "./FormatOptions";
import DownArrow from "../../../utils/icons/down-arrow.svg";

const DeckFormatSelector = ({
  deckFormat,
  setDeckInfo,
  openFormat,
  setOpenFormat,
  banner,
}) => {
  return (
    <div className="deckFormatContainer">
      <button className="formatButton" onClick={() => setOpenFormat(true)}>
        <div className="formatButtonText">
          <p className="formatDisplay">{deckFormat}</p>
          <img className="menuDownArrow" src={DownArrow} />
        </div>
      </button>
      {openFormat && (
        <FormatOptions
          currentFormat={deckFormat}
          setDeckInfo={setDeckInfo}
          setOpenFormat={setOpenFormat}
          banner={banner}
        />
      )}
    </div>
  );
};

export default DeckFormatSelector;
