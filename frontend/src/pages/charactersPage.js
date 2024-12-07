// src/pages/charactersPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  Divider
} from '@mui/material';
import { characterService } from '../services/api/characterService';
import CharacterCard from '../components/characters/characterCard';
import CharacterDetails from '../components/characters/characterDetails';

// styles for page sections
const styles = {
    header: {
        textAlign: 'center',
        mb: 6,
        position: 'relative'
    },
    title: {
        fontWeight: 500,
        letterSpacing: 1
    },
    gridItem: {
        display: 'flex',
        height: '100%'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        pb: 2
    }
};

// main page component for displaying character list
const CharactersPage = () => {
  // state management
  const [characters, setCharacters] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch characters on mount and page change
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await characterService.getAll(currentPage);
        setCharacters(response.data.characters);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setError(error.message || 'Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  // handlers
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // scroll to top on page change
  };

  // loading state
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  // error state
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // main render
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* page header */}
        <Box sx={styles.header}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={styles.title}
          >
            Characters
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Discover {pagination?.totalCount || 0} characters from The Office
          </Typography>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* character grid */}
        <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'stretch' }}>
          {characters.map(character => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={character.id}
              sx={styles.gridItem}
            >
              <Box sx={{ width: '100%', height: '100%' }}>
                <CharacterCard
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* pagination */}
        {pagination && (
          <Box sx={styles.pagination}>
            <Pagination
              count={pagination.pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size="large"
            />
          </Box>
        )}

        {/* character details modal */}
        {selectedCharacter && (
          <CharacterDetails
            character={selectedCharacter}
            open={Boolean(selectedCharacter)}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </Box>
    </Container>
  );
};

export default CharactersPage;