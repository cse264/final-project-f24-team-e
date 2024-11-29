// src/components/vote/topCharactersCard.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    pt: 3,
  },
  list: {
    width: '100%',
    mt: 2,
  },
};

// component to display top characters with their names, actors, and votes
const TopCharactersCard = ({ topCharacters }) => {
  return (
    <Card sx={cardStyles.root}>
      {/* card content with icon and header */}
      <CardContent sx={cardStyles.content}>
        {/* icon at the top of the card */}
        <PersonIcon sx={cardStyles.icon} />
        <Box mt={2}>
          {/* card header */}
          <Typography variant="h5" align="center" gutterBottom>
            Top Characters
          </Typography>
        </Box>
        {/* list of top characters */}
        <List sx={cardStyles.list}>
          {topCharacters.map((character, index) => (
            <ListItem key={character.id} disableGutters>
              {/* character name and actor */}
              <ListItemText
                primary={
                  <Typography variant="body1">
                    {`${index + 1}. ${character.name}`}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    Played by {character.actor}
                  </Typography>
                }
              />
              {/* character vote count */}
              <Typography variant="body2" color="text.secondary">
                Votes: {character.voteCount}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopCharactersCard;
