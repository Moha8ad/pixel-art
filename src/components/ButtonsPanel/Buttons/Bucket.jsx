import React from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { FormatColorFillRounded, FormatPaintRounded } from '@material-ui/icons';

import useStyles from '../styles';

// bucket button
const Bucket = ({ toggleDarkMode, ...props }) => {

  const classes = useStyles({toggleDarkMode});

    return (
        <>
        <Tooltip title="Bucket: fills one pixel and its same color neighbours" placement="top">
        { 
          props.pickedColor !== `rgba(0,0,0,0)` && props.colorFillMode === 'bucket' ?
            <IconButton size='small' style={{color: `${props.pickedColor}` }} >
              <FormatColorFillRounded  />
            </IconButton>
          :
          props.pickedColor === `rgba(0,0,0,0)` && props.colorFillMode === 'bucket' ?
            <IconButton size='small' className={classes.toggleOn} >
              <FormatPaintRounded />
            </IconButton>
          :
            <IconButton size='small' className={classes.toggleOff} onClick={() => props.setColorFillMode('bucket')}>
              <FormatColorFillRounded  />
            </IconButton>
        }
        </Tooltip>

        </>
    )
}

export default Bucket;