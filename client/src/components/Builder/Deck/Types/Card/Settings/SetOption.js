import React from "react";

const SetOption = ({
  typeIndex,
  cardIndex,
  set,
  index,
  setImage,
  cardImage,
  changeCardSet,
  setOpenSetDropDown,
}) => {
  return (
    <div>
      <div
        className="setOption"
        key={set.setName.concat(index)}
        onMouseOver={() => {
          setImage.current.src = set.cardImage;
        }}
        onMouseLeave={() => (setImage.current.src = cardImage)}
        onClick={() => {
          changeCardSet(set, typeIndex, cardIndex);
          setOpenSetDropDown(false);
        }}
      >
        {set.setName}
      </div>
    </div>
  );
};
export default SetOption;
