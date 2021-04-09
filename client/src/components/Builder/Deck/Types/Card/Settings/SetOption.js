import React from "react";

const SetOption = ({
  typeIndex,
  cardIndex,
  set,
  index,
  setImage,
  changeCardSet,
}) => {
  return (
    <div>
      <div
        className="setOption"
        key={set.setName.concat(index)}
        onMouseOver={() => {
          setImage.current.src = set.cardImage;
          setImage.current.classList.remove("hidden");
        }}
        onMouseLeave={() => setImage.current.classList.add("hidden")}
        onClick={() => changeCardSet(set, typeIndex, cardIndex)}
      >
        {set.setName}
      </div>
    </div>
  );
};
export default SetOption;
