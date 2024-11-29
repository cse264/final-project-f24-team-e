import React from 'react';
import {
 Card,
 CardContent,
 Typography,
 Box,
 Button,
 Avatar,
 Stack
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// component props:
// character: character data object
// voteCount: number of votes for this character
// hasVoted: boolean indicating if user voted for this character
// onVote: callback function for voting
// onRemoveVote: callback function for removing vote
const VoteCard = ({ character, voteCount, hasVoted, onVote, onRemoveVote }) => {
 return (
   <Card
     elevation={1}
     sx={{
       height: '100%',
       display: 'flex',
       flexDirection: 'column',
       bgcolor: 'grey.50',
       border: 1,
       // highlight border if user has voted for this character
       borderColor: hasVoted ? 'primary.main' : 'primary.light',
       '&:hover': {
         borderColor: 'primary.main',
         transition: 'border-color 0.3s ease'
       }
     }}
   >
     <CardContent
       sx={{
         flexGrow: 1,
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'space-between'
       }}
     >
       <Stack spacing={2} alignItems="center">
         {/* character avatar with first letter */}
         <Avatar
           sx={{
             bgcolor: 'primary.main',
             width: 50,
             height: 50,
             fontSize: '1.5rem'
           }}
         >
           {character.name[0]}
         </Avatar>

         {/* character name and actor */}
         <Box textAlign="center">
           <Typography variant="h6">
             {character.name}
           </Typography>
           <Typography variant="subtitle2" color="text.secondary">
             {character.actor}
           </Typography>
         </Box>

         {/* first appearance info */}
         <Typography variant="body2" color="text.secondary">
           First appearance: {character.firstAppearance}
         </Typography>

         {/* vote count display */}
         <Box textAlign="center">
           <Typography variant="h4" color="primary.main" gutterBottom>
             {voteCount}
           </Typography>
           <Typography variant="caption" color="text.secondary">
             votes
           </Typography>
         </Box>

         {/* voting buttons - shows remove option if already voted */}
         {hasVoted ? (
           <Stack spacing={1} width="100%">
             <Button
               variant="contained"
               onClick={onRemoveVote}
               startIcon={<DoNotDisturbAltIcon />}
               color="error"
               fullWidth
               sx={{
                 '&:hover': {
                   variant: 'outlined',
                   bgcolor: 'transparent',
                   color: 'error.main',
                   border: '1px solid'
                 }
               }}
             >
               Remove Vote
             </Button>
           </Stack>
         ) : (
           <Button
             variant="contained"
             onClick={onVote}
             startIcon={<HowToVoteIcon />}
             fullWidth
             sx={{
               '&:hover': {
                 variant: 'outlined',
                 bgcolor: 'transparent',
                 color: 'primary.main',
                 border: '1px solid'
               }
             }}
           >
             Vote
           </Button>
         )}
       </Stack>
     </CardContent>
   </Card>
 );
};

export default VoteCard;