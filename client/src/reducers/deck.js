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
    displayIndicator: false,
    displayName: true,
    cardSize: 100,
    sortCategory: "Types",
  },
  toolBooleans: {
    manaCurve: true,
    displaySettings: true,
    cardSorting: true,
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
        case "displayIndicator":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              displayIndicator: payload.checked,
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
        case "cardSize":
          return {
            ...state,
            displaySettings: {
              ...state.displaySettings,
              cardSize: payload.checked,
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
    case TOGGLE_TOOLS:
      switch (payload.name) {
        case "manaCurve":
          return {
            ...state,
            toolBooleans: {
              ...state.toolBooleans,
              manaCurve: payload.toggle,
            },
          };
        case "displaySettings":
          return {
            ...state,
            toolBooleans: {
              ...state.toolBooleans,
              displaySettings: payload.toggle,
            },
          };
        case "cardSorting":
          return {
            ...state,
            toolBooleans: {
              ...state.toolBooleans,
              cardSorting: payload.toggle,
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
