// src/pages/homePage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Alert, Box, Divider } from '@mui/material';
import { voteService } from '../services/api/voteService';
import { characterService } from '../services/api/characterService';
import { useAuth } from '../context/authContext';
import TotalVotesCard from '../components/vote/totalVotesCard';
import TopCharactersCard from '../components/vote/topCharactersCard';
import UserVoteCard from '../components/vote/userVoteCard';

// styles for page sections
const styles = {
  header: {
    textAlign: 'center',
    mb: 6,
    position: 'relative',
  },
  title: {
    fontWeight: 500,
    letterSpacing: 1,
  },
  divider: {
    mt: 3,
  },
};

const HomePage = () => {
  // get authenticated user details
  const { user } = useAuth();

  // store total vote count
  const [totalVotes, setTotalVotes] = useState(0);

  // store top characters
  const [topCharacters, setTopCharacters] = useState([]);

  // store user's vote details
  const [userVote, setUserVote] = useState(null);

  // handle loading state
  const [loading, setLoading] = useState(true);

  // handle error state
  const [error, setError] = useState(null);

  // fetch voting data, top characters, and user vote details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch total vote count
        const totalVotesResponse = await voteService.getTotalVoteCount();
        setTotalVotes(totalVotesResponse.data);

        // fetch top characters and character details
        const topCharactersVotesResponse = await voteService.getTopCharacters(5);
        const charactersResponse = await characterService.getAll();

        // create a map of character details
        const charactersMap = charactersResponse.data.characters.reduce((map, character) => {
          map[character.id] = character;
          return map;
        }, {});

        // combine vote data with character details
        const topCharactersWithDetails = topCharactersVotesResponse.data.map((characterVote) => {
          const character = charactersMap[characterVote.characterId];
          if (character) {
            return {
              id: character.id,
              name: character.name,
              actor: character.actor,
              voteCount: characterVote.voteCount,
            };
          }
          return null;
        }).filter(Boolean);

        setTopCharacters(topCharactersWithDetails);

        // fetch user's vote if authenticated
        if (user?.id) {
          const userVoteResponse = await voteService.getUserVote(user.id);
          if (userVoteResponse.data) {
            const userVotedCharacter = charactersMap[userVoteResponse.data.characterId];
            if (userVotedCharacter) {
              setUserVote({
                id: userVotedCharacter.id,
                name: userVotedCharacter.name,
                actor: userVotedCharacter.actor,
              });
            }
          }
        }
      } catch (err) {
        // handle fetch errors
        console.error('Failed to fetch data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        // ensure loading state is updated
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  // render a loading indicator while data is being fetched
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  // render an error message if data fetch fails
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* page header */}
        <Box sx={styles.header}>
          <Typography variant="h3" component="h1" gutterBottom sx={styles.title}>
            Voting Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            View voting statistics and top characters
          </Typography>
          <Divider sx={styles.divider} />
        </Box>

        {/* stats cards */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TotalVotesCard totalVotes={totalVotes} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TopCharactersCard topCharacters={topCharacters} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserVoteCard userVote={userVote} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
