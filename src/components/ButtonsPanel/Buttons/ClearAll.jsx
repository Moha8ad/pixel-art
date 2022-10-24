import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { RefreshRounded } from '@material-ui/icons';

import useStyles from '../styles';

// refresh button: clear the whole grid
const ClearAll = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});

    return (
        <>
            <Tooltip title="Clear All" placement="top">
            {props.coloredPixels.length > 0 ?
            <IconButton size='small' color="secondary" onClick={() => props.handleClear()}>
                <RefreshRounded />
            </IconButton>
            :
            <IconButton size='small' className={classes.clearAll} >
                <RefreshRounded />
            </IconButton>
            }
            </Tooltip>
        </>
  )
}

export default ClearAll