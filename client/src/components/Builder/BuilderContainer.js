import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import produce from "immer";
import { motion, AnimatePresence } from "framer-motion";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

import DeckBanner from "./Deck/DeckBanner";
import DeckContainer from "./Deck/DeckContainer";
import Modal from "react-modal";
import ImportDisplay from "./ImportDisplay";
import {
  emptyPacket,
  updateDecks,
  savingDeck,
  setDeckId,
  loadTools,
} from "../../actions/deck";

import getCardInfo from "../../utils/functions/getCardInfo";

const cloakVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.6,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

const BuilderContainer = ({
  uploadCards,
  user,
  saveDeck,
  isAuthenticated,
  emptyPacket,
  updateDecks,
  savingDeck,
  setDeckId,
  match,
  settingsCloak,
  loadTools,
}) => {
  let history = useHistory();
  const location = useLocation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentBoard, setBoardState] = useState("Mainboard");
  const [boards, setBoards] = useState([
    { name: "Mainboard", boardTypes: [] },
    { name: "Sideboard", boardTypes: [] },
    { name: "Maybepile", boardTypes: [] },
  ]);
  const [boardTypes, setTypes] = useState([]);
  const [ghostCards, setGhostCards] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [tools, setTools] = useState(false);
  const [deckInfo, setDeckInfo] = useState({
    deckId: "loading...",
    deckName: "loading...",
    deckFormat: "loading...",
    deckImage:
      "https://images.pexels.com/photos/1376766/nature-milky-way-galaxy-space-1376766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  });
  const [cardDrag, setCardDrag] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  const [importDisplay, setImportDisplay] = useState({
    name: "",
    index: -1,
    ratio: -1,
    length: -1,
  });
  const [colors, setColors] = useState({
    white: 0,
    green: 0,
    red: 0,
    black: 0,
    blue: 0,
  });

  const { deckImage } = deckInfo;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    for (var i = 0; i < boards.length; ++i) {
      if (boards[i].name === currentBoard) {
        const types = boards[i].boardTypes;
        setTokens([]);
        setGhostCards([]);
        setTypes(types);
        setTimeout(() => {
          compileTokens(types);
          compileGhosts(types);
        }, 50);
        break;
      }
    }
  }, [currentBoard]);

  useEffect(async () => {
    const deckId = match.params.deckId;
    if (deckId !== "NewDeck")
      try {
        await axios.get(`api/deck/${deckId}`).then((res) => {
          setDeckInfo({
            deckId,
            deckName: res.data.name,
            deckFormat: res.data.format,
            deckImage: res.data.picture,
          });
          loadTools(res.data.toolBooleans, res.data.displaySettings);
          setBoards(res.data.boards);
          const mainboardTypes = res.data.boards[0].boardTypes;
          setTypes(mainboardTypes);
        });
        setDeckId(deckId);
      } catch (error) {
        history.push("/error");
      }
    else {
      const name =
        location.state === undefined ? "New Deck" : location.state.name;
      const format =
        location.state === undefined ? "Brew" : location.state.format;
      setDeckInfo({
        deckId,
        deckName: name,
        deckFormat: format,
        deckImage:
          "https://images.pexels.com/photos/1376766/nature-milky-way-galaxy-space-1376766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      });
      loadTools(
        { manaCurve: true, displaySettings: true },
        {
          displayMana: true,
          displayQuantity: true,
          displayIndicator: false,
          displayName: true,
          cardSize: 100,
        }
      );
    }
  }, []);

  useEffect(() => () => setDeckId(null), []);

  useEffect(() => {
    async function importCards(uploadCards) {
      var sideboard = false;
      await setTypes([]);
      openModal();
      let newCardsArray = [];
      let sideboardArray = [];
      for (let i = 0; i < uploadCards.length; ++i) {
        if (uploadCards[i].startsWith("Sideboard")) {
          sideboard = true;
          continue;
        }
        const newCard = uploadCards[i].split(
          /(^[0-9]+x?)\s([^\(]+)|$(\([\S]*\))\s(?:[\d]*)/
        );
        setImportDisplay({
          name: newCard[2],
          index: i,
          ratio: (i / uploadCards.length) * 100,
          length: uploadCards.length,
        });
        const card = await getCardInfo(newCard[2]);
        if (card !== null) {
          if (
            deckInfo.deckImage ===
            "https://images.pexels.com/photos/1376766/nature-milky-way-galaxy-space-1376766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          ) {
            setDeckInfo((prevState) => ({
              ...prevState,
              deckImage: card.cardArt,
            }));
          }
          const cardQuant = newCard[1].split(/([\d]+)|$(x)/);
          card.quantity = cardQuant[1];
          var indexOfType = -1;
          if (!sideboard) {
            for (var j = 0; j < newCardsArray.length; ++j) {
              if (card.mainType === newCardsArray[j].name) {
                indexOfType = j;
                break;
              }
            }
            if (indexOfType === -1) {
              newCardsArray.push({
                name: card.mainType,
                open: true,
                cards: [card],
              });
            } else {
              newCardsArray[indexOfType].cards.push(card);
            }
          } else {
            for (var j = 0; j < sideboardArray.length; ++j) {
              if (card.mainType === sideboardArray[j].name) {
                indexOfType = j;
                break;
              }
            }
            if (indexOfType === -1) {
              sideboardArray.push({
                name: card.mainType,
                open: true,
                cards: [card],
              });
            } else {
              sideboardArray[indexOfType].cards.push(card);
            }
          }
        }
      }
      closeModal();
      setImportDisplay({ name: "", index: -1, ratio: -1, length: -1 });
      const newBoards = produce(boards, (draft) => {
        draft[1].boardTypes = sideboardArray;
        draft[0].boardTypes = newCardsArray;
      });
      setBoards(newBoards);
      setTypes(newCardsArray);
      emptyPacket();
    }

    if (uploadCards.length > 0) {
      importCards(uploadCards);
    }
  }, [uploadCards]);

  useEffect(async () => {
    compileTokens(boardTypes);
    const newGhosts = compileGhosts(boardTypes);

    var quantity = 0;
    var emptyArray = [];
    boardTypes.forEach((type, index) => {
      if (
        type.cards.length === 0 &&
        typeof newGhosts.find((ghostType) => ghostType.name === type.name) ===
          "undefined"
      ) {
        emptyArray.push(index);
      } else {
        type.cards.forEach((card) => {
          quantity += Number(card.quantity);
        });
      }
    });
    setCardCount(quantity);

    if (emptyArray.length > 0) {
      const newTypes = produce(boardTypes, (draft) => {
        for (var i = 0; i < emptyArray.length; ++i) {
          draft.splice(emptyArray[i], 1);
        }
      });
      setTypes(newTypes);
    } else {
      if (currentBoard === "Mainboard") {
        const newColors = produce(colors, (draft) => {
          draft.white = 0;
          draft.green = 0;
          draft.red = 0;
          draft.black = 0;
          draft.blue = 0;
          boardTypes.forEach((type) => {
            type.cards.forEach((card) => {
              card.colors.forEach((color) => {
                if (color.includes("W")) {
                  draft.white += Number(card.quantity);
                }
                if (color.includes("G")) {
                  draft.green += Number(card.quantity);
                }
                if (color.includes("R")) {
                  draft.red += Number(card.quantity);
                }
                if (color.includes("B")) {
                  draft.black += Number(card.quantity);
                }
                if (color.includes("U")) {
                  draft.blue += Number(card.quantity);
                }
              });
            });
          });
        });
        setColors(newColors);
      }

      var index = -1;
      index = boards.findIndex((board) => {
        return board.name == currentBoard;
      });

      const newBoards = produce(boards, (draft) => {
        draft[index].boardTypes = boardTypes;
      });

      setBoards(newBoards);
      if (isAuthenticated && deckInfo.deckId !== "loading...") {
        const body = {
          boardTypes,
          index,
        };
        await axios.put(`api/deck/boardChange/${deckInfo.deckId}`, body);
      }
    }
  }, [boardTypes]);

  useEffect(async () => {
    if (isAuthenticated && deckInfo.deckId !== "loading...") {
      const body = deckInfo;
      await axios.put(`api/deck/infoChange/${deckInfo.deckId}`, body);
    }
    updateDecks();
  }, [deckInfo]);

  useEffect(async () => {
    if (isAuthenticated && saveDeck && deckInfo.deckId !== "loading...") {
      const body = JSON.stringify({
        boards,
        deckInfo,
        user,
      });
      try {
        await axios.post("api/deck", body).then((res) => {
          setDeckId(res.data._id);
          history.push(`/builder/${res.data._id}`);
        });
      } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((error) => console.log(error));
        }
      }
      savingDeck(false);
    }
    updateDecks();
  }, [saveDeck]);

  async function moveCard(
    dragTypeIndex,
    dragCardIndex,
    hoverTypeIndex,
    hoverCardIndex
  ) {
    if (typeof hoverTypeIndex === "string") {
      hoverTypeIndex = boardTypes.findIndex((type) => {
        return type.name === hoverTypeIndex;
      });
      hoverCardIndex = boardTypes[hoverTypeIndex].cards.length;
    }

    const newTypes = produce(boardTypes, (draft) => {
      const removedCard = draft[dragTypeIndex].cards.splice(dragCardIndex, 1);
      draft[hoverTypeIndex].cards.splice(hoverCardIndex, 0, removedCard[0]);
      draft[hoverTypeIndex].open = true;
      draft[hoverTypeIndex].cards[hoverCardIndex].mainType =
        draft[hoverTypeIndex].name;
      if (draft[dragTypeIndex].cards.length <= 0) {
        draft.splice(dragTypeIndex, 1);
      }
    });
    setTypes(newTypes);
  }

  async function moveType(dragTypeIndex, hoverTypeIndex) {
    const newTypes = produce(boardTypes, (draft) => {
      const movedType = draft.splice(dragTypeIndex, 1);
      draft.splice(hoverTypeIndex, 0, movedType[0]);
    });
    setTypes(newTypes);
  }

  async function moveBoards(
    typeIndex,
    cardIndex,
    card,
    moveQuantity,
    newBoard
  ) {
    var oldBoardIndex = boards.findIndex((board) => {
      return board.name == currentBoard;
    });
    var newBoardIndex = boards.findIndex((board) => {
      return board.name == newBoard;
    });

    var newCardIndex = -1;
    var newTypeIndex = -1;
    newTypeIndex = boards[newBoardIndex].boardTypes.findIndex((type) => {
      return card.mainType === type.name;
    });

    if (newTypeIndex !== -1) {
      newCardIndex = boards[newBoardIndex].boardTypes[
        newTypeIndex
      ].cards.findIndex((searchCard) => {
        return searchCard.name === card.name;
      });
    }

    const newBoards = produce(boards, (draft) => {
      //Remove appropriate quantity of card from old board
      if (card.quantity > moveQuantity) {
        draft[oldBoardIndex].boardTypes[typeIndex].cards[
          cardIndex
        ].quantity -= moveQuantity;
      } else {
        draft[oldBoardIndex].boardTypes[typeIndex].cards.splice(cardIndex, 1);
        if (draft[oldBoardIndex].boardTypes[typeIndex].cards.length === 0) {
          draft[oldBoardIndex].boardTypes.splice(typeIndex, 1);
        }
      }

      //Check if card or type exists in new board, then move accordingly
      if (newTypeIndex !== -1 && newCardIndex !== -1) {
        draft[newBoardIndex].boardTypes[newTypeIndex].cards[
          newCardIndex
        ].quantity += moveQuantity;
      } else if (newTypeIndex !== -1) {
        draft[newBoardIndex].boardTypes[newTypeIndex].cards.push({
          ...card,
          quantity: moveQuantity,
        });
      } else {
        draft[newBoardIndex].boardTypes.push({
          name: card.mainType,
          open: true,
          cards: [{ ...card, quantity: moveQuantity }],
        });
      }
    });
    await setBoards(newBoards);
    if (isAuthenticated && deckInfo.deckId !== "loading...") {
      const boardTypes = newBoards[newBoardIndex].boardTypes;
      const index = newBoardIndex;
      const body = {
        boardTypes,
        index,
      };
      await axios.put(`api/deck/boardChange/${deckInfo.deckId}`, body);
    }
    await setTypes(newBoards[oldBoardIndex].boardTypes);
  }

  async function changeQuantity(cardName, mainType, quantChange) {
    let success = false;
    for (var i = 0; i < boardTypes.length; ++i) {
      if (boardTypes[i].name === mainType) {
        for (var j = 0; j < boardTypes[i].cards.length; ++j) {
          if (boardTypes[i].cards[j].name === cardName) {
            await setTypes((prevTypes) => {
              return prevTypes.map((type, index) => {
                if (i !== index || type.name !== mainType) {
                  return type;
                } else if (
                  i === index &&
                  Number(type.cards[j].quantity) + Number(quantChange) !== 0
                ) {
                  return {
                    ...type,
                    cards: [
                      ...type.cards.slice(0, j),
                      {
                        ...type.cards[j],
                        quantity:
                          Number(type.cards[j].quantity) + Number(quantChange),
                      },
                      ...type.cards.slice(j + 1),
                    ],
                  };
                } else {
                  return {
                    ...type,
                    cards: [
                      ...type.cards.slice(0, j),
                      ...type.cards.slice(j + 1),
                    ],
                  };
                }
              });
            });
            success = true;
            break;
          }
        }
      }
    }
    return success;
  }

  async function changeCardSet(set, typeIndex, cardIndex) {
    await setTypes((prevTypes) => {
      return prevTypes.map((type, index) => {
        if (index !== typeIndex) {
          return type;
        } else {
          return {
            ...type,
            cards: [
              ...type.cards.slice(0, cardIndex),
              {
                ...type.cards[cardIndex],
                setName: set.setName,
                cardArt: set.cardArt,
                cardImage: set.cardImage,
              },
              ...type.cards.slice(cardIndex + 1),
            ],
          };
        }
      });
    });
  }

  function compileTokens(types) {
    let tokenArray = [];

    types.forEach((type) => {
      type.cards.forEach((card) => {
        if (card.tokens.length > 0) {
          card.tokens.forEach((token) => {
            const result = tokenArray.filter((item) => {
              return item.name !== token.name;
            });
            if (result.length === tokenArray.length) {
              tokenArray.push(token);
            }
          });
        }
      });
    });
    setTimeout(() => setTokens(tokenArray), 500);
  }

  function compileGhosts(types) {
    let ghostArray = [];
    setGhostCards(ghostArray);
    types.forEach((type) => {
      type.cards.forEach((card) => {
        const acceptedTypes = card.modifiedTypes.filter((type) => {
          return type !== "Basic";
        });
        if (acceptedTypes.length > 1) {
          acceptedTypes.forEach((type) => {
            const index = ghostArray.findIndex((item) => {
              return type === item.name;
            });
            if (card.mainType !== type) {
              if (index === -1) {
                ghostArray.push({ name: type, cards: [card] });
              } else {
                ghostArray[index].cards.push(card);
              }
            }
          });
        }
        if (card.secondCard.name !== "") {
          const secondCard = card.secondCard;
          console.log("second: ", secondCard);
          secondCard.types.forEach((type) => {
            const index = ghostArray.findIndex((item) => {
              return type === item.name;
            });
            if (index === -1) {
              ghostArray.push({ name: type, cards: [secondCard] });
            } else {
              ghostArray[index].cards.push(secondCard);
            }
          });
        }
      });
    });
    const newTypes = produce(boardTypes, (draft) => {
      ghostArray.forEach((ghostType) => {
        const exists = boardTypes.filter((type) => {
          return ghostType.name === type.name;
        });
        if (exists.length === 0) {
          draft.push({ name: ghostType.name, open: true, cards: [] });
        }
      });
    });
    setTypes(newTypes);
    setGhostCards(ghostArray);
    return ghostArray;
  }

  async function toggleType(typeIndex, open) {
    const newTypes = produce(boardTypes, (draft) => {
      draft[typeIndex].open = !open;
    });
    setTypes(newTypes);
  }

  const HTML5toTouch = {
    backends: [
      {
        id: "html5",
        backend: HTML5Backend,
        transition: MouseTransition,
      },
      {
        id: "touch",
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  const customStyles = {
    content: {},
    overlay: { zIndex: 1000 },
  };

  return (
    <Fragment>
      <DndProvider options={HTML5toTouch}>
        <div className="builderContainer">
          <AnimatePresence>
            {settingsCloak && (
              <motion.div
                className="settingsCloak"
                variants={cloakVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
          </AnimatePresence>
          <DeckBanner
            deckInfo={deckInfo}
            setDeckInfo={setDeckInfo}
            cardCount={cardCount}
            setDeckId={setDeckId}
            boards={boards}
            setBoardState={setBoardState}
            currentBoard={currentBoard}
            colors={colors}
          />
          <DeckContainer
            types={boardTypes}
            setTypes={setTypes}
            tokens={tokens}
            setTokens={setTokens}
            tools={tools}
            setTools={setTools}
            changeQuantity={changeQuantity}
            changeCardSet={changeCardSet}
            deckImage={deckImage}
            changeDeckArt={setDeckInfo}
            moveCard={moveCard}
            cardDrag={cardDrag}
            setCardDrag={setCardDrag}
            toggleType={toggleType}
            boards={boards}
            currentBoard={currentBoard}
            moveBoards={moveBoards}
            moveType={moveType}
            ghostCards={ghostCards}
          />
        </div>
      </DndProvider>
      <Modal
        closeTimeoutMS={300}
        className="modal"
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="exampleModal"
        appElement={document.getElementById("root")}
      >
        <ImportDisplay importInfo={importDisplay} />
      </Modal>
    </Fragment>
  );
};

BuilderContainer.propTypes = {
  uploadCards: PropTypes.array,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  saveDeck: PropTypes.bool.isRequired,
  settingsCloak: PropTypes.bool.isRequired,
  emptyPacket: PropTypes.func.isRequired,
  updateDecks: PropTypes.func.isRequired,
  savingDeck: PropTypes.func.isRequired,
  setDeckId: PropTypes.func.isRequired,
  loadTools: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  uploadCards: state.deck.uploadCards,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  saveDeck: state.auth.saveDeck,
  settingsCloak: state.deck.settingsCloak,
});

export default connect(mapStateToProps, {
  emptyPacket,
  updateDecks,
  savingDeck,
  setDeckId,
  loadTools,
})(BuilderContainer);
