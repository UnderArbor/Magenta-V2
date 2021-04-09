import React from "react";

const TypeSetting = ({
  type,
  modifyType,
  typeIndex,
  cardIndex,
  mainType,
  currentType,
  moveCard,
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
                moveCard(typeIndex, cardIndex, type);
            }}
          />
          {type}
        </div>
        {!mainType && (
          <button
            className="typeSettingButton"
            onClick={() => {
              if (!currentType) {
                modifyType(typeIndex, cardIndex, type, true);
              } else {
                modifyType(typeIndex, cardIndex, type, false);
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

export default TypeSetting;
