// src/components/layout/Sidebar.jsx
import React from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Divider, styled
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  HowToVote as VoteIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

// drawer width constant
const drawerWidth = 240;

// styled drawer header component
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ open, handleDrawerClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // navigation menu items configuration
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Characters', icon: <PeopleIcon />, path: '/characters' },
    { text: 'Vote', icon: <VoteIcon />, path: '/vote' }
  ];

  // add admin option for admin users
  if (user?.role === 'admin') {
    menuItems.push({ text: 'Admin', icon: <AdminIcon />, path: '/admin' });
  }

  // drawer styles configuration
  const drawerStyles = {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  };

  return (
    <Drawer
      sx={drawerStyles}
      variant="persistent"
      anchor="left"
      open={open}
    >
      {/* drawer header with close button */}
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>

      <Divider />

      {/* navigation menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;