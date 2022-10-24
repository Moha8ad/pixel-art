import PixelActionTypes from '../constants/pixel.types.js';

// changes the data related to grid container and its pixels
export const gridData = data => ({
  type: PixelActionTypes.GRID_DATA, 
  payload: data
})

// changes picked color by user
export const pickColor = color => ({
    type: PixelActionTypes.PICK_COLOR, 
    payload: color 
  })

// saves the latest changes in colored pixels 
export const coloredPixelsData = data => ({
  type: PixelActionTypes.COLORED_PIXELS, 
  payload: data 
})

// changes grid border toggle by user 
export const selectColorPalette = name => ({
  type: PixelActionTypes.COLOR_PALETTE, 
  payload: name 
})

// changes drag palette toggle by user 
export const toToggleDragPalette = boolean => ({
  type: PixelActionTypes.TOGGLE_DRAG_PALETTE, 
  payload: boolean 
})

// changes grid border toggle by user 
export const toToggleGridBorder = boolean => ({
  type: PixelActionTypes.TOGGLE_GRID_BORDER, 
  payload: boolean 
})

// changes dark mode toggle by user -- below is default
export const toToggleDarkMode = boolean => ({
  type: PixelActionTypes.TOGGLE_DARK_MODE, 
  payload: boolean 
})