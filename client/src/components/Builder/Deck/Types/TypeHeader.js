import React, { Fragment } from "react";

const TypeHeader = ({
  type,
  toggleType,
  typeIndex,
  quantity,
  typeHeaderRef,
  isDragging,
}) => {
  return (
    <Fragment>
      <div className="typeHeader" ref={typeHeaderRef}>
        <div className="typeTitle">
          {type.name} ({quantity}){type.open ? null : "..."}
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
