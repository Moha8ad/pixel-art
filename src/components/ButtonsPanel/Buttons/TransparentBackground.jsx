import React from 'react';
import { useDispatch } from 'react-redux';

import { pickColor } from '../../../redux/actions/pixel.actions';

import { IconButton, Tooltip } from '@material-ui/core';

import { InvertColorsOff, OpacityRounded } from '@material-ui/icons';

import useStyles from '../styles';

// makes a pixel's background transparent
const TransparentBackground = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});
    const dispatch = useDispatch();

    return (
        <>
        <Tooltip title="Transparent Background for PNG" placement="top">
        { props.pickedColor === `rgba(0,0,0,0)` ?
          <IconButton size='small' className={classes.toggleOn} onClick={() => dispatch(pickColor('white'))}>
            <OpacityRounded />
          </IconButton>
          :
          <IconButton size='small' className={classes.toggleOff} onClick={() => dispatch(pickColor(`rgba(0,0,0,0)`))}>
            <InvertColorsOff  />
          </IconButton>
        }
        </Tooltip>
        
        </>
    )
}

export default TransparentBackground