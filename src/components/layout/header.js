// src/components/layout/Header.jsx
import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Avatar, IconButton,
  Menu, MenuItem, useTheme, useMediaQuery, Stack,
  Divider, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // menu handlers
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
  };

  const menuProps = {
    slotProps: {
      paper: {
        elevation: 3,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          minWidth: 200,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1,
            typography: 'body2',
            borderRadius: 0.5,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          },
        }
      }
    },
    transformOrigin: { horizontal: 'right', vertical: 'top' },
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* desktop title */}
        {!isMobile && (
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The Office Favorites
          </Typography>
        )}

        {/* user info and menu button */}
        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={user?.picture}
              alt={user?.name}
              sx={{ width: 40, height: 40, border: '2px solid white' }}
            />
            {/* desktop user info */}
            {!isMobile && (
              <Stack direction="column" spacing={0}>
                <Typography variant="body2">{user?.name}</Typography>
                <Typography variant="caption" color="grey.300">{user?.role}</Typography>
              </Stack>
            )}
          </Stack>

          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          {...menuProps}
        >
          {/* mobile menu items */}
          {isMobile && (
            <>
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="subtitle2" color="primary">
                  The Office Favorites
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <MenuItem sx={{ pointerEvents: 'none' }}>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                <Stack direction="column" spacing={0}>
                  <Typography variant="body2">{user?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.role}
                  </Typography>
                </Stack>
              </MenuItem>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          {/* logout option */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;