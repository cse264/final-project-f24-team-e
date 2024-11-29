// src/pages/CharactersPage.js
import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { characterService } from '../services/api/characterService';
import CharacterCard from '../components/characters/characterCard';
import CharacterDetails from '../components/characters/characterDetails';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await characterService.getAll();
        setCharacters(response.data);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Characters</Typography>
      <Grid container spacing={3}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <CharacterCard
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
          </Grid>
        ))}
      </Grid>

      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          open={Boolean(selectedCharacter)}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </Container>
  );
};

export default CharactersPage;