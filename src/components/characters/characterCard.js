// src/components/characters/CharacterCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Stack,
  Avatar
} from '@mui/material';

const CharacterCard = ({ character }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {character.name[0]}
          </Avatar>
        }
        title={character.name}
        subheader={character.actor}
      />
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {character.job[0]}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {character.workplace.map((place, index) => (
              <Chip
                key={index}
                label={place}
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
          <Typography variant="caption" color="text.secondary">
            First appearance: {character.firstAppearance}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;