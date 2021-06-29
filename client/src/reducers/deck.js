import {
  UPLOAD_PACKET,
  SET_DECK_ID,
  OPEN_DECK_LIST,
  TOGGLE_DISPLAY,
  TOGGLE_TOOLS,
  DECK_ERROR,
  SETTINGS_CLOAK,
  ADJUST_SETTING_PROPERTIES,
} from "../actions/types";

const initialState = {
  uploadCards: [],
  deckId: null,
  openDeckList: false,
  displaySettings: {
    displayMana: true,
    displayQuantity: true,
    displayLegalities: true,
    displayName: true,
    displayGhosts: true,
    cardSize: 100,
    asSize: 100,
    sortCategory: "Types",
  },
  settingBooleans: {
    property: "Types",
  },
  settingsCloak: false,
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
        case "displayMana":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayMana: payload.checked,
            },
          };
        case "displayQuantity":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayQuantity: payload.checked,
            },
          };
        case "displayLegalities":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayLegalities: payload.checked,
            },
          };
        case "displayName":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayName: payload.checked,
            },
          };
        case "displayGhosts":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayGhosts: payload.checked,
            },
          };
        case "cardSize":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              cardSize: payload.checked,
            },
          };
        case "asSize":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              asSize: payload.checked,
            },
          };
        case "sortCategory":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              sortCategory: payload.checked,
            },
          };
        default:
          return state;
      }
    case ADJUST_SETTING_PROPERTIES:
      return {
        ...state,
        settingBooleans: { ...state.settingBooleans, property: payload },
      };
    case SETTINGS_CLOAK:
      return { ...state, settingsCloak: payload };
    case DECK_ERROR:
      return state;
    default:
      return state;
  }
}
