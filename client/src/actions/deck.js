import {
  UPLOAD_PACKET,
  UPDATE_DECKS,
  SAVE_DECK,
  SET_DECK_ID,
  OPEN_DECK_LIST,
  TOGGLE_DISPLAY,
  DECK_ERROR,
  SETTINGS_CLOAK,
  TOGGLE_TOOLS,
  ADJUST_SETTING_PROPERTIES,
} from "./types";

import axios from "axios";

export const uploadPacket = (cardFile) => (dispatch) => {
  try {
    let fileReader;

    const handleFileRead = async (e) => {
      const content = fileReader.result.split("\n");

      dispatch({ type: UPLOAD_PACKET, payload: content });
    };

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(cardFile);
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const emptyPacket = () => (dispatch) => {
  try {
    dispatch({ type: UPLOAD_PACKET, payload: [] });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const updateDecks = () => async (dispatch) => {
  try {
    await axios.get("api/auth").then((res) => {
      dispatch({ type: UPDATE_DECKS, payload: res.data.decks });
    });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const savingDeck = (boolean) => async (dispatch) => {
  try {
    dispatch({ type: SAVE_DECK, payload: boolean });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const setDeckId = (deckId) => async (dispatch) => {
  try {
    dispatch({ type: SET_DECK_ID, payload: deckId });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const cloakSettings = (cloakBool) => (dispatch) => {
  try {
    dispatch({ type: SETTINGS_CLOAK, payload: cloakBool });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const toggleDeckList = (boolean) => (dispatch) => {
  try {
    dispatch({ type: OPEN_DECK_LIST, payload: boolean });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const toggleDisplaySetting = (checked, id) => (dispatch) => {
  try {
    dispatch({ type: TOGGLE_DISPLAY, payload: { checked, id } });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const toggleToolBooleans = (name, toggle) => (dispatch) => {
  try {
    dispatch({ type: TOGGLE_TOOLS, payload: { name, toggle } });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const loadTools = (toolBooleans, displaySettings) => (dispatch) => {
  try {
    for (const [key, value] of Object.entries(toolBooleans)) {
      dispatch({ type: TOGGLE_TOOLS, payload: { name: key, toggle: value } });
    }
    for (const [key, value] of Object.entries(displaySettings)) {
      dispatch({ type: TOGGLE_DISPLAY, payload: { checked: value, id: key } });
      if (key === "sortCategory") {
        dispatch({ type: ADJUST_SETTING_PROPERTIES, payload: value });
      }
    }
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const adjustSettingProperties = (newModifier) => (dispatch) => {
  try {
    dispatch({ type: ADJUST_SETTING_PROPERTIES, payload: newModifier });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};

export const setSortCategory = (newCategory) => (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_DISPLAY,
      payload: { checked: newCategory, id: "sortCategory" },
    });
    dispatch({ type: ADJUST_SETTING_PROPERTIES, payload: newCategory });
  } catch (error) {
    dispatch({ type: DECK_ERROR });
  }
};
