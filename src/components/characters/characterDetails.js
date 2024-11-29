// src/components/characters/characterDetails.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  Chip,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

// styles for dialog and content sections
const dialogStyles = {
    paper: {
        elevation: 5,
        sx: {
            borderRadius: 2,
            bgcolor: 'background.paper'
        }
    },
    title: {
        pb: 2,
        pr: 6,
        borderBottom: 1,
        borderColor: 'divider'
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'text.secondary'
    }
};

// modal component displaying detailed character information
const CharacterDetails = ({ character, open, onClose }) => {
    return (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        PaperProps={dialogStyles.paper}
    >
        {/* header section with character name and basic info */}
        <DialogTitle sx={dialogStyles.title}>
        <Typography variant="h5" component="div" gutterBottom>
            {character.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Played by {character.actor}
        </Typography>
        {character.gender && (
            <Typography variant="body2" color="text.secondary">
                {character.gender}
            </Typography>
        )}
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={dialogStyles.closeButton}
        >
            <CloseIcon />
        </IconButton>
        </DialogTitle>

        {/* content sections with character details */}
        <DialogContent sx={{ p: 0 }}>
        <Stack divider={<Divider />}>
            {/* jobs section */}
            {character.job.length > 0 && (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Jobs</Typography>
                <List dense>
                {character.job.map((job, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemText
                            primary={job}
                            primaryTypographyProps={{ variant: 'body1' }}
                        />
                    </ListItem>
                ))}
                </List>
            </Box>
            )}

            {/* workplaces section */}
            {character.workplace.length > 0 && (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Workplaces</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {character.workplace.map((place, index) => (
                    <Chip
                    key={index}
                    label={place}
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                    />
                ))}
                </Stack>
            </Box>
            )}

            {/* appearances section */}
            <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Appearances</Typography>
            <Stack spacing={1}>
                <Typography variant="body1">
                First: {character.firstAppearance}
                </Typography>
                <Typography variant="body1">
                Last: {character.lastAppearance}
                </Typography>
            </Stack>
            </Box>

            {/* marital status section */}
            {character.marital && (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Marital Status</Typography>
                <Typography variant="body1">{character.marital}</Typography>
            </Box>
            )}

            {/* episodes accordion section */}
            {character.episodes && character.episodes.length > 0 && (
            <Accordion elevation={0} sx={{ '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
                <Typography variant="h6">
                    Episodes ({character.episodes.length})
                </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                <List dense>
                    {character.episodes.map((episode, index) => (
                    <ListItem
                        key={index}
                        sx={{
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        py: 1
                        }}
                    >
                        <ListItemText
                        primary={episode.episode.title}
                        secondary={`Episode ${episode.episode.id}`}
                        primaryTypographyProps={{ variant: 'body1' }}
                        />
                    </ListItem>
                    ))}
                </List>
                </AccordionDetails>
            </Accordion>
            )}
        </Stack>
        </DialogContent>
    </Dialog>
    );
};

export default CharacterDetails;