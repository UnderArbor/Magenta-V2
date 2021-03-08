import React from "react";
import { Link } from "react-router-dom";

const DeckSlot = ({ deckInfo, globalDeckId }) => {
  return (
    <div
      className={
        deckInfo.id === globalDeckId
          ? "selectedDeck deckSlotContainer"
          : "deckSlotContainer"
      }
    >
      <Link to={`/builder/${deckInfo.id}`} className="deckRef">
        <img className="deckButton" src={deckInfo.picture} alt="oopsie" />
      </Link>
      <div className="deckSlotCover" />
      <p className="deckSlotName">{deckInfo.name}</p>
    </div>
  );
};

export default DeckSlot;
