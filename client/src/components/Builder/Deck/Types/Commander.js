import React, { Fragment } from "react";

import SettingsContainer from "./Card/Settings/SettingsContainer";

import ReactHoverObserver from "react-hover-observer";

import settingsIcon from "../../../../utils/images/Settings_Cog.png";

const Commander = ({
  typeIndex,
  cardIndex,
  commanderLength,
  commander,
  openSettings,
  setOpenSettings,
  bigImageSrc,
  setImageSrc,
  adjustSettingProperties,
  boards,
  currentBoard,
  moveBoards,
  changeCardSet,
  changeDeckArt,
  modifyProperty,
  moveCard,
  changeMainProperty,
  propertyList,
  settingBooleans,
}) => {
  return (
    <div
      className={`commander ${
        commanderLength === 1 ? "singleCommander" : "doubleCommander"
      }`}
    >
      <ReactHoverObserver
        className="commanderFragment"
        hoverDelayInMs={170}
        key={commander.name}
        {...{
          onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
            if (
              e.target.classList.contains("bigCardImage") ||
              e.target.className.includes("cardName") ||
              e.target.className === "settings"
            ) {
              unsetIsHovering();
            } else {
              if (!openSettings) {
                if (e.target.classList.contains("secondCover")) {
                  setImageSrc(commander.secondCard.cardImage);
                } else {
                  setImageSrc(commander.cardImage);
                }
                setIsHovering();
              }
            }
          },
        }}
      >
        {({ isHovering }) => (
          <Fragment>
            <div className="commanderCardContainer" id={commander.name}>
              <img className="commanderImg" src={commander.cardImage} />
              <div
                className={`settingsCover ${
                  isHovering && !openSettings && "settingsHover"
                }`}
                onClick={(e) => {
                  if (!openSettings) {
                    setOpenSettings(true);
                  }
                }}
              >
                <img
                  src={settingsIcon}
                  alt="settings"
                  className="commanderSettingsIcon"
                />
              </div>
            </div>
            {openSettings ? (
              <SettingsContainer
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                openSettings={openSettings}
                setOpenSettings={setOpenSettings}
                card={commander}
                changeCardSet={changeCardSet}
                changeDeckArt={changeDeckArt}
                boards={boards}
                currentBoard={currentBoard}
                moveBoards={moveBoards}
                adjustSettingProperties={adjustSettingProperties}
                modifyProperty={modifyProperty}
                moveCard={moveCard}
                changeMainProperty={changeMainProperty}
                settingBooleans={settingBooleans}
                propertyList={propertyList}
              />
            ) : null}
          </Fragment>
        )}
      </ReactHoverObserver>
    </div>
  );
};

export default Commander;
