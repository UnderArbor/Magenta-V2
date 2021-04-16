import React, { useRef, useEffect, useState } from "react";

import Settings from "./Settings";

import getSets from "../../../../../../utils/functions/getSets";
import cardTypes from "../../../../../../utils/json/cardTypes.json";

const SettingsContainer = ({
  typeIndex,
  cardIndex,
  setOpenSettings,
  card,
  changeCardSet,
  changeDeckArt,
  flipX,
  flipY,
  boards,
  currentBoard,
  moveBoards,
  cloakSettings,
  modifyProperty,
  changeMainProperty,
  adjustSettingProperties,
  settingBooleans,
}) => {
  const settingWindow = useRef(null);
  const setImage = useRef(null);

  const [userQuery, setUserQuery] = useState("");
  const [sets, setSets] = useState({ setList: [], loading: false });
  const [filterSets, setFilterSets] = useState([]);
  const [openSetDropDown, setOpenSetDropDown] = useState(false);
  const [boardQuantity, setBoardQuantity] = useState(card.quantity);
  const [newPropertyValue, setNewPropertyValue] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState(false);
  const [propertySpecs, setPropertySpecs] = useState(
    settingBooleans.property === "Types"
      ? {
          name: "Types",
          mainProp: card.mainType,
          currentProps: card.modifiedTypes,
          otherProps: card.types,
          existingProps: cardTypes.filter((cardType) => {
            return (
              cardType !== "Hero" &&
              cardType !== "Vanguard" &&
              cardType !== "Conspiracy" &&
              cardType !== "Scheme" &&
              cardType !== "Plane" &&
              cardType !== "Phenomenon"
            );
          }),
        }
      : settingBooleans.property === "Cost"
      ? {
          name: "Cost",
          mainProp: card.mainCMC,
          currentProps: card.modifiedCMC,
          otherProps: card.cmc,
          existingProps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        }
      : {
          name: "Tags",
          mainProp: card.mainTag,
          currentProps: card.tags,
          otherProps: [],
          existingProps: [],
        }
  );

  useEffect(() => {
    switch (settingBooleans.property) {
      case "Types":
        return setPropertySpecs({
          name: "Types",
          mainProp: card.mainType,
          currentProps: card.modifiedTypes,
          otherProps: card.types,
          existingProps: cardTypes.filter((cardType) => {
            return (
              cardType !== "Hero" &&
              cardType !== "Vanguard" &&
              cardType !== "Conspiracy" &&
              cardType !== "Scheme" &&
              cardType !== "Plane" &&
              cardType !== "Phenomenon"
            );
          }),
        });
      case "Cost":
        return setPropertySpecs({
          name: "Cost",
          mainProp: card.mainCMC,
          currentProps: card.modifiedCMC,
          otherProps: card.cmc,
          existingProps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      case "Tags":
        return setPropertySpecs({
          name: "Tags",
          mainProp: card.mainTag,
          currentProps: card.tags,
          otherProps: [],
          existingProps: [],
        });
      default:
        return setPropertySpecs({
          name: "Type",
          mainProp: card.mainType,
          currentProps: card.modifiedTypes,
          otherProps: card.types,
          existingProps: cardTypes.filter((cardType) => {
            return (
              cardType !== "Hero" &&
              cardType !== "Vanguard" &&
              cardType !== "Conspiracy" &&
              cardType !== "Scheme" &&
              cardType !== "Plane" &&
              cardType !== "Phenomenon"
            );
          }),
        });
    }
  }, [settingBooleans.property, card]);

  useEffect(() => {
    async function getData() {
      setSets({ ...sets, loading: true });
      const newSets = await getSets(card.name);
      setSets({ ...sets, setList: newSets, loading: false });
      setFilterSets(newSets);
    }

    function handleClickOutside(event) {
      if (
        settingWindow.current &&
        !settingWindow.current.contains(event.target)
      ) {
        cloakSettings(false);
        const currentCard = document.getElementById(card.name);
        currentCard.style.zIndex = null;
        setOpenSettings(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    getData();

    return () => {
      // Unbind the event listener on clean up
      cloakSettings(false);
      const currentCard = document.getElementById(card.name);
      currentCard.style.zIndex = null;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (userQuery !== "" && sets.loading === false) {
      var recommendArray = [];
      for (var i = 0; i < sets.setList.length; ++i) {
        if (
          sets.setList[i].setName
            .toUpperCase()
            .startsWith(userQuery.toUpperCase())
        ) {
          recommendArray.push(sets.setList[i]);
        }
      }
      setFilterSets(recommendArray);
      setOpenSetDropDown(true);
    } else {
      setOpenSetDropDown(false);
    }
  }, [userQuery, sets.loading]);

  return (
    <Settings
      typeIndex={typeIndex}
      cardIndex={cardIndex}
      settingWindow={settingWindow}
      setImage={setImage}
      card={card}
      sets={sets}
      filterSets={filterSets}
      userQuery={userQuery}
      setUserQuery={setUserQuery}
      openSetDropDown={openSetDropDown}
      setOpenSetDropDown={setOpenSetDropDown}
      changeCardSet={changeCardSet}
      changeDeckArt={changeDeckArt}
      flipX={flipX}
      flipY={flipY}
      boardQuantity={boardQuantity}
      setBoardQuantity={setBoardQuantity}
      boards={boards}
      currentBoard={currentBoard}
      moveBoards={moveBoards}
      modifyProperty={modifyProperty}
      changeMainProperty={changeMainProperty}
      adjustSettingProperties={adjustSettingProperties}
      settingBooleans={settingBooleans}
      propertySpecs={propertySpecs}
      newPropertyValue={newPropertyValue}
      setNewPropertyValue={setNewPropertyValue}
      inputPlaceholder={inputPlaceholder}
      setInputPlaceholder={setInputPlaceholder}
    />
  );
};

export default SettingsContainer;
