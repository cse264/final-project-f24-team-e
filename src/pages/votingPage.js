// src/pages/votingPage.js
import React, { useState, useEffect } from 'react';
import {
 Container,
 Grid,
 Typography,
 CircularProgress,
 Alert,
 Box,
 Pagination,
 Divider,
 Snackbar
} from '@mui/material';
import { characterService } from '../services/api/characterService';
import { voteService } from '../services/api/voteService';
import VoteCard from '../components/vote/voteCard';
import { useAuth } from '../context/authContext';

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
 },
 infoAlert: {
   maxWidth: '600px',
   mx: 'auto',
   mb: 2
 }
};

// main page component for voting functionality
const VotingPage = () => {
 // state management
 const { user } = useAuth();
 const [characters, setCharacters] = useState([]);
 const [pagination, setPagination] = useState(null);
 const [votes, setVotes] = useState({});
 const [userVote, setUserVote] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [currentPage, setCurrentPage] = useState(1);
 const [snackbar, setSnackbar] = useState({ open: false, message: '' });

 // fetch data on mount and page change
 useEffect(() => {
   const fetchData = async () => {
     try {
       setLoading(true);
       // fetch characters with pagination
       const charactersResponse = await characterService.getAll(currentPage);
       setCharacters(charactersResponse.data.characters);
       setPagination(charactersResponse.data.pagination);

       // fetch vote counts
       const votesResponse = await voteService.getVoteCounts();
       setVotes(votesResponse.data);

       // fetch user's current vote if logged in
       if (user?._id) {
         const userVoteResponse = await voteService.getUserVote(user._id);
         if (userVoteResponse.data) {
           const votedCharacter = charactersResponse.data.characters.find(
             c => c.id === userVoteResponse.data.characterId
           );
           setUserVote(votedCharacter);
         }
       }
     } catch (err) {
       console.error('Failed to fetch data:', err);
       setError(err.message || 'Failed to load voting data');
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, [currentPage, user?._id]);

 // handlers
 const handlePageChange = (event, newPage) => {
   setCurrentPage(newPage);
   window.scrollTo(0, 0); // scroll to top on page change
 };

 // Add a new function to handle vote removal
const handleRemoveVote = async (characterId) => {
  try {
    await voteService.removeVote(user._id);

    // refresh vote counts
    const votesResponse = await voteService.getVoteCounts();
    setVotes(votesResponse.data);

    // clear user's current vote
    setUserVote(null);

    setSnackbar({ open: true, message: 'Vote removed successfully!' });
  } catch (error) {
    console.error('Vote removal failed:', error);
    setSnackbar({
      open: true,
      message: error.message || 'Failed to remove vote. Please try again.'
    });
  }
};

 const handleVote = async (characterId) => {
   try {
     await voteService.vote(user._id, characterId);

     // refresh vote counts
     const votesResponse = await voteService.getVoteCounts();
     setVotes(votesResponse.data);

     // update user's current vote
     const votedCharacter = characters.find(c => c.id === characterId);
     setUserVote(votedCharacter);

     setSnackbar({ open: true, message: 'Vote recorded successfully!' });
   } catch (error) {
     console.error('Voting failed:', error);
     setSnackbar({
       open: true,
       message: error.message || 'Failed to record vote. Please try again.'
     });
   }
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
           Vote
         </Typography>
         <Typography
           variant="subtitle1"
           color="text.secondary"
           sx={{ mb: 2 }}
         >
           Discover and vote for your favorite character from The Office
         </Typography>
         {userVote && (
           <Alert severity="info" sx={styles.infoAlert}>
             You currently voted for: {userVote.name}
           </Alert>
         )}
         <Divider sx={{ mt: 3 }} />
       </Box>

       {/* voting grid */}
       <Grid
         container
         spacing={3}
         sx={{ display: 'flex', alignItems: 'stretch' }}
       >
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
               <VoteCard
                character={character}
                voteCount={votes[character.id] || 0}
                hasVoted={userVote?.id === character.id}
                onVote={() => handleVote(character.id)}
                onRemoveVote={() => handleRemoveVote(character.id)}
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

       {/* notifications */}
       <Snackbar
         open={snackbar.open}
         autoHideDuration={3000}
         onClose={() => setSnackbar({ ...snackbar, open: false })}
         message={snackbar.message}
       />
     </Box>
   </Container>
 );
};

export default VotingPage;