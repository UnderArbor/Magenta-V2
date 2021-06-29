import React, { useState, useEffect, useRef } from "react";

import Modal from "react-modal";

import SearchBar from "./SearchBar";
import BoardSelector from "./BoardSelector";

import addIcon from "../../../utils/icons/plus.svg";

import getCardInfo from "../../../utils/functions/getCardInfo";
import jsonNames from "../../../utils/json/names.json";
import AdvancedSearchContainer from "./AdvancedSearchContainer";

const SearchBarContainer = ({
  deckInfo,
  addCard,
  boards,
  setBoardState,
  currentBoard,
  setCardCount,
}) => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState({
    userQuery: "",
    loading: false,
  });
  const [searchFocused, setSearchFocused] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [results, setResults] = useState({ cards: [], resultIndex: 0 });

  const [boardCount, setBoardCount] = useState([0, 0, 0]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!searchRef.current.contains(event.target)) {
        setQuery({ ...query, userQuery: "", loading: false });
        setResults({ ...results, cards: [], resultIndex: 0 });
        setSearchFocused(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    var mainBoardSize = 0;
    var sideBoardSize = 0;
    var maybePileSize = 0;

    for (var i = 0; i < boards[0].cards.length; ++i) {
      mainBoardSize += boards[0].cards[i].quantity;
    }

    for (var i = 0; i < boards[1].cards.length; ++i) {
      sideBoardSize += boards[1].cards[i].quantity;
    }

    for (var i = 0; i < boards[2].cards.length; ++i) {
      maybePileSize += boards[2].cards[i].quantity;
    }

    setBoardCount([mainBoardSize, sideBoardSize, maybePileSize]);
    setCardCount(mainBoardSize + sideBoardSize);
  }, [boards]);

  //Query Change
  const queryChange = (e) => {
    setQuery({ ...query, userQuery: e.target.value });
    var recommendArray = [];

    if (e.target.value !== "") {
      setSearchFocused(true);
      const cardQuery = e.target.value.toUpperCase();
      for (var index = 0; index < jsonNames.length; ++index) {
        if (jsonNames[index].toUpperCase().startsWith(cardQuery)) {
          var tempName = jsonNames[index];
          recommendArray.push(tempName);
        }
      }
      if (recommendArray.length > 0) {
        setResults({ ...results, cards: recommendArray, resultIndex: 0 });
      } else {
        setQuery({ ...query, userQuery: e.target.value });
        setResults({ ...results, cards: [], resultIndex: 0 });
      }
    } else {
      setQuery({ ...query, userQuery: "", loading: false });
      setResults({ ...results, cards: [], resultIndex: 0 });
      setSearchFocused(false);
    }
  };

  //Search Card

  const searchCard = async (cardName) => {
    if (results.cards.length > 0) {
      setQuery({ ...query, loading: true });
      const card = await getCardInfo(cardName);
      addCard(card);
    }
    setQuery({ ...query, userQuery: "", loading: false });
    setResults({ ...results, cards: [], resultIndex: 0 });
    setSearchFocused(false);
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  return (
    <div className="searchbarContainer">
      <div className="searchGroup">
        <SearchBar
          query={query}
          searchCard={searchCard}
          queryChange={queryChange}
          results={results}
          setResults={setResults}
          searchRef={searchRef}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
        />
        <div className="listAddContainer">
          <button className="listAdd">List Add</button>
          <img className="listAddIcon" src={addIcon} />
        </div>
        {/* <button onClick={() => openModal()} className="advancedLink"> */}
        <button className="advancedLink">Advanced</button>
      </div>
      <vr className="searchVR" />
      <div className="boardGroup">
        <BoardSelector
          boards={boards}
          setBoardState={setBoardState}
          currentBoard={currentBoard}
          boardCount={boardCount}
        />
      </div>
      <Modal
        closeTimeoutMS={300}
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="exampleModal"
        appElement={document.getElementById("root")}
        className="modal"
      >
        <AdvancedSearchContainer
          deckInfo={deckInfo}
          addCard={addCard}
          currentBoard={currentBoard}
        />
      </Modal>
    </div>
  );
};

export default SearchBarContainer;
