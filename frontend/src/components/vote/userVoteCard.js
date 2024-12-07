// src/components/vote/userVoteCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { HowToVote as HowToVoteIcon } from '@mui/icons-material';

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

// component to display the user's vote with an icon and message
const UserVoteCard = ({ userVote }) => {
  return (
    <Card sx={cardStyles.root}>
      {/* card content with icon and vote status */}
      <CardContent sx={cardStyles.content}>
        {/* icon at the top of the card */}
        <HowToVoteIcon sx={cardStyles.icon} />
        <Box mt={2}>
          {/* card heading */}
          <Typography variant="h5" align="center" gutterBottom>
            Your Vote
          </Typography>
          {/* vote message */}
          {userVote ? (
            <Typography variant="body1" align="center">
              You voted for: {userVote.name}
            </Typography>
          ) : (
            <Typography variant="body1" align="center">
              You haven't voted yet. Please vote right now!
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserVoteCard;
