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
  deleteDeck,
} from "../../actions/deck";

import commanders from "../../utils/json/commanders.json";
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
  displaySettings,
  deleteDeck,
}) => {
  let history = useHistory();
  const location = useLocation();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentBoard, setBoardState] = useState("Mainboard");
  const [boards, setBoards] = useState([
    { name: "Mainboard", cards: [] },
    { name: "Sideboard", cards: [] },
    { name: "Maybepile", cards: [] },
  ]);
  const [cardCategories, setCardCategories] = useState([]);

  const [ghostCards, setGhostCards] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [deckInfo, setDeckInfo] = useState({
    deckId: "loading...",
    deckName: "loading...",
    deckFormat: "loading...",
    deckImage: "false",
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
  const [commanderDisplay, setCommanderDisplay] = useState(null);

  const [propertyList, setPropertyList] = useState({
    types: [],
    cost: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    tags: [],
  });

  const { deckName, deckImage } = deckInfo;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //When Deck Format Changes, Either Add Or Subtract A Commander Category
  useEffect(() => {
    if (
      deckInfo.deckFormat === "Commander/EDH" ||
      deckInfo.deckFormat === "Brawl"
    ) {
      //If Commander Cat Doesn't Exist, Add It
      const commanderTypes = cardCategories.filter((cat) => {
        return (
          cat.name === "Commander" ||
          (cat.name === -1 && displaySettings.sortCategory === "Cost")
        );
      });
      if (commanderTypes.length === 0) {
        const newCats = produce(cardCategories, (draft) => {
          draft.splice(0, 0, {
            name: displaySettings.sortCategory !== "Cost" ? "Commander" : -1,
            open: true,
            cards: [],
          });
        });
        setCardCategories(newCats);
      }
    } else {
      //Find Commander Cat And Remove It
      const newCats = cardCategories.filter((cat) => {
        return (
          cat.name !== "Commander" ||
          (cat.name === -1 && displaySettings.sortCategory === "Cost")
        );
      });
      setCardCategories(newCats);
    }
  }, [deckInfo.deckFormat]);

  useEffect(() => {
    sortCards(
      boards[
        boards.findIndex((board) => {
          return board.name === currentBoard;
        })
      ].cards,
      displaySettings.sortCategory
    );
  }, [displaySettings.sortCategory, currentBoard]);

  async function sortCards(cards, category) {
    var newCats = [];
    for (var i = 0; i < cards.length; ++i) {
      const card = cards[i];
      const newIndex = -1;
      switch (category) {
        case "Types":
          newIndex = newCats.findIndex((cat) => {
            return cat.name === card.mainType;
          });
          if (newIndex === -1) {
            newCats.push({ name: card.mainType, open: true, cards: [card] });
          } else {
            newCats[newIndex].cards.push(card);
          }
          break;
        case "Cost":
          newIndex = newCats.findIndex((cat) => {
            return cat.name === card.mainCMC;
          });
          if (newIndex === -1) {
            newCats.push({ name: card.mainCMC, open: true, cards: [card] });
          } else {
            newCats[newIndex].cards.push(card);
          }
          break;
        case "Tags":
          newIndex = newCats.findIndex((cat) => {
            if (card.mainTag === undefined) {
              return cat.name === "untagged";
            } else {
              return cat.name === card.mainTag;
            }
          });
          if (newIndex === -1) {
            newCats.push({
              name: card.mainTag === undefined ? "untagged" : card.mainTag,
              open: true,
              cards: [card],
            });
          } else {
            newCats[newIndex].cards.push(card);
          }
          break;
      }
    }
    if (
      deckInfo.deckFormat === "Commander/EDH" ||
      deckInfo.deckFormat === "Brawl"
    ) {
      const commanderIndex = newCats.findIndex((type) => {
        return (
          type.name === "Commander" || (type.name === -1 && category === "Cost")
        );
      });
      if (commanderIndex === -1) {
        newCats.unshift({
          name: category !== "Cost" ? "Commander" : -1,
          open: true,
          cards: [],
        });
      }
    }
    setCardCategories(newCats);
  }

  useEffect(async () => {
    const deckId = match.params.deckId;
    if (deckId !== "NewDeck")
      try {
        await axios.get(`api/deck/${deckId}`).then((res) => {
          if (uploadCards.length === 0 && boards[0].cards.length === 0) {
            setBoards(res.data.boards);
            sortCards(res.data.boards[0].cards, "Types");
            setDeckInfo({
              deckId,
              deckName: res.data.name,
              deckFormat: res.data.format,
              deckImage: res.data.picture,
            });
          } else {
            setDeckInfo((deckInfo) => ({
              ...deckInfo,
              deckId,
              deckName: res.data.name,
              deckFormat: res.data.format,
            }));
          }
          loadTools(res.data.displaySettings);
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
      const commander =
        location.state === undefined ? "" : location.state.commander;
      let commanderInfo = undefined;
      if (commander !== "") {
        commanderInfo = await getCardInfo(commander);
        await setCardCategories([
          {
            name: "Commander",
            open: true,
            cards: [commanderInfo],
          },
        ]);
      }
      await setDeckInfo({
        deckId,
        deckName: name,
        deckFormat: format,
        deckImage:
          commanderInfo !== undefined ? commanderInfo.cardArt : "false",
      });
      await loadTools(
        { manaCurve: true, displaySettings: true },
        {
          displayMana: true,
          displayQuantity: true,
          displayIndicator: false,
          displayName: true,
          cardSize: 100,
          sortCategory: "Types",
        }
      );
    }
  }, []);

  useEffect(() => () => setDeckId(null), []);

  useEffect(() => {
    async function importCards(uploadCards) {
      var deckImage = false;
      var sideboard = false;
      await setCardCategories([]);
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
          if (!deckImage) {
            setDeckInfo((prevState) => ({
              ...prevState,
              deckImage: card.cardArt,
            }));
            deckImage = card.cardArt;
          }
          const cardQuant = newCard[1].split(/([\d]+)|$(x)/);
          card.quantity = Number(cardQuant[1]);
          if (!sideboard) {
            newCardsArray.push(card);
          } else {
            sideboardArray.push(card);
          }
        }
      }
      closeModal();
      setImportDisplay({ name: "", index: -1, ratio: -1, length: -1 });
      const newBoards = produce(boards, (draft) => {
        draft[1].cards = sideboardArray;
        draft[0].cards = newCardsArray;
      });
      setBoards(newBoards);
      sortCards(newCardsArray, "Types");
      emptyPacket();
    }

    if (uploadCards.length > 0) {
      importCards(uploadCards);
    }
  }, [uploadCards]);

  //CARD_CATEGORIES USE_EFFECT
  useEffect(async () => {
    let propertyArray = {
      types: [
        "Creature",
        "Enchantment",
        "Artifact",
        "Planeswalker",
        "Instant",
        "Sorcery",
        "Land",
      ],
      tags: [],
    };

    compileTokens(cardCategories);
    const newGhosts = compileGhosts(cardCategories);
    var emptyArray = [];
    let cardArray = [];
    let cardListArray = [];

    var commander = false;

    //Go Through CardCategories To Populate Fields
    cardCategories.forEach((cat, index) => {
      //If Type Is Empty, Prepare for Elimination
      if (
        cat.cards.length === 0 &&
        typeof newGhosts.find((ghostType) => {
          return ghostType.name === cat.name;
        }) === "undefined" &&
        (cat.name !== "Commander" || currentBoard !== "Mainboard")
      ) {
        emptyArray.push(index);
      }

      //If Type Is Filled, Add Cards To Export File, Add Card To Total Quant, And Add Card's Tags To Array
      else {
        cat.cards.forEach((card) => {
          cardArray.push(
            `${cardArray.length !== 0 ? "\n" : ""}${card.quantity} ${card.name}`
          );
          card.tags.forEach((tag) => {
            if (
              propertyArray.tags.filter((propertyTag) => {
                return propertyTag === tag;
              }).length === 0
            ) {
              propertyArray.tags.push(tag);
            }
          });
          card.modifiedTypes.forEach((type) => {
            if (
              propertyArray.types.filter((propertyTag) => {
                return propertyTag === type;
              }).length === 0
            ) {
              propertyArray.types.push(type);
            }
          });
          cardListArray.push(card);
        });
      }

      if (cat.name === "Commander") {
        const commanderString =
          cat.cards.length === 1
            ? cat.cards[0].name
            : cat.cards.length === 2
            ? `${cat.cards[0].name} & ${cat.cards[1].name}`
            : null;
        setCommanderDisplay(commanderString);
        commander = true;
      }
    });

    //If EmptyArray Is Filled, Remove From Cats And Repeat Above
    if (emptyArray.length > 0) {
      const newCats = produce(cardCategories, (draft) => {
        for (var i = emptyArray.length; i > 0; --i) {
          draft.splice(emptyArray[i - 1], 1);
        }
      });
      setCardCategories(newCats);
    } else {
      if (!commander) {
        setCommanderDisplay(null);
      }
      setPropertyList({
        ...propertyList,
        types: propertyArray.types,
        tags: propertyArray.tags,
      });

      //If No Empty Cats, Get Color Ratios
      if (currentBoard === "Mainboard") {
        const newColors = produce(colors, (draft) => {
          draft.white = 0;
          draft.green = 0;
          draft.red = 0;
          draft.black = 0;
          draft.blue = 0;
          cardCategories.forEach((cat) => {
            cat.cards.forEach((card) => {
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

      //Update Master Board State
      const index = boards.findIndex((board) => {
        return board.name == currentBoard;
      });
      const newBoards = produce(boards, (draft) => {
        draft[index].cards = cardListArray;
      });
      setBoards(newBoards);

      //If Authed, Save Deck And Write To Export File
      if (isAuthenticated && deckInfo.deckId !== "loading...") {
        const body = {
          cardArray,
        };
        await axios.post("/api/deck/writeFile", body);
      }
    }
  }, [cardCategories, displaySettings.displayGhosts]);

  useEffect(async () => {
    if (isAuthenticated && deckInfo.deckId !== "loading...") {
      const body = { boards };
      await axios.put(`api/deck/boardChange/${deckInfo.deckId}`, body);
    }
  }, [boards]);

  //Saves Updated Deck Information (Picture, Name, Format)
  useEffect(async () => {
    if (isAuthenticated && deckInfo.deckId !== "loading...") {
      const body = deckInfo;
      await axios.put(`api/deck/infoChange/${deckInfo.deckId}`, body);
    }
    updateDecks();
  }, [deckInfo]);

  //Saves Deck
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

  //MOVE CARD FUNCTION
  async function moveCard(
    dragCatIndex,
    dragCardIndex,
    hoverCatIndex, // Or Property Name and leave next blank
    hoverCardIndex
  ) {
    //If Provided Category Name, Find Index Of Category
    if (typeof hoverCatIndex === "string") {
      hoverCatIndex = cardCategories.findIndex((cat) => {
        return cat.name === hoverCatIndex;
      });
      hoverCardIndex = cardCategories[hoverCatIndex].cards.length;
    }

    //
    const newCats = produce(cardCategories, (draft) => {
      if (cardCategories[hoverCatIndex].name === "Commander") {
        if (
          cardCategories[dragCatIndex].cards[dragCardIndex].types.filter(
            (type) => {
              return type === "Creature" || type === "Planeswalker";
            }
          ).length > 0
        ) {
          //Get Data For New Commander
          const newCommander =
            cardCategories[dragCatIndex].cards[dragCardIndex];

          //If there are more than one commanders and the new commander isn't a partner, remove all and insert new commander
          if (
            cardCategories[hoverCatIndex].cards.length > 1 &&
            (commanders.findIndex((commander) => {
              return commander.name === newCommander.name;
            }) === -1 ||
              !commanders[
                commanders.findIndex((commander) => {
                  return commander.name === newCommander.name;
                })
              ].partner)
          ) {
            var removedCommanders = [];
            cardCategories[hoverCatIndex].cards.forEach((card) => {
              return removedCommanders.push(card);
            });

            removedCommanders.forEach((removedCommander) => {
              const newCat = removedCommander.types.filter((type) => {
                return (
                  type !== "Legendary" &&
                  type !== "Enchantment" &&
                  type !== "Artifact" &&
                  type !== "Basic"
                );
              });

              //Turns old Commander's mainProp to first prop in original list
              draft[hoverCatIndex].cards[0].mainType = newCat[0];
              draft[hoverCatIndex].cards[0].mainCMC = removedCommander.cmc[0];
              draft[hoverCatIndex].cards[0].mainTag = removedCommander.tags[0];

              var newCatIndex = -1;

              switch (displaySettings.sortCategory) {
                case "Types":
                  newCatIndex = cardCategories.findIndex((cat) => {
                    return cat.name === newCat[0];
                  });
                  break;
                case "Cost":
                  newCatIndex = cardCategories.findIndex((cat) => {
                    return cat.name === removedCommander.cmc[0];
                  });
                  break;
                case "Tags":
                  newCatIndex = cardCategories.findIndex((cat) => {
                    return (
                      cat.name === removedCommander.tags[0] ||
                      (cat.name === "untagged" &&
                        removedCommander.tags.length === 0)
                    );
                  });
                  break;
                default:
                  newCatIndex = 0;
              }

              //Remove current Commander
              const splicedCommander = draft[hoverCatIndex].cards.splice(0, 1);

              //Add ex-Commander to end of mainType category
              draft[newCatIndex].cards.push(splicedCommander[0]);
            });
          }

          //Remove One Commander If:
          //1. New Commander isn't a partner
          //2. Old Commander isn't a partner
          //3. There are already two commanders
          else if (
            cardCategories[hoverCatIndex].cards.length > 0 &&
            (commanders.findIndex((commander) => {
              return commander.name === newCommander.name;
            }) === -1 ||
              !commanders[
                commanders.findIndex((commander) => {
                  return commander.name === newCommander.name;
                })
              ].partner ||
              commanders.findIndex((commander) => {
                return (
                  commander.name === cardCategories[hoverCatIndex].cards[0].name
                );
              }) === -1 ||
              !commanders[
                commanders.findIndex((commander) => {
                  return (
                    commander.name ===
                    cardCategories[hoverCatIndex].cards[0].name
                  );
                })
              ].partner ||
              cardCategories[hoverCatIndex].cards.length > 1)
          ) {
            const removedCommander = cardCategories[hoverCatIndex].cards[0];

            const newCat = removedCommander.types.filter((type) => {
              return (
                type !== "Legendary" &&
                type !== "Enchantment" &&
                type !== "Artifact" &&
                type !== "Basic"
              );
            });

            //Turns old Commander's mainProp to first prop in original list
            draft[hoverCatIndex].cards[0].mainType = newCat[0];
            draft[hoverCatIndex].cards[0].mainCMC = removedCommander.cmc[0];
            draft[hoverCatIndex].cards[0].mainTag = removedCommander.tags[0];

            //Remove current Commander
            const splicedCommander = draft[hoverCatIndex].cards.splice(0, 1);

            var newCatIndex = -1;

            switch (displaySettings.sortCategory) {
              case "Types":
                newCatIndex = cardCategories.findIndex((cat) => {
                  return cat.name === newCat[0];
                });
                break;
              case "Cost":
                newCatIndex = cardCategories.findIndex((cat) => {
                  return cat.name === removedCommander.cmc[0];
                });
                break;
              case "Tags":
                newCatIndex = cardCategories.findIndex((cat) => {
                  return (
                    cat.name === removedCommander.tags[0] ||
                    (cat.name === "untagged" &&
                      removedCommander.tags.length === 0)
                  );
                });
                break;
              default:
                newCatIndex = 0;
            }

            //Add ex-Commander to end of mainType category
            draft[newCatIndex].cards.push(splicedCommander[0]);
          }

          //Set new Commander's mainType to Commander
          draft[dragCatIndex].cards[dragCardIndex].mainType = "Commander";
          draft[dragCatIndex].cards[dragCardIndex].mainCMC = -1;
          draft[dragCatIndex].cards[dragCardIndex].mainTag = "Commander";

          const removedCard = draft[dragCatIndex].cards.splice(
            dragCardIndex,
            1
          );
          draft[hoverCatIndex].cards.splice(hoverCardIndex, 0, removedCard[0]);
          draft[hoverCatIndex].open = true;
          if (draft[dragCatIndex].cards.length <= 0) {
            draft.splice(dragCatIndex, 1);
          }
        }
      } else {
        console.log("Hi");
        const categoryName = cardCategories[hoverCatIndex].name;
        var typeIndex = -1;
        switch (displaySettings.sortCategory) {
          case "Types":
            draft[dragCatIndex].cards[dragCardIndex].mainType = categoryName;
            typeIndex = cardCategories[dragCatIndex].cards[
              dragCardIndex
            ].modifiedTypes.findIndex((type) => {
              return type === categoryName;
            });
            if (typeIndex === -1) {
              draft[dragCatIndex].cards[dragCardIndex].modifiedTypes.push(
                categoryName
              );
            }
            break;
          case "Cost":
            draft[dragCatIndex].cards[dragCardIndex].mainCMC = categoryName;
            typeIndex = cardCategories[dragCatIndex].cards[
              dragCardIndex
            ].modifiedCMC.findIndex((cmc) => {
              return cmc === categoryName;
            });
            if (typeIndex === -1) {
              draft[dragCatIndex].cards[dragCardIndex].modifiedCMC.push(
                categoryName
              );
            }
            break;
          case "Tags":
            if (draft[hoverCatIndex].name !== "untagged") {
              draft[dragCatIndex].cards[dragCardIndex].mainTag = categoryName;
              typeIndex = cardCategories[dragCatIndex].cards[
                dragCardIndex
              ].tags.findIndex((tag) => {
                return tag === categoryName;
              });
              if (typeIndex === -1) {
                draft[dragCatIndex].cards[dragCardIndex].tags.push(
                  categoryName
                );
              }
            } else {
              draft[dragCatIndex].cards[dragCardIndex].mainTag = undefined;
            }
            break;
          default:
            draft[dragCatIndex].cards[dragCardIndex].mainType =
              draft[hoverCatIndex].name;
            break;
        }
        const removedCard = draft[dragCatIndex].cards.splice(dragCardIndex, 1);
        draft[hoverCatIndex].cards.splice(hoverCardIndex, 0, removedCard[0]);
        draft[hoverCatIndex].open = true;
        if (draft[dragCatIndex].cards.length <= 0) {
          draft.splice(dragCatIndex, 1);
        }
      }
    });
    setCardCategories(newCats);
  }

  //MOVE TYPE FUNCTION
  async function moveType(dragTypeIndex, hoverTypeIndex) {
    const newCats = produce(cardCategories, (draft) => {
      const movedCat = draft.splice(dragTypeIndex, 1);
      draft.splice(hoverTypeIndex, 0, movedCat[0]);
    });
    setCardCategories(newCats);
  }

  //MOVE BOARD FUNCTION
  async function moveBoards(catIndex, cardIndex, card, moveQuantity, newBoard) {
    var oldBoardIndex = boards.findIndex((board) => {
      return board.name == currentBoard;
    });
    var newBoardIndex = boards.findIndex((board) => {
      return board.name == newBoard;
    });

    const newBoards = produce(boards, (draft) => {
      const newCardIndex = boards[newBoardIndex].cards.findIndex(
        (boardCard) => {
          return boardCard.name === card.name;
        }
      );
      if (newCardIndex === -1)
        draft[newBoardIndex].cards.push({
          ...card,
          quantity: Number(moveQuantity),
        });
      else {
        const newQuant =
          Number(boards[newBoardIndex].cards[newCardIndex].quantity) +
          Number(moveQuantity);
        draft[newBoardIndex].cards[newCardIndex].quantity = newQuant;
      }

      // const oldCardIndex = boards[oldBoardIndex].cards.findIndex(
      //   (boardCard) => {
      //     return boardCard.name === card.name;
      //   }
      // );
      // if (boards[oldBoardIndex].cards[oldCardIndex].quantity > moveQuantity) {
      //   const oldQuant =
      //     Number(boards[oldBoardIndex].cards[oldCardIndex].quantity) -
      //     Number(moveQuantity);
      //   draft[oldBoardIndex].cards[oldCardIndex].quantity = oldQuant;
      // } else draft[oldBoardIndex].cards.splice(oldCardIndex, 1);
    });
    setBoards(newBoards);

    const newCats = produce(cardCategories, (draft) => {
      if (
        Number(cardCategories[catIndex].cards[cardIndex].quantity) >
        Number(moveQuantity)
      )
        draft[catIndex].cards[cardIndex].quantity -= Number(moveQuantity);
      else draft[catIndex].cards.splice(cardIndex, 1);
    });

    setCardCategories(newCats);
  }

  async function changeQuantity(catIndex, cardIndex, quantChange) {
    const newQuant =
      Number(cardCategories[catIndex].cards[cardIndex].quantity) +
      Number(quantChange);
    const newCats = produce(cardCategories, (draft) => {
      if (newQuant === 0) {
        draft[catIndex].cards.splice(cardIndex, 1);
      } else {
        draft[catIndex].cards[cardIndex].quantity = newQuant;
      }
    });
    setCardCategories(newCats);
  }

  async function addCard(card, board) {
    if (board === undefined) {
      board = currentBoard;
    }

    //Set Deck Image To New Card If No Image Set
    if (deckImage === "false") {
      setDeckInfo((prevState) => ({
        ...prevState,
        deckImage: card.cardArt,
      }));
    }

    //Get Main Prop According To Category
    const mainProp =
      displaySettings.sortCategory === "Types"
        ? card.mainType
        : displaySettings.sortCategory === "Cost"
        ? card.mainCMC
        : displaySettings.sortCategory === "Tags" && card.mainTag !== undefined
        ? card.mainTag
        : displaySettings.sortCategory === "Tags"
        ? "untagged"
        : null;

    //Get Index Of Current Board
    const boardIndex = boards.findIndex((indexBoard) => {
      return indexBoard.name === board;
    });

    //If On Current Board, Add Normally
    if (board === currentBoard) {
      var cardIndex = -1;
      var catIndex = cardCategories.findIndex((cat, index) => {
        cardIndex = cardCategories[index].cards.findIndex((targetCard) => {
          return targetCard.name === card.name;
        });
        return cardIndex > -1;
      });
      if (catIndex === -1) {
        switch (displaySettings.sortCategory) {
          case "Types":
            catIndex = cardCategories.findIndex((cat) => {
              return cat.name === card.mainType;
            });
            break;
          case "Cost":
            catIndex = cardCategories.findIndex((cat) => {
              return cat.name === card.mainCMC;
            });
            break;
          case "Tags":
            catIndex = cardCategories.findIndex((cat) => {
              if (card.mainTag === undefined) {
                return cat.name === "untagged";
              } else {
                return cat.name === card.mainTag;
              }
            });
        }
      }
      if (catIndex === -1) {
        setCardCategories((cats) => [
          ...cats,
          { name: mainProp, open: true, cards: [card] },
        ]);
      } else {
        const cardIndex = cardCategories[catIndex].cards.findIndex(
          (targetCard) => {
            return targetCard.name === card.name;
          }
        );
        if (cardIndex === -1) {
          setCardCategories((prevCats) => {
            return prevCats.map((cat, index) => {
              if (index === catIndex) {
                return {
                  ...prevCats[index],
                  cards: [...prevCats[index].cards, card],
                };
              } else {
                return cat;
              }
            });
          });
        } else {
          changeQuantity(catIndex, cardIndex, 1);
        }
      }
    }
    //If On Other Board, Add To List
    else {
      const cardIndex = boards[boardIndex].cards.findIndex((targetCard) => {
        return targetCard.name === card.name;
      });
      if (cardIndex === -1) {
        const newBoards = produce(boards, (draft) => {
          draft[boardIndex].cards.push(card);
        });
        setBoards(newBoards);
      } else {
        const newBoards = produce(boards, (draft) => {
          draft[boardIndex].cards[cardIndex].quantity += 1;
        });
        setBoards(newBoards);
      }
    }
  }

  async function changeCardSet(set, typeIndex, cardIndex) {
    await setCardCategories((cats) => {
      return cats.map((cat, index) => {
        if (index !== typeIndex) {
          return cat;
        } else {
          return {
            ...cat,
            cards: [
              ...cat.cards.slice(0, cardIndex),
              {
                ...cat.cards[cardIndex],
                setName: set.setName,
                cardArt: set.cardArt,
                cardImage: set.cardImage,
              },
              ...cat.cards.slice(cardIndex + 1),
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

    if (displaySettings.displayGhosts) {
      types.forEach((type) => {
        type.cards.forEach((card) => {
          switch (displaySettings.sortCategory) {
            case "Types":
              card.modifiedTypes.forEach((type) => {
                const index = ghostArray.findIndex((item) => {
                  return type === item.name;
                });
                if (card.mainType !== type && type !== "Commander") {
                  if (index === -1) {
                    ghostArray.push({ name: type, cards: [card] });
                  } else {
                    ghostArray[index].cards.push(card);
                  }
                }
              });
              break;
            case "Cost":
              card.modifiedCMC.forEach((cmc) => {
                const index = ghostArray.findIndex((item) => {
                  return cmc === item.name;
                });
                if (card.mainCMC !== cmc && cmc !== -1) {
                  if (index === -1) {
                    ghostArray.push({ name: cmc, cards: [card] });
                  } else {
                    ghostArray[index].cards.push(card);
                  }
                }
              });
              break;
            case "Tags":
              card.tags.forEach((tag) => {
                const index = ghostArray.findIndex((item) => {
                  return tag === item.name;
                });
                if (card.mainTag !== tag && tag !== "Commander") {
                  if (index === -1) {
                    ghostArray.push({ name: tag, cards: [card] });
                  } else {
                    ghostArray[index].cards.push(card);
                  }
                }
              });
              break;
            default:
              break;
          }

          if (card.secondCard.name !== "") {
            const secondCard = card.secondCard;
            switch (displaySettings.sortCategory) {
              case "Types":
                secondCard.modifiedTypes.forEach((type) => {
                  const index = ghostArray.findIndex((item) => {
                    return type === item.name;
                  });
                  if (index === -1) {
                    ghostArray.push({ name: type, cards: [secondCard] });
                  } else {
                    ghostArray[index].cards.push(secondCard);
                  }
                });
                break;
              case "Cost":
                secondCard.modifiedCMC.forEach((cmc) => {
                  const index = ghostArray.findIndex((item) => {
                    return cmc === item.name;
                  });
                  if (index === -1) {
                    ghostArray.push({ name: cmc, cards: [secondCard] });
                  } else {
                    ghostArray[index].cards.push(secondCard);
                  }
                });
                break;
              case "Tags":
                secondCard.tags.forEach((tag) => {
                  const index = ghostArray.findIndex((item) => {
                    return tag === item.name;
                  });
                  if (index === -1) {
                    ghostArray.push({ name: tag, cards: [secondCard] });
                  } else {
                    ghostArray[index].cards.push(secondCard);
                  }
                });
                break;
              default:
                break;
            }
          }
        });
      });
      const newCats = produce(cardCategories, (draft) => {
        ghostArray.forEach((ghostType) => {
          const exists = cardCategories.filter((type) => {
            return ghostType.name === type.name;
          });
          if (exists.length === 0) {
            draft.push({ name: ghostType.name, open: true, cards: [] });
          }
        });
      });
      setCardCategories(newCats);
      setGhostCards(ghostArray);
    }
    return ghostArray;
  }

  async function toggleType(catIndex, open) {
    const newCats = produce(cardCategories, (draft) => {
      draft[catIndex].open = !open;
    });
    setCardCategories(newCats);
  }

  async function exportDeck() {
    axios
      .get(`/api/deck/download`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = `${deckName}.txt`;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      });
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
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.6)" },
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
            colors={colors}
            isAuthenticated={isAuthenticated}
            deleteDeck={deleteDeck}
            exportDeck={exportDeck}
            commanderDisplay={commanderDisplay}
          />
          <DeckContainer
            types={cardCategories}
            setTypes={setCardCategories}
            tokens={tokens}
            setTokens={setTokens}
            changeQuantity={changeQuantity}
            changeCardSet={changeCardSet}
            deckImage={deckImage}
            changeDeckArt={setDeckInfo}
            moveCard={moveCard}
            cardDrag={cardDrag}
            setCardDrag={setCardDrag}
            toggleType={toggleType}
            boards={boards}
            setBoardState={setBoardState}
            currentBoard={currentBoard}
            moveBoards={moveBoards}
            moveType={moveType}
            ghostCards={ghostCards}
            currentCategory={displaySettings.sortCategory}
            propertyList={propertyList}
            deckInfo={deckInfo}
            addCard={addCard}
            exportDeck={exportDeck}
            setCardCount={setCardCount}
            displaySettings={displaySettings}
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
        // appElement={document.getElementById("root")}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
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
  displaySettings: PropTypes.object.isRequired,
  emptyPacket: PropTypes.func.isRequired,
  updateDecks: PropTypes.func.isRequired,
  savingDeck: PropTypes.func.isRequired,
  setDeckId: PropTypes.func.isRequired,
  loadTools: PropTypes.func.isRequired,
  deleteDeck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  uploadCards: state.deck.uploadCards,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  saveDeck: state.auth.saveDeck,
  settingsCloak: state.deck.settingsCloak,
  displaySettings: state.deck.displaySettings,
});

export default connect(mapStateToProps, {
  emptyPacket,
  updateDecks,
  savingDeck,
  setDeckId,
  loadTools,
  deleteDeck,
})(BuilderContainer);
