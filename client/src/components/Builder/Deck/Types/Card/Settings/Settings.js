import React from "react";

import SetDropDown from "./SetDropDown";
import LoadingIcon from "../../../../SearchBar/LoadingIcon";
import PropertySetting from "./PropertySetting";

import placeholder from "../../../../../../utils/images/Placeholder.jpg";
import DownArrow from "../../../../../../utils/icons/settings-down.svg";

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
  flipX,
  flipY,
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
        <p className="settingName">Change Set </p>
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
            className="setArrow"
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
      <div className="settingSelector">
        <p className="settingName">Transfer to Board</p>
        <div className="flexGroup">
          <div className="settingMoveBoards">
            <input
              className="moveBoardInput"
              value={boardQuantity}
              onChange={(e) => {
                if (
                  !isNaN(e.target.value) &&
                  Number(e.target.value) <= card.quantity &&
                  Number(e.target.value) > 0
                ) {
                  setBoardQuantity(e.target.value);
                }
              }}
            />
            <p className="ofText">(of {card.quantity})</p>
          </div>
          <div className="settingBoardButtons">
            {boards.map((board) => {
              return (
                <button
                  key={board.name}
                  className={
                    board.name === currentBoard
                      ? "boardButton invalidBoardButton notAllowed"
                      : "boardButton"
                  }
                  onClick={() => {
                    if (board.name !== currentBoard) {
                      moveBoards(
                        typeIndex,
                        cardIndex,
                        card,
                        boardQuantity,
                        board.name
                      );
                    }
                  }}
                >
                  {board.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="settingSelector">
        <p className="settingName">Modify Properties</p>
        <div className="propertyRow">
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Types");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Types" && "currentProperty"
            }`}
          >
            Types
          </button>
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Cost");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Cost" && "currentProperty"
            }`}
          >
            Cost
          </button>
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Tags");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Tags" && "currentProperty"
            }`}
          >
            Tags
          </button>
        </div>
        {propertySpecs.mainProp !== undefined && (
          <PropertySetting
            key={propertySpecs.mainProp}
            property={propertySpecs.mainProp}
            propertyType={propertySpecs.name}
            modifyProperty={modifyProperty}
            typeIndex={typeIndex}
            cardIndex={cardIndex}
            mainType={true}
            currentType={true}
            changeMainProperty={changeMainProperty}
          />
        )}
        {propertySpecs.currentProps.map((property) => {
          if (property !== propertySpecs.mainProp) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={true}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}

        {propertySpecs.otherProps.map((property) => {
          if (
            propertySpecs.currentProps.filter((modProp) => {
              return String(modProp) === String(property);
            }).length === 0
          ) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={false}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}
        {propertySpecs.existingProps.map((property) => {
          if (
            propertySpecs.otherProps.filter((cardProperty) => {
              return String(property) === String(cardProperty);
            }).length === 0 &&
            propertySpecs.currentProps.filter((modProp) => {
              return String(modProp) === String(property);
            }).length === 0
          ) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={false}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}
        <div className="typeSettingContainer">
          <div className="typeInputDiv">
            <input
              className={`typeSettingInput ${
                inputPlaceholder && "settingInputError"
              }`}
              value={newPropertyValue}
              placeholder={
                !inputPlaceholder
                  ? `Add new ${propertySpecs.name}`
                  : `${propertySpecs.name} already added`
              }
              onKeyPress={(e) => {
                if (e.nativeEvent.key === "Enter") {
                  e.preventDefault();
                  if (
                    newPropertyValue.length > 0 &&
                    propertySpecs.currentProps.filter((property) => {
                      return String(newPropertyValue) === String(property);
                    }).length === 0
                  ) {
                    modifyProperty(
                      propertySpecs.name,
                      newPropertyValue,
                      typeIndex,
                      cardIndex,
                      true
                    );
                    e.target.blur();
                  } else {
                    setInputPlaceholder(true);
                  }
                  setNewPropertyValue("");
                }
              }}
              onChange={(e) => {
                setInputPlaceholder(false);
                if (
                  propertySpecs.name === "Cost" &&
                  (!Number.isInteger(Number(e.target.value)) ||
                    e.target.value.length === 4)
                ) {
                  e.preventDefault();
                } else {
                  setNewPropertyValue(e.target.value);
                }
              }}
            />
            <div
              className="typeInputButton"
              onClick={(e) => {
                if (
                  newPropertyValue.length > 0 &&
                  propertySpecs.currentProps.filter((property) => {
                    return String(newPropertyValue) === String(property);
                  }).length === 0
                ) {
                  modifyProperty(
                    propertySpecs.name,
                    newPropertyValue,
                    typeIndex,
                    cardIndex,
                    true
                  );
                }
                setNewPropertyValue("");
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
