import React from "react";

const BoardSelector = ({ boards, setBoardState, currentBoard, cardCount }) => {
  return (
    <div className="boardSelector">
      {boards.map((board, index) => {
        return (
          <button
            key={board.name}
            onClick={() => setBoardState(board.name)}
            style={{ zIndex: `${3 - index}` }}
            className={
              board.name === currentBoard
                ? "boardTab selectedTab"
                : "boardTab unselectedTab"
            }
          >
            {board.name}
          </button>
        );
      })}

      <p className="cardCount">Cards: {cardCount}</p>
    </div>
  );
};

export default BoardSelector;
