import { makeStyles } from '@material-ui/core/styles';

const DarkModeColorOne = (toggleDarkMode) => `${toggleDarkMode ? '#aaa' : '#555'}`;

// now in both cases the color is the same but the config is set to be ready for the time needed
const DarkModeColorTwo = (toggleDarkMode) => `${toggleDarkMode ? 'white' : 'white'}`;

export default makeStyles((theme) => ({
  
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
      padding: '3px',
      margin: '3px'
    }
  },
  toggleOn: {
    color: props => DarkModeColorTwo(props.toggleDarkMode),
  },
  toggleOff: {
    color: props => DarkModeColorOne(props.toggleDarkMode),
  },
  undo: {
    color: props => DarkModeColorOne(props.toggleDarkMode),
    cursor: 'not-allowed'
  },
  clearAll: {
    color: props => DarkModeColorOne(props.toggleDarkMode),
    cursor: 'not-allowed'
  },
  selectPalette: {
    color: props => DarkModeColorTwo(props.toggleDarkMode),
  },
  toggleDragPalette: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

}));