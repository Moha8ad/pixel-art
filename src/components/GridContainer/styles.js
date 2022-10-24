import { makeStyles } from '@material-ui/core/styles';

const gridContainerWidth = ( method, gridContainerSize, gridFixedSize) => `${method}(min(${gridContainerSize}vh, ${gridContainerSize}vw), ${gridFixedSize}px)`;

export default makeStyles((theme) => ({
  gridContainer: {
    width: props => gridContainerWidth(`max`, props.gridContainerSize, props.gridContainerSizeSm),
    [theme.breakpoints.up('lg')]: {
      width: props => gridContainerWidth(`min`, props.gridContainerSize, props.gridContainerSizeLg),
    },
    [theme.breakpoints.up('xl')]: {
      width: props => gridContainerWidth(`max`, props.gridContainerSize, props.gridContainerSizeLg),
    },
  },

  buttonsPanel: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    marginBottom: '5px',
    "&>*": {
      padding: '4px',
      margin: '4px'
    }
  },
  dragPalette: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));