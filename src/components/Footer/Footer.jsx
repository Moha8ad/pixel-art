import React from 'react';
import AsarLogo from '../AsarLogo/AsarLogo';

import useStyle from './styles';

const Footer = () => {

    const classes = useStyle();

  return (
    <div className={classes.footer}>
        <AsarLogo logoSize={'large'}/>    
    </div>
  )
}

export default Footer