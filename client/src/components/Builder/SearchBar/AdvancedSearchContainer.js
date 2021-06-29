import React, { useState, useEffect } from "react";
import AdvancedSearchResults from "./AdvancedSearchResults";
import Checkbox from "@material-ui/core/Checkbox";
import StickyBox from "react-sticky-box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import { toggleDisplaySetting } from "../../../actions/deck";

const SCRYFALL_API = "https://api.scryfall.com/cards/search?";

const SizeSlider = createMuiTheme({
  overrides: {
    MuiSlider: {
      root: {
        color: "#dbd599",
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff340",
        marginTop: -6,
        marginLeft: -12,
        boxShadow: "0 0 0 0 #000",
        "&:hover": {
          boxShadow: "0 0 2px 7px rgba(219, 213, 153, 0.2)",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: "0 0 0 0 #000",
          },
        },
        "&:active": {
          boxShadow: "0 0 3px 10px rgba(219, 213, 153, 0.35)",
        },
      },
      track: {
        height: 4,
        borderRadius: 2,
        marginTop: 4,
      },
      rail: {
        height: 4,
        borderRadius: 2,
        marginTop: 4,
      },
    },
  },
});

const AdvancedSearchContainer = ({
  deckInfo,
  addCard,
  displaySettings,
  isAuthenticated,
  deckId,
  toggleDisplaySetting,
  currentBoard,
}) => {
  const [querySettings, setQuerySettings] = useState("order=name&q=");
  const [queryFilter, setQueryFilter] = useState("");
  const [nextPageURL, setNextPage] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(currentBoard);
  const [colorCheck, setColorCheck] = useState({
    r: false,
    b: false,
    g: false,
    w: false,
    b: false,
    c: false,
    or: false,
  });

  const [searchOptions, setSearchOptions] = useState({
    searchName: "",
    searchText: "",
    searchCost: "",
    searchExpansion: "",
    searchFormat: deckInfo.deckFormat,
    searchColors: "",
    searchTypes: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let newFilter = "";
    for (const [key, value] of Object.entries(searchOptions)) {
      if (newFilter !== "" && value.length > 0) {
        newFilter += "+";
      }
      if (value.length > 0) {
        switch (key) {
          case "searchName":
            newFilter += `${value}`;
            break;
          case "searchText":
            newFilter += `o:\"${value}\"`;
            break;
          case "searchCost":
            newFilter += `cmc:${value}`;
            break;
          case "searchExpansion":
            newFilter += `e:\"${value}\"`;
            break;
          case "searchFormat":
            newFilter += `f:\"${value}\"`;
            break;
          case "searchColors":
            newFilter += `c:${value}`;
            break;
          case "searchTypes":
            newFilter += `t:\"${value}\"`;
            break;
          default:
        }
      }
    }
    setQueryFilter(newFilter);
  }, [searchOptions]);

  useEffect(() => {
    let colorValue = "";
    let nullValue = "";
    for (const [color, boolean] of Object.entries(colorCheck)) {
      if (boolean && color !== "or") {
        if (colorCheck.or && colorValue !== "") {
          colorValue += ` or c:${color}`;
        } else {
          colorValue += color;
        }
      } else {
        if (color !== "or") nullValue += ` -c:${color}`;
      }
    }
    colorValue += nullValue;
    console.log("val: ", colorValue);
    setSearchOptions({ ...searchOptions, searchColors: colorValue });
  }, [colorCheck]);

  const searchCard = async () => {
    console.log("query: ", queryFilter);
    await fetch(`${SCRYFALL_API}${querySettings}${queryFilter}`)
      .then((response) => {
        return response.json();
      })
      .then(async (json) => {
        setSearchResults(json.data);
        setNextPage(json.next_page);
      });
    return;
  };

  const nextPage = async () => {
    await fetch(`${nextPageURL}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setSearchResults(json.data);
        setNextPage(json.next_page);
      });
  };

  const handleSliderChange = (event, newValue) => {
    toggleDisplaySetting(newValue, "asSize");
  };

  useEffect(async () => {
    const cardSize = displaySettings.asSize;
    asContainer.style.setProperty(
      "--result-width",
      (cardSize / 100) * 285.7 + "px"
    );
    asContainer.style.setProperty(
      "--result-height",
      (cardSize / 100) * 400 + "px"
    );
    if (isAuthenticated && deckId !== null) {
      const body = { displaySettings };
      await axios.put(`api/deck/toolChange/${deckId}`, body);
    }
  }, [displaySettings.asSize]);

  return (
    <div className="advancedSearchContainer" id="asContainer">
      <p className="asHeader">Advanced Search</p>
      <div className="asSearchGroup">
        <div className="asSearchItem">
          <p className="asLabel">Name</p>
          <input
            className="asInput"
            value={searchOptions.searchName}
            onChange={(e) =>
              setSearchOptions({ ...searchOptions, searchName: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Rules Text</p>
          <input
            className="asInput"
            className="asInput"
            value={searchOptions.searchText}
            onChange={(e) =>
              setSearchOptions({ ...searchOptions, searchText: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Mana Cost</p>
          <input
            className="asInput"
            value={searchOptions.searchCost}
            onChange={(e) =>
              setSearchOptions({ ...searchOptions, searchCost: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Expansion</p>
          <input
            className="asInput"
            value={searchOptions.searchExpansion}
            onChange={(e) =>
              setSearchOptions({
                ...searchOptions,
                searchExpansion: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Format</p>
          <input
            className="asInput"
            value={searchOptions.searchFormat}
            onChange={(e) =>
              setSearchOptions({
                ...searchOptions,
                searchFormat: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Colors</p>

          <Checkbox
            checked={colorCheck.r}
            onChange={() => setColorCheck({ ...colorCheck, r: !colorCheck.r })}
          />
          <Checkbox
            checked={colorCheck.b}
            onChange={() => setColorCheck({ ...colorCheck, b: !colorCheck.b })}
          />
          <Checkbox
            checked={colorCheck.u}
            onChange={() => setColorCheck({ ...colorCheck, u: !colorCheck.u })}
          />
          <Checkbox
            checked={colorCheck.w}
            onChange={() => setColorCheck({ ...colorCheck, w: !colorCheck.w })}
          />
          <Checkbox
            checked={colorCheck.g}
            onChange={() => setColorCheck({ ...colorCheck, g: !colorCheck.g })}
          />
          <Checkbox
            checked={colorCheck.c}
            onChange={() => setColorCheck({ ...colorCheck, c: !colorCheck.c })}
          />
          <Checkbox
            checked={colorCheck.or}
            onChange={() =>
              setColorCheck({ ...colorCheck, or: !colorCheck.or })
            }
          />
        </div>
        <div className="asSearchItem">
          <p className="asLabel">Types</p>
          <input
            className="asInput"
            value={searchOptions.searchTypes}
            onChange={(e) =>
              setSearchOptions({
                ...searchOptions,
                searchTypes: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchCard();
              }
            }}
          ></input>
        </div>
        <button onClick={() => searchCard()}>Search Cards</button>
      </div>
      <StickyBox style={{ zIndex: "2" }}>
        <div className="asStickySettings">
          <div className="asBoardContainer">
            <p className="asSettingLabel">Board Selection: </p>
            <button
              className={`asBoardButton ${
                selectedBoard === "Mainboard" && "asActiveButton"
              }`}
              onClick={(e) => setSelectedBoard(e.target.innerHTML)}
            >
              Mainboard
            </button>
            <button
              className={`asBoardButton ${
                selectedBoard === "Sideboard" && "asActiveButton"
              }`}
              onClick={(e) => setSelectedBoard(e.target.innerHTML)}
            >
              Sideboard
            </button>
            <button
              className={`asBoardButton ${
                selectedBoard === "Maybepile" && "asActiveButton"
              }`}
              onClick={(e) => setSelectedBoard(e.target.innerHTML)}
            >
              Maybepile
            </button>
          </div>
          <div className="asSliderContainer">
            <p className="asSettingLabel">Card Size:</p>
            <ThemeProvider theme={SizeSlider}>
              <Slider
                value={displaySettings.asSize}
                min={80}
                max={150}
                onChange={handleSliderChange}
                valueLabelDisplay="off"
              />
            </ThemeProvider>
          </div>
        </div>
      </StickyBox>
      <AdvancedSearchResults
        searchResults={searchResults}
        nextPage={nextPage}
        nextPageURL={nextPageURL}
        addCard={addCard}
        selectedBoard={selectedBoard}
      />
    </div>
  );
};

AdvancedSearchContainer.propTypes = {
  displaySettings: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  deckId: PropTypes.string.isRequired,
  toggleDisplaySetting: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  displaySettings: state.deck.displaySettings,
  isAuthenticated: state.auth.isAuthenticated,
  deckId: state.deck.deckId,
});

export default connect(mapStateToProps, { toggleDisplaySetting })(
  AdvancedSearchContainer
);
