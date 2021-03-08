import React, { Fragment } from "react";

const TypeHeader = ({ type, toggleType, typeIndex, quantity }) => {
  return (
    <Fragment>
      <div className="typeHeader">
        <div className="typeTitle">
          {type.name} ({quantity}){type.open ? null : "..."}
        </div>
        <button
          className={type.open ? "arrow-down active" : "arrow-down"}
          onClick={() => toggleType(typeIndex, type.open)}
        />
      </div>
      <hr className="typeDivider" />
    </Fragment>
  );
};

export default TypeHeader;
