import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {

    gridArea: 'navbar',
    
    borderRadius: '10px',
    marginBottom: '20px',
    padding: '0 10px',
    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    
    backgroundColor: props => props.toggleDarkMode ? 'rgba(0,0,0)' : 'rgba(0,0,0,0.1)',
    boxShadow: props => props.toggleDarkMode && `0px 10px 60px 0px rgba(255,255,255,1)`,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    textAlign: 'center',
    textDecoration: 'none',
    fontFamily: 'VT323',
    fontSize: '3em',
    pointerEvents: 'none',


    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5em'
    },
  },
  darkMode: {
    color:'#ddd'
  },
  lightMode: {
    color:`rgb(255,159,10)`
  },
}));