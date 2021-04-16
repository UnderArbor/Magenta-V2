import React from "react";

const CardSorting = ({ currentCategory, setCategory }) => {
  return (
    <div className="cardSortingContainer">
      <button
        className={`cardSortButton ${
          currentCategory === "Types" && "activeSortButton"
        }`}
        onClick={() => setCategory("Types")}
      >
        Types
      </button>
      <button
        className={`cardSortButton ${
          currentCategory === "Cost" && "activeSortButton"
        }`}
        onClick={() => setCategory("Cost")}
      >
        Mana Cost
      </button>
      <button
        className={`cardSortButton ${
          currentCategory === "Tags" && "activeSortButton"
        }`}
        onClick={() => setCategory("Tags")}
      >
        Tags
      </button>
    </div>
  );
};

export default CardSorting;
