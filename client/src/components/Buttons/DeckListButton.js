import React from "react";
import { Link } from "react-router-dom";
import DownArrow from "../../utils/icons/deck-list-down.svg";

const DeckListButton = ({ toggleDeckList, openDeckList }) => {
  return (
    <div className="deckButtonContainer">
      <Link to="/decks" className="deckListLink">
        Deck List
      </Link>
      <div
        className="deckListDropdown"
        onClick={() => toggleDeckList(!openDeckList)}
      >
        <img
          className={`menuDownArrow deckListArrow ${
            !openDeckList && "deckListArrowReverse"
          }`}
          src={DownArrow}
        />
      </div>
    </div>
  );
};

export default DeckListButton;
