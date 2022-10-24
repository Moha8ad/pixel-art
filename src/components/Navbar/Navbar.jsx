import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toToggleDarkMode } from '../../redux/actions/pixel.actions';

import AsarLogo from '../AsarLogo/AsarLogo';

import { AppBar, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';

import { Brightness2TwoTone, WbSunnyTwoTone } from '@material-ui/icons';

import useStyles from './styles';

const Navbar = (props) => {

  const dispatch = useDispatch();
  
  // provides boolean value
  const toggleDarkMode = useSelector(state => state.pixelDB.toggleDarkMode);

  // passes toggleDarkMode boolean value as a prop to style.js
  const classes = useStyles(props={toggleDarkMode});
  
  return (
    <AppBar className={classes.appBar} position="static">
      <Grid container direction="row" alignItems="center" justifyContent="space-between" >

        {/* Asar Web Development Logo */}  
        <AsarLogo logoSize={'small'}/>

        {/* Navbar header title */}
        <Typography className={classes.heading} align="center">Pixel Art</Typography>
        
        {/* dark mode ON/OFF*/}
        <Tooltip title="Dark/Light Mode">
        { toggleDarkMode ?
          // dark mode
          <IconButton className={classes.darkMode} onClick={() => dispatch(toToggleDarkMode(!toggleDarkMode))}>
            <Brightness2TwoTone />
          </IconButton>
          :
          // light mode
          <IconButton className={classes.lightMode} onClick={() => dispatch(toToggleDarkMode(!toggleDarkMode))} >
            <WbSunnyTwoTone />
          </IconButton>
        }
        </Tooltip>

      </Grid>
    </AppBar>

  )
}

export default Navbar;