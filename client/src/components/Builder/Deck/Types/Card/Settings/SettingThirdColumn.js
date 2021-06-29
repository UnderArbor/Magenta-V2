import React from "react";
import PropertySetting from "./PropertySetting";

const SettingThirdColumn = ({
  setNewPropertyValue,
  adjustSettingProperties,
  settingBooleans,
  propertySpecs,
  modifyProperty,
  changeMainProperty,
  typeIndex,
  cardIndex,
  inputPlaceholder,
  newPropertyValue,
  setInputPlaceholder,
}) => {
  return (
    <div className="settingColumn column3">
      <div className="settingSelector">
        <p className="settingName">Modify Properties</p>
        <div className="propertyRow">
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Types");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Types" && "currentProperty"
            }`}
          >
            Types
          </button>
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Cost");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Cost" && "currentProperty"
            }`}
          >
            Cost
          </button>
          <button
            onClick={() => {
              setNewPropertyValue("");
              adjustSettingProperties("Tags");
            }}
            className={`toggleProperty ${
              settingBooleans.property === "Tags" && "currentProperty"
            }`}
          >
            Tags
          </button>
        </div>
        {propertySpecs.mainProp !== undefined && (
          <PropertySetting
            key={propertySpecs.mainProp}
            property={propertySpecs.mainProp}
            propertyType={propertySpecs.name}
            modifyProperty={modifyProperty}
            typeIndex={typeIndex}
            cardIndex={cardIndex}
            mainType={true}
            currentType={true}
            changeMainProperty={changeMainProperty}
          />
        )}
        {propertySpecs.currentProps.map((property) => {
          if (property !== propertySpecs.mainProp) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={true}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}

        {propertySpecs.otherProps.map((property) => {
          if (
            propertySpecs.currentProps.filter((modProp) => {
              return String(modProp) === String(property);
            }).length === 0
          ) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={false}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}
        {propertySpecs.existingProps.map((property) => {
          if (
            propertySpecs.otherProps.filter((cardProperty) => {
              return String(property) === String(cardProperty);
            }).length === 0 &&
            propertySpecs.currentProps.filter((modProp) => {
              return String(modProp) === String(property);
            }).length === 0
          ) {
            return (
              <PropertySetting
                key={property}
                property={property}
                propertyType={propertySpecs.name}
                modifyProperty={modifyProperty}
                typeIndex={typeIndex}
                cardIndex={cardIndex}
                mainType={false}
                currentType={false}
                changeMainProperty={changeMainProperty}
              />
            );
          }
        })}
        <div className="typeSettingContainer">
          <div className="typeInputDiv">
            <input
              className={`typeSettingInput ${
                inputPlaceholder && "settingInputError"
              }`}
              value={newPropertyValue}
              placeholder={
                !inputPlaceholder
                  ? `Add new ${propertySpecs.name}`
                  : `${propertySpecs.name} already added`
              }
              onKeyPress={(e) => {
                if (e.nativeEvent.key === "Enter") {
                  e.preventDefault();
                  if (
                    newPropertyValue.length > 0 &&
                    propertySpecs.currentProps.filter((property) => {
                      return String(newPropertyValue) === String(property);
                    }).length === 0
                  ) {
                    modifyProperty(
                      propertySpecs.name,
                      newPropertyValue,
                      typeIndex,
                      cardIndex,
                      true
                    );
                    e.target.blur();
                  } else {
                    setInputPlaceholder(true);
                  }
                  setNewPropertyValue("");
                }
              }}
              onChange={(e) => {
                setInputPlaceholder(false);
                if (
                  propertySpecs.name === "Cost" &&
                  (!Number.isInteger(Number(e.target.value)) ||
                    e.target.value.length === 4)
                ) {
                  e.preventDefault();
                } else {
                  setNewPropertyValue(e.target.value);
                }
              }}
            />
            <div
              className="typeInputButton"
              onClick={(e) => {
                if (
                  newPropertyValue.length > 0 &&
                  propertySpecs.currentProps.filter((property) => {
                    return String(newPropertyValue) === String(property);
                  }).length === 0
                ) {
                  modifyProperty(
                    propertySpecs.name,
                    newPropertyValue,
                    typeIndex,
                    cardIndex,
                    true
                  );
                }
                setNewPropertyValue("");
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingThirdColumn;
