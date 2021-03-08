import React, { useRef, useEffect, useState } from "react";

import Settings from "./Settings";

import getSets from "../../../../../utils/functions/getSets";

const SettingsContainer = ({
  typeIndex,
  cardIndex,
  setOpenSettings,
  card,
  changeCardSet,
  changeDeckArt,
  flipX,
  flipY,
}) => {
  const settingWindow = useRef(null);
  const setImage = useRef(null);

  const [userQuery, setUserQuery] = useState("");
  const [sets, setSets] = useState({ setList: [], loading: false });
  const [filterSets, setFilterSets] = useState([]);
  const [openSetDropDown, setOpenSetDropDown] = useState(false);
  const [imageCoords, setImageCoords] = useState({
    top: Number(150),
    left: Number(420),
  });

  useEffect(() => {
    async function getData() {
      setSets({ ...sets, loading: true });
      const newSets = await getSets(card.name);
      setSets({ ...sets, setList: newSets, loading: false });
      setFilterSets(newSets);
    }
    getData();
  }, [name]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingWindow.current &&
        !settingWindow.current.contains(event.target)
      ) {
        let cardContainers = document.querySelectorAll(".cardContainer");

        cardContainers.forEach(function (item) {
          item.style.opacity = "1";
          setTimeout(() => {
            item.style.pointerEvents = "auto";
          }, 1);
        });

        setOpenSettings(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

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
      imageCoords={imageCoords}
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
    />
  );
};

export default SettingsContainer;
