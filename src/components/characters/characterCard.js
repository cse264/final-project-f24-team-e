// src/components/characters/characterCard.jsx
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button,
  Box
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// styles for card components
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
            transition: 'border-color 0.3s ease'
        }
    },
    avatar: {
        bgcolor: 'primary.main',
        width: 50,
        height: 50,
        fontSize: '1.5rem'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        '&:hover': {
            variant: 'outlined',
            bgcolor: 'transparent',
            color: 'primary.main',
            border: 1,
            borderColor: 'primary.main'
        },
        transition: 'all 0.3s ease'
    }
};

// character card component displaying basic character info
const CharacterCard = ({ character, onClick }) => {
    return (
        <Card elevation={1} sx={cardStyles.root}>
            {/* character header with avatar and name */}
            <CardHeader
            avatar={
                <Avatar sx={cardStyles.avatar}>
                {character.name[0]}
                </Avatar>
            }
            title={
                <Typography variant="h6" component="div">
                {character.name}
                </Typography>
            }
            subheader={
                <Typography variant="subtitle2" color="text.secondary">
                {character.actor}
                </Typography>
            }
            />

            {/* card content with appearance info and action button */}
            <CardContent sx={cardStyles.content}>
            <Typography variant="body2" color="text.secondary">
                First appearance: {character.firstAppearance}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    size="medium"
                    endIcon={<InfoOutlinedIcon />}
                    onClick={onClick}
                    sx={cardStyles.button}
                >
                    View Details
                </Button>
            </Box>
            </CardContent>
        </Card>
    );
};

export default CharacterCard;