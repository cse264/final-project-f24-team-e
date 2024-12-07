// src/components/vote/totalVotesCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';

// style object for card layout and appearance
const cardStyles = {
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'grey.50',
    border: 1,
    borderColor: 'primary.light',
    '&:hover': {
      borderColor: 'primary.main',
      transition: 'border-color 0.3s ease',
    },
  },
  icon: {
    fontSize: 48,
    color: 'primary.main',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// component to display total votes with an icon and count
const TotalVotesCard = ({ totalVotes }) => {
  return (
    <Card sx={cardStyles.root}>
      {/* card content with icon and total votes */}
      <CardContent sx={cardStyles.content}>
        {/* icon at the top of the card */}
        <ThumbUpIcon sx={cardStyles.icon} />
        <Box mt={2}>
          {/* card heading */}
          <Typography variant="h5" align="center" gutterBottom>
            Total Votes
          </Typography>
          {/* total votes count */}
          <Typography variant="h4" align="center">
            {totalVotes}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalVotesCard;
