const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../db/mongoCli');
const { ObjectId } = require('mongodb');

// METHOD GET FOR every single vote in the database
router.get('/', async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db('Office');
  const voteCollection = db.collection('vote');

  // so the frontend wanted it to be able to get a single vote by userId
  // so i added functionality to do that
  try {
    const userId = req.query.userId;
    
    // check if userId is provided, if so return user's vote
    // THIS SI IMPORTANT SO THAT YOU CAN GET THE ID OF THE SPECIFIC VOTE FROM A SPECIFIC USER
    // JUST INCASE THE USER WANTS TO UPDATE OR DELETE THEIR VOTE
    if (userId) {
      const userVote = await voteCollection.findOne({ userId: new ObjectId(userId) });
      return res.json(userVote ? [userVote] : []);
    }
    
    // IF ITS NOT A SPECIFIC USER RETURN ALL VOTES 
    const votes = await voteCollection.find({}).toArray();
    res.json(votes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// METHOD POST FOR casting a new vote
router.post('/', async (req, res) => {
  const { userId, characterId, timestamp } = req.body;
  
  const client = await connectToMongoDB();
  const db = client.db('Office');
  const voteCollection = db.collection('vote');

  try {
    const newVote = {
      userId: new ObjectId(userId),
      characterId: parseInt(characterId),
      timestamp: new Date(timestamp)
    };

    const result = await voteCollection.insertOne(newVote);
    res.status(201).json({ ...newVote, id: result.insertedId });
  } catch (error) {
    console.error('Error creating vote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// METHOD DELETE FOR deleting a vote
// we delete by id and not userId because thats how we decided to do it in the frontend
// but both would work altough deleting by ID would be faster(i think)
router.delete('/:id', async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db('Office');
  const voteCollection = db.collection('vote');

  try {
    const result = await voteCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Vote not found' });
    }

    res.json({ message: 'Vote removed successfully' });
  } catch (error) {
    console.error('Error deleting vote:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

module.exports = router;