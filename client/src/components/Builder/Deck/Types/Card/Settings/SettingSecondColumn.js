import React from "react";

import SetDropDown from "./SetDropDown";
import arrow from "../../../../../../utils/icons/arrow.svg";
import LoadingIcon from "../../../../SearchBar/LoadingIcon";
import boardArrow from "../../../../../../utils/icons/board-arrow.svg";

const SettingSecondColumn = ({
  sets,
  setOpenSetDropDown,
  openSetDropDown,
  card,
  userQuery,
  typeIndex,
  cardIndex,
  filterSets,
  setImage,
  changeCardSet,
  boardQuantity,
  boards,
  setUserQuery,
  setBoardQuantity,
  currentBoard,
  moveBoards,
}) => {
  return (
    <div className="settingColumn column2">
      <div className="settingSelector">
        <p className="settingName">Change Set </p>
        <div className="setButtonText">
          <input
            className="setInput"
            type="text"
            placeholder={card.setName}
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onFocus={() => {
              setOpenSetDropDown(true);
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
              src={arrow}
            ></img>
          )}

          {openSetDropDown ? (
            <SetDropDown
              typeIndex={typeIndex}
              cardIndex={cardIndex}
              sets={filterSets}
              setImage={setImage}
              cardImage={card.cardImage}
              setOpenSetDropDown={setOpenSetDropDown}
              changeCardSet={changeCardSet}
            />
          ) : null}
        </div>
      </div>
      <div className="settingSelector">
        <div className="moveBoardHeader">
          <p className="settingName">Transfer to Board</p>
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
            <p className="ofText">of {card.quantity}</p>
          </div>
        </div>
        <div className="boardButtons">
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
                  <img
                    src={board.name !== currentBoard ? boardArrow : null}
                    className="boardIcon"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSecondColumn;
