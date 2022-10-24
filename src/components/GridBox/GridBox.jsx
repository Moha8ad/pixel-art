import React from 'react';
import { useSelector } from 'react-redux';

import useStyles from './styles';

const GridBox = ({ ...props }) => {

  
  const toggleGridBorder = useSelector(state => state.pixelDB.toggleGridBorder)

  const classes = useStyles(props={toggleGridBorder, ...props});


    return (
        <div id="pixelArtToDownload" className={classes.gridBox}> 
          {props.gridPixels.map((pixel, idx) => 
            <div className={classes.gridPixel} key={idx} onClick={() => props.changeColor(idx, props.pickedColor)}
              style={{
                // background color of each pixel is selected from the last item in the color array 
                // of that pixel; the default color in this array is white and new picked color 
                // will be pushed as the last color into this array; when undo is clicked the last
                // color will be poped out, and so on.
                backgroundColor: `${
                  [...props.coloredPixels.flat()].includes(idx) ? 
                  pixel.color.map(color => color)[pixel.color.length-1] : 
                  'white'
                }`
              }}
            />
          )}
        </div>
  )
}

export default GridBox