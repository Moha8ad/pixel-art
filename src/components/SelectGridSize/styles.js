import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  customSizeContainer: {

    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    "&>*": {
      margin: '1px'
    },
    
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `repeat(2, 1fr)`,
    },
  },
  gridSizeButtonNotSmallDevice: {

    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  gridSizeButtonSmallDevice: {

    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
  },
  customSizeTextField: {
    width:'75px', 
    padding:'0 5px',
  }
}));