import React from "react";
import AdvancedResult from "./AdvancedResult";

import ReactHoverObserver from "react-hover-observer";

const AdvancedSearchResults = ({
  searchResults,
  nextPage,
  nextPageURL,
  addCard,
  selectedBoard,
}) => {
  return (
    <div className="asResultContainer">
      {searchResults.map((result, resultIndex) => {
        if (result.image_uris === undefined) {
          result = result.card_faces[0];
        }
        return (
          <div key={result.name} className="asResult">
            {result.image_uris.large !== undefined && (
              <ReactHoverObserver
                hoverDelayInMs={170}
                {...{
                  onMouseOver: ({ e, setIsHovering, unsetIsHovering }) => {
                    setIsHovering();
                  },
                }}
              >
                {({ isHovering }) => (
                  <AdvancedResult
                    result={result}
                    addCard={addCard}
                    isHovering={isHovering}
                    selectedBoard={selectedBoard}
                  />
                )}
              </ReactHoverObserver>
            )}
          </div>
        );
      })}
      {searchResults.length > 0 && (
        <button
          onClick={() => nextPage()}
          className={`${
            nextPageURL !== undefined ? "advancedNextPage" : "nullNextPage"
          }`}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default AdvancedSearchResults;
