import React from "react";
import SettingFirstColumn from "./SettingFirstColumn";
import SettingSecondColumn from "./SettingSecondColumn";
import SettingThirdColumn from "./SettingThirdColumn";

const Settings = ({
  typeIndex,
  cardIndex,
  settingWindow,
  setImage,
  card,
  sets,
  filterSets,
  userQuery,
  setUserQuery,
  openSetDropDown,
  setOpenSetDropDown,
  changeCardSet,
  changeDeckArt,
  boardQuantity,
  setBoardQuantity,
  boards,
  currentBoard,
  moveBoards,
  modifyProperty,
  changeMainProperty,
  adjustSettingProperties,
  settingBooleans,
  propertySpecs,
  newPropertyValue,
  setNewPropertyValue,
  inputPlaceholder,
  setInputPlaceholder,
}) => {
  return (
    <div ref={settingWindow} className="settingsContainer">
      <p className="settingsTitle">{card.name}</p>
      <div className="settingOptions">
        <SettingFirstColumn
          changeDeckArt={changeDeckArt}
          cardImage={card.cardImage}
          setImage={setImage}
          cardArt={card.cardArt}
        />
        <vr className="settingsVR" />
        <SettingSecondColumn
          sets={sets}
          setOpenSetDropDown={setOpenSetDropDown}
          openSetDropDown={openSetDropDown}
          card={card}
          userQuery={userQuery}
          typeIndex={typeIndex}
          cardIndex={cardIndex}
          filterSets={filterSets}
          setImage={setImage}
          changeCardSet={changeCardSet}
          boardQuantity={boardQuantity}
          boards={boards}
          setUserQuery={setUserQuery}
          setBoardQuantity={setBoardQuantity}
          currentBoard={currentBoard}
          boards={boards}
          moveBoards={moveBoards}
        />
        <vr className="settingsVR" />
        <SettingThirdColumn
          setNewPropertyValue={setNewPropertyValue}
          adjustSettingProperties={adjustSettingProperties}
          settingBooleans={settingBooleans}
          propertySpecs={propertySpecs}
          modifyProperty={modifyProperty}
          changeMainProperty={changeMainProperty}
          typeIndex={typeIndex}
          cardIndex={cardIndex}
          inputPlaceholder={inputPlaceholder}
          newPropertyValue={newPropertyValue}
          setInputPlaceholder={setInputPlaceholder}
        />
      </div>
    </div>
  );
};

export default Settings;
