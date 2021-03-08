import React from "react";

import SetDropDown from "./SetDropDown";
import LoadingIcon from "../../../SearchBar/LoadingIcon";

import placeholder from "../../../../../utils/images/Placeholder.jpg";
import DownArrow from "../../../../../utils/icons/settings-down.svg";

const Settings = ({
  typeIndex,
  cardIndex,
  settingWindow,
  setImage,
  imageCoords,
  card,
  sets,
  filterSets,
  userQuery,
  setUserQuery,
  openSetDropDown,
  setOpenSetDropDown,
  changeCardSet,
  changeDeckArt,
  flipX,
  flipY,
}) => {
  return (
    <div
      ref={settingWindow}
      className={`settingsContainer ${
        !flipX && !flipY
          ? "popupBR"
          : flipX && !flipY
          ? "popupBL"
          : !flipX && flipY
          ? "popupTR"
          : "popupTL"
      }`}
    >
      <p className="settingsTitle">{card.name}</p>
      <div className="settingSelector">
        <p className="settingName">Change Set: </p>
        <input
          className="setInput"
          type="text"
          placeholder={card.setName}
          value={userQuery}
          onChange={(e) => {
            setUserQuery(e.target.value);
          }}
          required
        ></input>
        {sets.loading ? (
          <LoadingIcon
            right={"8px"}
            top={"66px"}
            size={"6px"}
            color={"#f1e6f2"}
          />
        ) : (
          <img
            className="setDropButton"
            onClick={() => {
              setOpenSetDropDown(!openSetDropDown);
            }}
            src={DownArrow}
          ></img>
        )}

        {openSetDropDown ? (
          <SetDropDown
            typeIndex={typeIndex}
            cardIndex={cardIndex}
            sets={filterSets}
            setImage={setImage}
            setOpenSetDropDown={setOpenSetDropDown}
            changeCardSet={changeCardSet}
          />
        ) : null}
      </div>
      <img
        ref={setImage}
        draggable="false"
        className="smallCardImage hidden"
        style={{ left: `${imageCoords.left}px`, top: `${imageCoords.top}px` }}
        src={placeholder}
        alt="Doopsie"
      ></img>
      <button
        className="settingButton"
        onClick={() =>
          changeDeckArt((prevState) => ({
            ...prevState,
            deckImage: card.cardArt,
          }))
        }
      >
        Make Deck Image
      </button>
    </div>
  );
};

export default Settings;
