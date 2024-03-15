import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { deepPurple } from '@mui/material/colors';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* "+" Icon Button */}
        <IconButton  color="primary" aria-label="add" size="large" sx={{ marginRight: 2 }}>
          <AddCircleIcon sx={{ fontSize: 45 }}/>
        </IconButton>

        {/* App Name */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Tasks
        </Typography>

        {/* User Photo */}
        
        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>U</Avatar> Replace 'U' with user initials or use an <img> tag for a photo */}
        
        <Tooltip title="Open settings">
              <IconButton sx>
                <Avatar alt="Sparsh" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;