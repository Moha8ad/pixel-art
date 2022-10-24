import { makeStyles } from '@material-ui/core/styles';

const pixelSize = (method, gridContainerSize, gridColumns, pixelSize ) => `${method}(min(${gridContainerSize/gridColumns}vh, ${gridContainerSize/gridColumns}vw), ${pixelSize}px)`;

export default makeStyles((theme) => ({
 
  gridBox: {
    height: props => `max(min(${props.gridContainerSize}vh, ${props.gridContainerSize}vw), ${props.gridContainerSizeSm}px)`,
    [theme.breakpoints.up('lg')]: {
      height: props => `min(min(${props.gridContainerSize}vh, ${props.gridContainerSize}vw), ${props.gridContainerSizeLg}px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: props => `max(min(${props.gridContainerSize}vh, ${props.gridContainerSize}vw), ${props.gridContainerSizeXl}px)`,
    },

    overflow: 'hidden',
    display: 'grid',
    cursor: 'pointer',
    gridTemplateColumns: props => `repeat(${props.gridColumns}, 1fr)`,
    boxShadow: `0px 0px 15px 0px rgba(0, 0, 0, 0.8)`, 
    margin:'10px 0',
  },

  gridPixel: {
    border: props => `${props.toggleGridBorder ? '.1px solid #202020' : '0px'}`,

    transitionProperty: 'width, height, background-color',
    transitionDuration: '.5s',

    // to fit in user's viewport, min method checks viewport height or width 
    // to calculate each individual pixel size: grid container size/number of grid columns
    // with this approach, the size of pixels changes, not the container
    // the container size will only change based on viewport size
                  
     height: props => pixelSize(`max`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeSm/props.gridColumns) ),
     width: props => pixelSize(`max`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeSm/props.gridColumns) ),
     [theme.breakpoints.up('lg')]: {
        height: props => pixelSize(`min`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeLg/props.gridColumns) ),
        width: props => pixelSize(`min`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeLg/props.gridColumns) ),
     },
     [theme.breakpoints.up('xl')]: {
        height: props => pixelSize(`max`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeXl/props.gridColumns) ),
        width: props => pixelSize(`max`, props.gridContainerSize, props.gridColumns, (props.gridContainerSizeXl/props.gridColumns) ),
    },
  },

}));