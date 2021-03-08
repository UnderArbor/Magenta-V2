import {
  UPLOAD_PACKET,
  SET_DECK_ID,
  OPEN_DECK_LIST,
  TOGGLE_DISPLAY,
  DECK_ERROR,
} from "../actions/types";

const initialState = {
  uploadCards: [],
  deckId: null,
  openDeckList: false,
  displaySettings: {
    displayMana: true,
    displayQuantity: true,
    displayIndicator: true,
    displayName: true,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_PACKET:
      return { ...state, uploadCards: payload };
    case SET_DECK_ID:
      return { ...state, deckId: payload };
    case OPEN_DECK_LIST:
      return { ...state, openDeckList: payload };
    case TOGGLE_DISPLAY:
      switch (payload.id) {
        case "manaDisplay":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayMana: payload.checked,
            },
          };
        case "quantityDisplay":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayQuantity: payload.checked,
            },
          };
        case "indicatorDisplay":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayIndicator: payload.checked,
            },
          };
        case "nameDisplay":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayName: payload.checked,
            },
          };
      }
    case DECK_ERROR:
      return state;
    default:
      return state;
  }
}
