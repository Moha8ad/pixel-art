import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';

import { UndoRounded } from '@material-ui/icons';

import useStyles from '../styles';

// undo button: step by step goes back and undo colors till all grid is clear
const Undo = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});

    return (
        <>
            <Tooltip title="Undo" placement="top">
            {props.coloredPixels.length > 0 ?
            <IconButton size='small' color="secondary" onClick={() => props.changeColor(props.prevPixelIndex[props.prevPixelIndex.length-1], 'white', true)}>
                <UndoRounded />  
            </IconButton>
            :
            <IconButton size='small' className={classes.undo}>
                <UndoRounded />  
            </IconButton>
            }
            </Tooltip>  
        </>
    )
}

export default Undo