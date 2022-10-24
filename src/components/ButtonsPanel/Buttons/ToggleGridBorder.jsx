
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toToggleGridBorder } from '../../../redux/actions/pixel.actions';

import { IconButton, Tooltip } from '@material-ui/core';
import { GridOffRounded, GridOnRounded } from '@material-ui/icons';

import useStyles from '../styles';

// grid on/Off button
const ToggleGridBorder = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});

    const dispatch = useDispatch();
    const toggleGridBorder = useSelector(state => state.pixelDB.toggleGridBorder)

    return (
        <>
            <Tooltip title="Grid Border" placement="top">
            { toggleGridBorder ?
            <IconButton size='small' className={classes.toggleOn}
                onClick={() => dispatch(toToggleGridBorder(false))}
            >
                <GridOnRounded />
            </IconButton>
            :
            <IconButton size='small' className={classes.toggleOff}
                onClick={() => dispatch(toToggleGridBorder(true))}
            >
                <GridOffRounded />
            </IconButton>
            }
            </Tooltip>
        </>
    )
}

export default ToggleGridBorder;