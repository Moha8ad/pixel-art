import { makeStyles } from '@material-ui/core/styles';

const gridContainerWidth = ( method, gridContainerSize,  gridFixedSize) => `${method}(min(${gridContainerSize}vh, ${gridContainerSize}vw), ${gridFixedSize}px)`;
const pixelSize = (method, gridContainerSize, paletteColumns, pixelSize ) => `${method}(min(${gridContainerSize/paletteColumns}vh, ${gridContainerSize/paletteColumns}vw), ${pixelSize}px)`;


export default makeStyles((theme) => ({  
  colorPaletteContainer: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',

    width: props => gridContainerWidth(`max`, props.gridContainerSize, props.gridContainerSizeSm),
    [theme.breakpoints.up('lg')]: {
      width: props => gridContainerWidth(`min`, props.gridContainerSize, props.gridContainerSizeLg),
    },
    [theme.breakpoints.up('xl')]: {
      width: props => gridContainerWidth(`max`, props.gridContainerSize, props.gridContainerSizeXl),
    },
  },
  colorPalettePixels: {
    height: props => pixelSize(`max`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeSm/props.paletteColumns)),
    width: props => pixelSize(`max`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeSm/props.paletteColumns) ),
    [theme.breakpoints.up('lg')]: {
      height: props => pixelSize(`min`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeLg/props.paletteColumns) ),
      width: props => pixelSize(`min`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeLg/props.paletteColumns) ),
    },
    [theme.breakpoints.up('xl')]: {
      height: props => pixelSize(`max`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeXl/props.paletteColumns) ),
      width: props => pixelSize(`max`, props.gridContainerSize, props.paletteColumns, (props.gridContainerSizeXl/props.paletteColumns) ),
    },
  }
}));