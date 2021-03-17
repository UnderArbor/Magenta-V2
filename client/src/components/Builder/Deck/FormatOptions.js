import React, { useEffect, useRef } from "react";

import formatList from "../../../utils/json/formats.json";

const FormatOptions = ({ currentFormat, setDeckInfo, setOpenFormat }) => {
  const formatWindow = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        formatWindow.current &&
        !formatWindow.current.contains(event.target)
      ) {
        setOpenFormat(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="formatOptionContainer" ref={formatWindow}>
      {formatList.map((format) => {
        return (
          <div
            className={
              format !== currentFormat && format !== "Brew"
                ? "formatOption"
                : format !== currentFormat && format === "Brew"
                ? "formatOption customFormatOption"
                : "formatOption selectedFormat"
            }
            key={format}
            onClick={() => {
              setOpenFormat(false);
              setDeckInfo((prevState) => ({
                ...prevState,
                deckFormat: format,
              }));
            }}
          >
            {format}
          </div>
        );
      })}
    </div>
  );
};

export default FormatOptions;
