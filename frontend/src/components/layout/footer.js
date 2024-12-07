// simple footer component with copyright information
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      >
        © {new Date().getFullYear()} The Office Favorites. Data provided by The Office API.
      </Typography>
    </Box>
  );
};

export default Footer;