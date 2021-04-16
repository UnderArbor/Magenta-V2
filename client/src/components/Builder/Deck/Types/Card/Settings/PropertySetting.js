import React from "react";

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
          <div
            className={`
          typeSelector
            ${
              mainType
                ? "mainTypeSelector"
                : currentType
                ? "currentTypeSelector"
                : "nullTypeSelector"
            }
          `}
            onClick={() => {
              if (currentType && !mainType)
                changeMainProperty(
                  propertyType,
                  property,
                  typeIndex,
                  cardIndex
                );
            }}
          />
          {property}
        </div>
        {(!mainType || (mainType && propertyType === "Tags")) && (
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
