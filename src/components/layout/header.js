// src/components/layout/Header.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Avatar, IconButton,
  Stack, Menu, MenuItem, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/authContext';

// responsive header with drawer integration
const Header = ({ handleDrawerOpen, open }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  // menu state handlers
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  // app bar transition styles
  const appBarStyles = {
    width: open ? `calc(100% - ${240}px)` : '100%',
    ml: open ? `${240}px` : 0,
    transition: theme => theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  };

  // menu props configuration
  const menuProps = {
    slotProps: {
      paper: {
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          minWidth: 120,
        }
      }
    },
    transformOrigin: { horizontal: 'right', vertical: 'top' },
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
  };

  return (
    <AppBar position="fixed" sx={appBarStyles}>
      <Toolbar>
        {/* drawer toggle button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>

        {/* app title */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          The Office Favorites
        </Typography>

        {/* user profile section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="column" spacing={0}>
              <Typography variant="body2">{user?.name}</Typography>
              <Typography variant="caption" color="grey.300">{user?.role}</Typography>
            </Stack>
            {/* profile avatar/menu trigger */}
            <IconButton onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                src={user?.picture}
                alt={user?.name}
                sx={{ width: 40, height: 40, border: '2px solid white' }}
              />
            </IconButton>
          </Stack>
        </Box>

        {/* dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          {...menuProps}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;