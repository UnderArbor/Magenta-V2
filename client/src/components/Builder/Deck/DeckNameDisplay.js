import React from "react";
import produce from "immer";

const DeckNameDisplay = ({ deckInfo, setDeckInfo }) => {
  return (
    <div className="deckNameDisplay">
      <input
        onBlur={(e) => {
          if (e.target.value.length > 0) {
            const newName = e.target.value;
            setDeckInfo((prevState) => ({
              ...prevState,
              deckName: newName,
            }));
          }
          e.target.value = "";
        }}
        className="deckNameField"
        placeholder={deckInfo.deckName}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
        required
      />
    </div>
  );
};

export default DeckNameDisplay;
