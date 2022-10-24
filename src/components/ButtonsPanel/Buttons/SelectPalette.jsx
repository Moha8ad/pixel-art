import React from 'react';
import { useDispatch } from 'react-redux';
import { selectColorPalette } from '../../../redux/actions/pixel.actions';

import { palettesDB } from '../../../assets/palettesDB';

import { Fade, IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Palette } from '@material-ui/icons';

import useStyles from '../styles';

// select color palette button
const SelectPalette = ({ toggleDarkMode, ...props }) => {

    const classes = useStyles({toggleDarkMode});
    const dispatch = useDispatch();

    const paletteNames = palettesDB.map(palette => palette.name)

    // material ui config
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Color Palette" placement="top">
                <IconButton size='small' className={classes.selectPalette} onClick={handleClick} >
                    <Palette 
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                id="fade-menu"
                MenuListProps={{'aria-labelledby': 'fade-button',}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {paletteNames.map((name, idx) =>
                    <MenuItem key={idx} style={{fontSize:'.8em'}} onClick={() => dispatch(selectColorPalette(name))}>
                        {name}
                    </MenuItem>
                )} 
            </Menu>
        </>

    )
}

export default SelectPalette;