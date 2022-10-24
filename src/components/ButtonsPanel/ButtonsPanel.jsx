import React from 'react';
import { useSelector } from 'react-redux';

import Brush from './Buttons/Brush';
import Bucket from './Buttons/Bucket';
import ClearAll from './Buttons/ClearAll';
import DownloadImage from './Buttons/DownloadImage';
import SelectPalette from './Buttons/SelectPalette';
import ToggleDragPalette from './Buttons/ToggleDragPalette';
import ToggleGridBorder from './Buttons/ToggleGridBorder';
import TransparentBackground from './Buttons/TransparentBackground';
import Undo from './Buttons/Undo';

import useStyles from './styles';

// receives props from its parent GridContainer component and passes to button components
const ButtonPanel = ({ ...props }) => {

    const toggleDarkMode = useSelector(state => state.pixelDB.toggleDarkMode);
    const classes = useStyles(toggleDarkMode);

    
    const toggleDarkModeColor='#aaa'

    return (
        <div className={classes.buttonsPanel} >

            <Undo
                changeColor={props.changeColor} 
                coloredPixels={props.coloredPixels} 
                prevPixelIndex={props.prevPixelIndex}
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <ClearAll
                handleClear={props.handleClear} 
                coloredPixels={props.coloredPixels} 
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <Brush
                pickedColor={props.pickedColor}
                colorFillMode={props.colorFillMode}
                setColorFillMode={props.setColorFillMode}
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <Bucket
                pickedColor={props.pickedColor}
                colorFillMode={props.colorFillMode}
                setColorFillMode={props.setColorFillMode}
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <TransparentBackground
                pickedColor={props.pickedColor}
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <SelectPalette
                toggleDarkMode={toggleDarkMode} 
            />
            <ToggleDragPalette
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <ToggleGridBorder 
                toggleDarkMode={toggleDarkMode}
                toggleDarkModeColor={toggleDarkModeColor}
            />
            <DownloadImage />
        </div>
    )
}

export default ButtonPanel