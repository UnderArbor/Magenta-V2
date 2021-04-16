import React, { Fragment } from "react";

const TypeHeader = ({
  type,
  toggleType,
  typeIndex,
  quantity,
  ghostQuantity,
  typeHeaderRef,
  isDragging,
  currentCategory,
}) => {
  return (
    <Fragment>
      <div className="typeHeader" ref={typeHeaderRef}>
        <div className="typeTitle">
          {currentCategory !== "Cost" ? type.name : `${type.name}-Cost`}:{" "}
          {quantity} {ghostQuantity > 0 ? `(+${ghostQuantity})` : null}
          {type.open ? null : "..."}
        </div>
        <button
          className={type.open ? "arrow-down active" : "arrow-down"}
          onClick={() => toggleType(typeIndex, type.open)}
        />
      </div>
      <hr className={`typeDivider ${isDragging && "dragDivider"}`} />
    </Fragment>
  );
};

export default TypeHeader;
