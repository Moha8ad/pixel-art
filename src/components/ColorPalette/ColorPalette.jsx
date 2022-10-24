import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pickColor } from '../../redux/actions/pixel.actions';

import Draggable from 'react-draggable';

import { Grid} from '@material-ui/core';

import { palettesDB } from '../../assets/palettesDB';

import useStyles from './styles';

const ColorPalette = ({ props, gridContainerSize, gridContainerSizeXl, gridContainerSizeLg, gridContainerSizeSm }) => {

    const dispatch = useDispatch();
    
    // provides selected palette's name as a string
    const selectedPaletteName = useSelector(state => state.pixelDB.selectedColorPalette);
    
    // provides boolean value
    const toggleDragPalette = useSelector(state => state.pixelDB.toggleDragPalette)

    // provides selected palette's colors for ColorPalette component as an array
    const selectedPaletteColors = palettesDB.filter(palette => (palette.name.includes(selectedPaletteName)))[0].colors

    // number of palette color grids
    const paletteColumns = 12;
    
    // style props
    const classes = useStyles(props={gridContainerSize, gridContainerSizeXl, gridContainerSizeLg, gridContainerSizeSm, paletteColumns});

  return (
    <Grid>
        {toggleDragPalette ? 
            // Draggable just accepts the div elem directly, 
            // in other words, it does not accept another component as child, 
            // so, this results in code repeatition. Maybe could be fixed later!      
            
            <Draggable>
                <div style={{ boxShadow: `0px 0px 20px 0px rgba(0,0,0,.8)`}}>
                    <Grid item xs={12} className={classes.colorPaletteContainer} > 
                        {selectedPaletteColors.map((color, idx) => 
                            <div key={idx}  onClick={() => dispatch(pickColor(color))}
                                className={classes.colorPalettePixels}
                                style={{ border: `1px solid #FFF`, backgroundColor: color }}
                            />
                        )}
                    </Grid>
                </div>
            </Draggable> 
        :
            <div >
                <Grid item xs={12} className={classes.colorPaletteContainer} > 
                    {selectedPaletteColors.map((color, idx) => 
                        <div key={idx}  onClick={() => dispatch(pickColor(color))}
                            className={classes.colorPalettePixels}
                            style={{ border: `1px solid #FFF`, backgroundColor: color,
                            }}
                        />
                    )}
                </Grid>
            </div>
        }
    </Grid>
  )
}

export default ColorPalette;