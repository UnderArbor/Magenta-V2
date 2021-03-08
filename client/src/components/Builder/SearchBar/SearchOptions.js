import React from "react";

const SearchOptions = ({ results, setResults, searchCard }) => {
  return (
    <div className="searchOptions">
      {results.cards.map((card, index) => (
        <div
          key={card}
          className={`searchResultItem ${
            index === results.resultIndex && "currentResultItem"
          }`}
          onMouseEnter={() => setResults({ ...results, resultIndex: index })}
          onClick={() => searchCard(card)}
        >
          {card}
        </div>
      ))}
    </div>
  );
};

export default SearchOptions;
