import React from "react";

import image from "../../../../../../utils/icons/image.svg";

const SettingFirstColumn = ({
  changeDeckArt,
  cardImage,
  setImage,
  cardArt,
}) => {
  return (
    <div className="settingColumn column1">
      <img
        ref={setImage}
        draggable="false"
        className="settingCardImage"
        src={cardImage}
        alt="Doopsie"
      ></img>
      <div
        className="imageButtonContainer"
        onClick={() =>
          changeDeckArt((prevState) => ({
            ...prevState,
            deckImage: cardArt,
          }))
        }
      >
        <img src={image} className="imageButton" />
        <button className="settingDeckImage">Make Deck Image</button>
      </div>
    </div>
  );
};

export default SettingFirstColumn;
