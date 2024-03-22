import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../AuthContext';

function Header({onAddTaskClick}) {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth(); // Assuming your AuthContext provides a logout function

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the UserProfile page
    handleClose();
  };

  const handleLogout = () => {
    logout(); // Perform logout operation
    navigate('/'); // Optionally navigate to the home page or login page
    handleClose();
  };


  const handleAvatarClick = () => {
    navigate('/profile'); // Path to UserProfile page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* "+" Icon Button */}
        <IconButton  color="white" aria-label="add" size="large" onClick={onAddTaskClick}>
          <AddCircleIcon sx={{ fontSize: 45 }}/>
        </IconButton>

        {/* App Name */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Tasks
        </Typography>

        {/* User Photo */}
        
        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>U</Avatar> Replace 'U' with user initials or use an <img> tag for a photo */}
        
        {/* <Tooltip title="Open Profile">
              <IconButton onClick={handleAvatarClick}  sx={{ marginLeft: 'auto' }}>
                <Avatar alt="Sparsh" src="/static/images/avatar/2.jpg" />
              </IconButton>
        </Tooltip> */}
        <IconButton onClick={handleMenu}  sx={{ marginLeft: 'auto' }}>
            <Avatar alt="Sparsh" src="/avatar.png" />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;