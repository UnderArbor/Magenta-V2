import React, { useRef, useEffect, useState } from "react";

import Settings from "./Settings";

import getSets from "../../../../../utils/functions/getSets";
import { cloakSettings } from "../../../../../actions/deck";

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
}) => {
  const settingWindow = useRef(null);
  const setImage = useRef(null);

  const [userQuery, setUserQuery] = useState("");
  const [sets, setSets] = useState({ setList: [], loading: false });
  const [filterSets, setFilterSets] = useState([]);
  const [openSetDropDown, setOpenSetDropDown] = useState(false);
  const [boardQuantity, setBoardQuantity] = useState(card.quantity);

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
    />
  );
};

export default SettingsContainer;
