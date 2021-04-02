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
    </div>
  );
};

export default Settings;
