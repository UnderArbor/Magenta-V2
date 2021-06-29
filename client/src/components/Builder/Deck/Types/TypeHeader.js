import { current } from "immer";
import React, { Fragment } from "react";

const TypeHeader = ({
  name,
  open,
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
          {currentCategory !== "Cost" || name === "Commander"
            ? name
            : `${name}-Cost`}
          :{" "}
          {name !== "Commander"
            ? quantity !== false && quantity + ghostQuantity
            : quantity}
          {open ? null : "..."}
        </div>
        <button
          className={open ? "arrow-down active" : "arrow-down"}
          onClick={() => toggleType(typeIndex, open)}
        />
      </div>
      <hr className={`typeDivider ${isDragging && "dragDivider"}`} />
    </Fragment>
  );
};

export default TypeHeader;
