import React from "react";

import star from "../../../../../../utils/icons/star.svg";
import hollowStar from "../../../../../../utils/icons/hollow-star.svg";

const PropertySetting = ({
  property,
  propertyType,
  modifyProperty,
  typeIndex,
  cardIndex,
  mainType,
  currentType,
  changeMainProperty,
}) => {
  const buttonContent = currentType ? "-" : "+";

  return (
    <div className="typeSettingContainer">
      <div
        className={`typeSettingDiv ${
          mainType
            ? "mainTypeButton"
            : currentType
            ? "currentTypeButton"
            : "nullTypeButton"
        }`}
      >
        <div className="selectorGroup">
          <img
            className={`typeSelector ${
              !mainType &&
              !(currentType || property === "Commander") &&
              "nullTypeSelector"
            }`}
            src={
              mainType
                ? star
                : currentType || property === "Commander"
                ? hollowStar
                : null
            }
            onClick={() => {
              if (
                (property === "Commander" && !currentType) ||
                (currentType && !mainType)
              )
                changeMainProperty(
                  propertyType,
                  property,
                  typeIndex,
                  cardIndex
                );
            }}
          />
          <p className="propertyOptionText">
            {propertyType === "Cost" && property === -1
              ? "Commander"
              : property}
          </p>
        </div>
        {((!mainType && property !== "Commander") ||
          (mainType && propertyType === "Tags")) && (
          <button
            className="typeSettingButton"
            onClick={() => {
              if (!currentType) {
                modifyProperty(
                  propertyType,
                  property,
                  typeIndex,
                  cardIndex,
                  true
                );
              } else {
                modifyProperty(
                  propertyType,
                  property,
                  typeIndex,
                  cardIndex,
                  false
                );
              }
            }}
          >
            {buttonContent}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertySetting;
