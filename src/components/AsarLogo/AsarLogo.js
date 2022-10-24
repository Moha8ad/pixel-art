import React from 'react';

import asarLogoMd  from '../../assets/asar-logo-md-wt.svg';
import asarLogoLg  from '../../assets/asar-logo-lg-wt.svg';

import { Fade, Menu, MenuItem, Tooltip } from '@material-ui/core';

import useStyles from './styles';

const AsarLogo = ({ logoSize }) => {

  const classes = useStyles();

  const webAddresses = [
    {
      name: 'Pix Art Repository',
      address: 'https://bitbucket.org/moha8ad/'
    }

  ]
  
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
      <Tooltip title="Asar Web Development">
        <div className={logoSize === 'large' ? `${classes.asarLogoLg}` : logoSize === 'small' && `${classes.asarLogoSm}` }>
          <img src={logoSize === 'large' ? asarLogoLg : logoSize === 'small' && asarLogoMd } alt='asar web development' onClick={handleClick}/>
        </div>
      </Tooltip>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        placement="bottom-start"

      >
        {webAddresses.map((web, idx) =>
          <MenuItem key={idx} style={{fontSize:'.8em'}} onClick={() => window.open(web.address, "_blank")}>{web.name}</MenuItem>
        )} 
      </Menu>
    </>
  )
}

export default AsarLogo;