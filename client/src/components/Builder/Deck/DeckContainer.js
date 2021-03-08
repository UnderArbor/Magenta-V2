import React, { Fragment } from "react";
import TypeContainer from "./Types/TypeContainer";

import Masonry from "react-masonry-css";

import SearchBarContainer from "../SearchBar/SearchBarContainer";
import DeckToolsContainer from "../DeckTools/DeckToolsContainer";
import TokenContainer from "./Types/TokenContainer";

const DeckContainer = ({
  types,
  setTypes,
  tokens,
  setTokens,
  tools,
  setTools,
  changeQuantity,
  changeCardSet,
  changeDeckArt,
  moveCard,
  cardDrag,
  setCardDrag,
  toggleType,
  deckImage,
}) => {
  let offset = 0;

  const breakpointColumnsObj = {
    default: 3,
    1380: 2,
    920: 1,
  };

  return (
    <div className="deckContainer">
      <SearchBarContainer
        types={types}
        setTypes={setTypes}
        tokens={tokens}
        setTokens={setTokens}
        changeQuantity={changeQuantity}
        deckImage={deckImage}
        changeDeckArt={changeDeckArt}
      />
      <DeckToolsContainer tools={tools} setTools={setTools} />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="typeGrid"
        columnClassName="typeGridColumn"
      >
        {types.map((type, typeIndex) => {
          offset += type.cards.length;
          return (
            <TypeContainer
              type={type}
              key={type.name}
              typeIndex={typeIndex}
              changeQuantity={changeQuantity}
              changeCardSet={changeCardSet}
              changeDeckArt={changeDeckArt}
              moveCard={moveCard}
              cardDrag={cardDrag}
              setCardDrag={setCardDrag}
              toggleType={toggleType}
            />
          );
        })}
      </Masonry>

      {Object.keys(tokens).length > 0 && <TokenContainer tokens={tokens} />}
    </div>
  );
};

export default DeckContainer;
