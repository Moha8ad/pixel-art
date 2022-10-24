import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import Footer from '../components/Footer/Footer';

import useStyles from './styles';

const App = (props) => {

  const toggleDarkMode = useSelector(state => state.pixelDB.toggleDarkMode)
  const classes = useStyles(props={toggleDarkMode});

  return (
    // main container of the whole page
    <div className={classes.mainContainer}>
      {/* Navbar component will be displayed always */}
      <Navbar />
      {/* All other components will be structured and displayed within Home component*/}
      <Home />
      {/* Logo will appear in this component */}
      <Footer />
    </div>   
  ); 
};

export default App;