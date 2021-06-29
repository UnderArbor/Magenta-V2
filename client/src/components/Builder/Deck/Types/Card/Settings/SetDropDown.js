import React, { useRef, useEffect } from "react";
import SetOption from "./SetOption";

const SetDropDown = ({
  typeIndex,
  cardIndex,
  sets,
  setImage,
  setOpenSetDropDown,
  changeCardSet,
  cardImage,
}) => {
  const setDropDown = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (setDropDown.current && !setDropDown.current.contains(event.target)) {
        setOpenSetDropDown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropDown, setOpenSetDropDown]);
  return (
    <div ref={setDropDown} className="setDropDown">
      {sets.map((set, index) => (
        <SetOption
          typeIndex={typeIndex}
          cardIndex={cardIndex}
          set={set}
          key={index}
          index={index}
          setImage={setImage}
          changeCardSet={changeCardSet}
          cardImage={cardImage}
          setOpenSetDropDown={setOpenSetDropDown}
        />
      ))}
    </div>
  );
};

export default SetDropDown;
