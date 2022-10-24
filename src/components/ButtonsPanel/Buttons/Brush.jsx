import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { BrushRounded, FormatPaintRounded } from '@material-ui/icons';

import useStyles from '../styles';

// brush button 
const Brush = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});

    return (
        <>
            <Tooltip title="Brush: colors one pixel" placement="top">
            { 
            props.pickedColor !== `rgba(0,0,0,0)` && props.colorFillMode === 'brush' ?
                <IconButton size='small' style={{color: `${props.pickedColor}` }} >
                    <BrushRounded  />
                </IconButton>
            :
            props.pickedColor === `rgba(0,0,0,0)` && props.colorFillMode === 'brush' ?
                <IconButton size='small' className={classes.toggleOn}  >
                    <FormatPaintRounded  />
                </IconButton>
            :
                <IconButton size='small' className={classes.toggleOff} onClick={() => props.setColorFillMode('brush')}>
                    <BrushRounded  />
                </IconButton>
            }
            </Tooltip>
        </>
    )
}

export default Brush;