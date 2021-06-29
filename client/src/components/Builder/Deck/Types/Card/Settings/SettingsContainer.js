import React, { useRef, useEffect, useState } from "react";

import Settings from "./Settings";
import Modal from "react-modal";

import getSets from "../../../../../../utils/functions/getSets";

const SettingsContainer = ({
  typeIndex,
  cardIndex,
  setOpenSettings,
  card,
  changeCardSet,
  changeDeckArt,
  boards,
  currentBoard,
  moveBoards,
  cloakSettings,
  modifyProperty,
  changeMainProperty,
  adjustSettingProperties,
  settingBooleans,
  propertyList,
  openSettings,
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

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  };

  function closeSettings() {
    setOpenSettings(false);
  }

  const [propertySpecs, setPropertySpecs] = useState(
    settingBooleans.property === "Types"
      ? {
          name: "Types",
          mainProp: card.mainType,
          currentProps: card.modifiedTypes,
          otherProps: card.types,
          existingProps: propertyList.types,
        }
      : settingBooleans.property === "Cost"
      ? {
          name: "Cost",
          mainProp: card.mainCMC,
          currentProps: card.modifiedCMC,
          otherProps: card.cmc,
          existingProps: propertyList.cost,
        }
      : {
          name: "Tags",
          mainProp: card.mainTag,
          currentProps: card.tags,
          otherProps: [],
          existingProps: propertyList.tags,
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
          existingProps: propertyList.types,
        });
      case "Cost":
        return setPropertySpecs({
          name: "Cost",
          mainProp: card.mainCMC,
          currentProps: card.modifiedCMC,
          otherProps: card.cmc,
          existingProps: propertyList.cost,
        });
      case "Tags":
        return setPropertySpecs({
          name: "Tags",
          mainProp: card.mainTag,
          currentProps: card.tags,
          otherProps: [],
          existingProps: propertyList.tags,
        });
      default:
        return setPropertySpecs({
          name: "Type",
          mainProp: card.mainType,
          currentProps: card.modifiedTypes,
          otherProps: card.types,
          existingProps: propertyList.types,
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

    getData();
  }, []);

  useEffect(() => {
    if (openSettings) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [openSettings]);

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
    <Modal
      closeTimeoutMS={300}
      isOpen={openSettings}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={closeSettings}
      contentLabel="exampleModal"
      className="modal"
    >
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
        propertyList={propertyList}
      />
    </Modal>
  );
};

export default SettingsContainer;
