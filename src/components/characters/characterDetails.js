import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Chip
} from '@mui/material';

const CharacterDetails = ({ character, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {character.name}
        <Typography variant="subtitle1" color="text.secondary">
          Played by {character.actor}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <div>
            <Typography variant="subtitle2" gutterBottom>Jobs:</Typography>
            <List dense>
              {character.job.map((job, index) => (
                <ListItem key={index}>
                  <ListItemText primary={job} />
                </ListItem>
              ))}
            </List>
          </div>

          <div>
            <Typography variant="subtitle2" gutterBottom>Workplaces:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {character.workplace.map((place, index) => (
                <Chip key={index} label={place} />
              ))}
            </Stack>
          </div>

          <div>
            <Typography variant="subtitle2" gutterBottom>Appearances:</Typography>
            <Typography variant="body2">
              First: {character.firstAppearance}<br />
              Last: {character.lastAppearance}
            </Typography>
          </div>

          {character.marital && (
            <Typography variant="body2">
              Marital Status: {character.marital}
            </Typography>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDetails;