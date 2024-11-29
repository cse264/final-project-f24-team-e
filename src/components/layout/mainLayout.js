// src/components/layout/MainLayout.jsx
import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';

// width of the sidebar drawer
const drawerWidth = 240;

// styled main content area with drawer integration
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

// spacer for header height consistency
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MainLayout = () => {
  // drawer state management
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* app header with drawer controls */}
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />

      {/* navigation sidebar */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

      {/* main content area */}
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Main>
    </Box>
  );
};

export default MainLayout;