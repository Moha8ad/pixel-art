import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toToggleDragPalette } from '../../../redux/actions/pixel.actions.js';

import { IconButton, Tooltip } from '@material-ui/core';

import { OpenWithRounded } from '@material-ui/icons';

import useStyles from '../styles.js';

// drags color palette ON/OFF 
const ToggleDragPalette = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});
    const dispatch = useDispatch();
    const toggleDragPalette = useSelector(state => state.pixelDB.toggleDragPalette)

    return (
        <>
            <Tooltip title="Drag Color Palette" placement="top">
            {toggleDragPalette ?
                <IconButton size='small' className={`${classes.toggleDragPalette} ${classes.toggleOn}`}
                    onClick={() => dispatch(toToggleDragPalette(!toggleDragPalette))}
                >
                    <OpenWithRounded />
                </IconButton>
                :
                <IconButton size='small' className={`${classes.toggleDragPalette} ${classes.toggleOff}`}
                    onClick={() => dispatch(toToggleDragPalette(!toggleDragPalette))}
                >
                    <OpenWithRounded />
                </IconButton>
            }
            </Tooltip>
        </>
    )
}

export default ToggleDragPalette;