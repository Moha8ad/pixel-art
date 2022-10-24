import * as React from 'react';

import * as htmlToImage from 'html-to-image';

import { MenuItem, Menu, Fade, Tooltip, IconButton } from '@material-ui/core';
import { ArrowDownwardRounded } from '@material-ui/icons';


// download Image Menu: add a format to formats array in order to create a new download item 
// and then do other relevent configs according to the guidelines below 
const DownloadImage = () => {

  const formats = ['png','jpg']

  //downloads pixel grid based on the selected format
  const downloadImage = async (format) => {
    
    //if a new format is added: 
    // 1- create a dataUrl for it
    // 2- change the link.href condition relatively
    const pngDataUrl = await htmlToImage.toPng(document.getElementById('pixelArtToDownload'));
    const jpgDataUrl = await htmlToImage.toJpeg(document.getElementById('pixelArtToDownload'));

    const link = document.createElement('a');

    // default download file name
    link.download = `pixelArt.${format}`;
    
    // conditional download based on the chosen format
    // if a new format is added, change the condition relatively
    link.href = format === 'jpg' ? jpgDataUrl : format === 'png' && pngDataUrl;
    link.click();
  }
  
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
      <Tooltip title="Download" placement="top">
        <IconButton size='small' onClick={handleClick} style={{color: `rgb(10,132,255)`, padding: '4px', margin: '4px'}}>
          <ArrowDownwardRounded 
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          />
        </IconButton>
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
      >
        {formats.map((format, idx) =>
          <MenuItem key={idx} style={{fontSize:'.8em'}} onClick={() => downloadImage(format)}>{format.toUpperCase()}</MenuItem>
        )} 
      </Menu>
    </>
  );
}
export default DownloadImage;