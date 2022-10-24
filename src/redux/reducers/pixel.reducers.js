import PixelActionTypes from "../constants/pixel.types";

// default grid size
const defaultColumns = 8

const INITIAL_STATE = {
  // stores all data related to grid container and its pixels
  gridData: {
    // calculates the number of pixels based on the grid size
    pixels: Array(Math.pow(defaultColumns, 2)).fill({color:['white']}), 
    // number of columns based on the grid size
    columns:defaultColumns,
  },
  // stores colored pixels to persist its state in case of e.g. a browser refresh
  coloredPixelsDB: [],
  // stores picked color by user -- below is default color as page loads
  pickedColor: `rgb(191,90,242)`,
  // stores picked palette by user -- below is default
  selectedColorPalette: 'Pixel Art',
  // stores drag palette toggle by user -- below is default
  toggleDragPalette: false,
  // stores dark mode toggle by user -- below is default
  toggleDarkMode: false,
  // stores grid border toggle by user -- below is default
  toggleGridBorder: true,
}

export const pixelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PixelActionTypes.GRID_DATA:
      return {
        ...state,
        gridData: action.payload
      }
    case PixelActionTypes.PICK_COLOR:
      return {
        ...state,
        pickedColor: action.payload
      }
    case PixelActionTypes.COLORED_PIXELS:
      return {
        ...state,
        coloredPixelsDB: action.payload
      }
    case PixelActionTypes.COLOR_PALETTE:
      return {
        ...state,
        selectedColorPalette: action.payload
      }
    case PixelActionTypes.TOGGLE_DRAG_PALETTE:
      return {
        ...state,
        toggleDragPalette: action.payload
      }
      case PixelActionTypes.TOGGLE_GRID_BORDER:
      return {
        ...state,
        toggleGridBorder: action.payload
      }
    case PixelActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        toggleDarkMode: action.payload
      }
    default:
      return state;
  }
};

export default pixelReducer;