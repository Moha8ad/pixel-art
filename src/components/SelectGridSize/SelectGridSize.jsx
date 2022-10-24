import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { coloredPixelsData, gridData } from '../../redux/actions/pixel.actions';

import { Button, TextField, Tooltip } from '@material-ui/core';

import useStyles from './styles';

// grid size panel
const SelectGridSize = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  // the number of pixels in each column/row of the grid container square
  const gridSizeChoices = [8, 12, 16, 32]

  // fetch current grid size from redux store
  const currentGridSize = useSelector((state) => state.pixelDB.gridData.columns);
  
  // an array of colored pixels' indexes -- latest one colored is pushed to the end of the array
  const coloredPixelsDB = useSelector(state => state.pixelDB.coloredPixelsDB)
  
  // a number entered by the user to change the grid size
  const [customSize, setCustomSize] = useState(currentGridSize);

  // a function which takes size as argument and dispatches it to the redux store
  const handleSize = (size) => {

    // clears colored pixels array if selected size and current grid size is not equal and also
    if (size !== currentGridSize ) {
      dispatch(coloredPixelsData([]))
    }

    // after clearing the current colored pixels, changes the grid size
    const changeGridSize = function() {  
      if (size !== currentGridSize) {
        // handles the custom size entered by user
        setCustomSize(size)
        // dispatches new grid data when the user chooses a new grid size
        dispatch(gridData({
          pixels:Array(Math.pow(size, 2)).fill({color:['white']}), 
          columns:size
        }))
      }
    }
    // clearing the current colored pixels's transtion (.5s) needs a short pause
    // if any colored pixel exists, then this pause is needed
    coloredPixelsDB.length > 0 ? setTimeout(changeGridSize, 400) : changeGridSize();
  };

  return (
    <div className={classes.customSizeContainer} >
      {/* layout for larger devices */}
      {gridSizeChoices.map((size, idx) =>
          <Button key={idx}  size='medium' className={classes.gridSizeButtonNotSmallDevice}
            style={{
              border: `${currentGridSize === size ? '1px solid black' : '1px solid rgb(122,122,127)'}`,
              color: `${currentGridSize === size ? 'black' : '#ddd'}`,
              backgroundColor: `${currentGridSize === size ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.4)'}`,
            }}
            onClick={()=>handleSize(size)}
          >
            {size}x{size}
          </Button>
      )}
      {/* layout for small devices */}
      {gridSizeChoices.map((size, idx) => idx < 1 &&
          <Button key={idx}  size='medium' className={classes.gridSizeButtonSmallDevice}
            style={{
              border: `${currentGridSize === size ? '1px solid black' : '1px solid rgb(122,122,127)'}`,
              color: `${currentGridSize === size ? 'black' : '#ddd'}`,
              backgroundColor: `${currentGridSize === size ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.4)'}`,
            }}
            onClick={()=>handleSize(size)}
          >
            {size}x{size}
          </Button>
      )}
      {/* input for custom size grid */}
      <Tooltip title="between 1 and 64">
      <TextField
        className={classes.customSizeTextField}
        type="number"
        value={customSize}
        size='small' 
        variant='outlined'
        onChange={ (e) => (e.target.value >= 0 && e.target.value <= 64) && handleSize(Number(e.target.value))}
      />  
      </Tooltip>
    </div>
  );
}

export default SelectGridSize;