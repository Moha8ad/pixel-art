import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { gridData, coloredPixelsData } from '../../redux/actions/pixel.actions';

import ColorPalette from '../ColorPalette/ColorPalette';
import GridBox from '../GridBox/GridBox';
import ButtonPanel from '../ButtonsPanel/ButtonsPanel';
import SelectGridSize from '../SelectGridSize/SelectGridSize';

import { Grid } from '@material-ui/core';
import useStyles from './styles';

// a child component of Home and parent of four components:
// color palette, grid box, button panel, grid size selector
const GridContainer = (props) => {
  
  const dispatch = useDispatch();

  // pixelDB is the main and highest level state for data flow in this app
  const state = useSelector((state) => state.pixelDB);
  
  // provides the current grid columns
  const gridColumn = state.gridData.columns;

  // generates an array of pixel objects with the default color of white
  // based on the grid size chosen by user this array changes 
  const [ grid, setGrid ] = useState({ pixels: Array(Math.pow(gridColumn, 2)).fill({color:['white']}) });

  // stores the color from palette
  const [ pickedColor, setPickedColor ] = useState('');
  
  // stores history of pixels colored
  const [ coloredPixels, setColoredPixels ] = useState([]);

  // updates if changes in state happen to gridData, pickedColor, coloredPixelDB
  useEffect(() => {
      setGrid(state.gridData)
      setPickedColor(state.pickedColor)
      setColoredPixels(state.coloredPixelsDB)
  }, [state.gridData, state.pickedColor, state.coloredPixelsDB])
  
  // an array storing the last selected pixels index based on the order from the latest one
  const [ prevPixelIndex, setPrevPixelIndex ] = useState([]);

  // an array storing previous colored pixels indexes array -- a nested array
  const [ prevColoredPixelsIndex, setPrevColoredPixelsIndex ] = useState([]);

  // stores the selected color filling mode, e.g. brush/bucket
  const [ colorFillMode, setColorFillMode ] = useState('brush');

  // size of the responsive grid container according to viewport height/vidth, e.g. 60vw/60vh
  const gridContainerSize = 60;
  // size of the fixed grid container for extra large devices according to pixels, e.g. 800px
  const gridContainerSizeXl = 800;
  // size of the fixed grid container for larger devices according to pixels, e.g. 480px
  const gridContainerSizeLg = 480;
  // size of the fixed grid container for smaller devices according to pixels, e.g. 240px
  const gridContainerSizeSm = 240;
  // number of columns in grid box 
  const gridColumns = grid.columns

  // props needed for style
  const classes = useStyles(props={gridContainerSize, gridContainerSizeLg, gridContainerSizeSm});
  
  // changeColor function works when a pixel is clicked
  // how this function works:
  // 1- finds all the neighbouring pixels of the clicked pixel:
  //    - 3 neighbouring pixels for four corner pixels in the grid
  //    - 5 neighbouring pixels for two side columns and two side rows in the grid
  //    - 8 neighbouring pixels for all other pixels in the grid 
  // 1-1- the neighbouring pixels array will remain empty if bucket button is not clicked
  // 2- filters the neighbouring pixels by checking if their color is the same as the selected pixel
  // 3- adds the picked color to the selected pixel and the filtered neighbouring pixels
  // 4- colored pixels array will be stored in colored pixels array in redux
  // note: the combination of the selected pixel and the filtred ones are now stored in grid.pixels
  // note: the last colored pixels history after each click is now stored
  // 5- an array of selected pixels indexes is stored - the latest selected added to end
  // 6- an array of neighbouring pixels array is stored -- the latest selected added to end
  // note: if undo is clicked:
  // 7-1- prev colored pixels will be stored in a new array
  // 7-2- last colored pixel array will be removed from colored pixels array in redux
  // 7-3- the last item from previous selected pixel will be removed
  // 7-4- the last array from previous same color neighbouring pixels will be removed
  // 7-5- using the new array(6-1-) the last color from each pixel's color array stored in grid.pixels will be removed
  const changeColor = (pixelIndex, color, undo) => {

    // configs related to four corner pixels in the grid 
    // these pixels should have 3 neighbours
    const firstGridPixel = 0
    const topRightGridPixel = gridColumn-1
    const bottomLeftGridPixel = gridColumn*(gridColumn-1)
    const lastGridPixel = Math.pow(gridColumn, 2)-1

    // configs related to pixels in two side columns and two side rows in the grid 
    // these pixels should have 5 neighbours
    let firstGridRowNums = []
    let lastGridRowNums = []
    let firstGridColNums = []
    let lastGridColNums = []

    for (let i = firstGridPixel; i < topRightGridPixel-1; i++) {
      firstGridRowNums = [...firstGridRowNums, i+1]
    }
    for (let i = bottomLeftGridPixel; i < lastGridPixel-1; i++) {
      lastGridRowNums = [...lastGridRowNums, i+1]
    }
    for (let i = 1; i < gridColumn-1; i++) {
      firstGridColNums = [...firstGridColNums, (i * gridColumn)]
    }
    for (let i = 2; i < gridColumn; i++) { 
      lastGridColNums = [...lastGridColNums, (i * gridColumn)-1]
    }

    // 1- creates an array of neighbouring pixels based on the position of the clicked pixels
    // 1-1- the neighbouring pixels array will remain empty if bucket button is not clicked
    const neighbourPixels = (
      colorFillMode === 'bucket' ? (
        pixelIndex === firstGridPixel
        ?
        [
          pixelIndex+1,
          pixelIndex+gridColumn, 
          pixelIndex+(gridColumn+1),
        ] 
        :
        pixelIndex === topRightGridPixel
        ?
        [
          pixelIndex-1,
          pixelIndex+(gridColumn-1), 
          pixelIndex+gridColumn, 
        ] 
        :
        pixelIndex === bottomLeftGridPixel
        ?
        [
          pixelIndex-gridColumn, 
          pixelIndex-(gridColumn-1), 
          pixelIndex+1,
        ] 
        :
        pixelIndex === lastGridPixel
        ?
        [
          pixelIndex-(gridColumn+1), 
          pixelIndex-gridColumn, 
          pixelIndex-1,
        ]
        :
        firstGridRowNums.find(element => element === pixelIndex) 
        ?
        [
          pixelIndex-1,
          pixelIndex+1,
          pixelIndex+(gridColumn-1),
          pixelIndex+gridColumn,
          pixelIndex+(gridColumn+1), 
        ]
        :
        lastGridRowNums.find(element => element === pixelIndex) 
        ?
        [
          pixelIndex-(gridColumn+1), 
          pixelIndex-gridColumn, 
          pixelIndex-(gridColumn-1), 
          pixelIndex-1,
          pixelIndex+1,
        ]
        :
        firstGridColNums.find(element => element === pixelIndex) 
        ? 
        [
          pixelIndex-gridColumn, 
          pixelIndex-(gridColumn-1), 
          pixelIndex+1,
          pixelIndex+gridColumn, 
          pixelIndex+(gridColumn+1),
        ] 
        : 
        lastGridColNums.find(element => element === pixelIndex) 
        ? 
        [
          pixelIndex-(gridColumn+1),
          pixelIndex-gridColumn, 
          pixelIndex-1,
          pixelIndex+(gridColumn-1), 
          pixelIndex+gridColumn 
        ] 
        : 
        [
          pixelIndex-(gridColumn+1), 
          pixelIndex-gridColumn, 
          pixelIndex-(gridColumn-1), 
          pixelIndex-1,
          pixelIndex+1,
          pixelIndex+(gridColumn-1),
          pixelIndex+gridColumn,
          pixelIndex+(gridColumn+1), 
        ]
      )
      :
      []
    );

    // 2- filters the neighbouring pixels by checking if their color is the same as the selected pixel
    const neighbourSameColorPixels = (
      neighbourPixels.filter(neighbourIndex => 
        grid.pixels[pixelIndex].color[grid.pixels[pixelIndex].color.length-1] === 
        grid.pixels[neighbourIndex].color[grid.pixels[neighbourIndex].color.length-1] 
      )
    );
    
    // updates arrays with index dynamically
    // recursively, uses destructuring and the rest syntax 
    // to grab the index and item at each iteration
    const update = (arr, idx, itm, ...rest) => {
      arr[idx] = itm;
      if (rest.length) update(arr, ...rest);
    }

    if (undo){

      // 6-1- prev colored pixels will be stored in a new array
      const pixToUndo = coloredPixels[coloredPixels.length-1] 
  
      // 6-2- last colored pixel array will be removed from colored pixels array in redux
      setColoredPixels(coloredPixels.pop())
      dispatch(coloredPixelsData([ ...coloredPixels ]))
      // 6-3- the last item from previous selected pixel will be removed
      // if click action is undo: removes the last pixel item from prevPixelIndex array
      prevPixelIndex.pop()

      // 6-4- the last array from previous same color neighbouring pixels will be removed
      // if click action is undo: removes the last pixel item from prevPixelIndex array
      prevColoredPixelsIndex.pop()

      // 6-5- using the new array(6-1-) the last color from each pixel's color array stored in grid.pixels will be removed
      pixToUndo.map((i) => (
        grid.pixels[i]?.color.length > 1 ?
        // if undo clicked and 
        // if more than one color exists in pixel's color array: removes the last color
        grid.pixels[i].color.pop()
        :
        // if undo clicked and 
        // if there is no color in pixel's color array: add 'white'
        update(grid.pixels, i, {color: ['white']})
      ))
    } else {
      // 3- adds the picked color to the selected pixel and the filtered neighbouring pixels
      // if click action does not call undo: add color as last item in pixel's color array
      // this data will be saved in grid.pixels array
        [ pixelIndex, ...neighbourSameColorPixels ].map(pixelIdx =>
          update(grid.pixels, pixelIdx, {color: [ ...grid.pixels[pixelIdx].color, color]})
        )
      
      // 6- an array of neighbouring pixels array is stored 
      // if click action does not call undo: adds neighbourSameColorPixels as the last array in prevColoredPixelsIndex array
      setPrevColoredPixelsIndex([ ...prevColoredPixelsIndex, neighbourSameColorPixels])
      
      // 5- an array of selected pixels indexes is stored 
      // if click action does not call undo: adds pixelIndex as the last item in prevPixelIndex array
      setPrevPixelIndex([ ...prevPixelIndex, pixelIndex])
    
      // 4- colored pixels array will be stored in colored pixels array in redux
      // if click action does not call undo: adds pixelIndex and neighborSameColorPixels as 
      // the last array in coloredPixelsData array -- nested array
      // note: saves the last colored pixels history after each click
      dispatch(coloredPixelsData([ ...coloredPixels, [pixelIndex, ...neighbourSameColorPixels]]))

    }
  }

  // selected pixels array and grid pixels' color array set to default in redux store
  const handleClear = () => {
    setPrevPixelIndex([]);
    dispatch(coloredPixelsData([]))
    dispatch(gridData({...grid, 
      pixels:Array(Math.pow(gridColumn, 2)).fill({color:['white']}), 
    }));
  };

  return (
    <Grid item className={classes.gridContainer}>

      {/* ColorPalette component:
          when a color is clicked, it changes the picked color
          when drag palette is true, user can drag the palette
          drag option is removed for small devices because it does not work properly on them 
      */}
      <ColorPalette 
        gridContainerSize={gridContainerSize} 
        gridContainerSizeLg={gridContainerSizeLg}
        gridContainerSizeSm={gridContainerSizeSm}
        gridContainerSizeXl={gridContainerSizeXl}
      />

      {/* GridBox component: 
          the grid pixel array generated in redux store is mapped here to create the grid box
          when a pixel is clicked, it calls changeColor function and provides two argument for it:
          that pixels' idx and the picked color function
      */}
      <GridBox 
        changeColor={changeColor} 
        
        pickedColor={pickedColor}
        coloredPixels={coloredPixels}
        
        gridContainerSize={gridContainerSize} 
        gridContainerSizeXl={gridContainerSizeXl}
        gridContainerSizeLg={gridContainerSizeLg}
        gridContainerSizeSm={gridContainerSizeSm}
        gridColumns={gridColumns}
        gridPixels={grid.pixels} 
        
      />

      {/* ButtonsPanel component: 
          all buttons in the buttons panel are listed in this component
      */}
      <ButtonPanel 
        changeColor={changeColor} 
        handleClear={handleClear} 

        pickedColor={pickedColor}
        coloredPixels={coloredPixels} 
        prevPixelIndex={prevPixelIndex}
        
        colorFillMode={colorFillMode}
        setColorFillMode={setColorFillMode}
      />

      {/* SelectGridSize component:
          on small devices: the default grid size option plus custom input is displayed
          on larger devices: four grid size options plus custom input is available
          custom size range is btw 1 and 64
      */}
      <SelectGridSize />
        
    </Grid>
  )
}

export default GridContainer