const express = require('express');
const router = express.Router();
const connectToMongoDB = require('../db/mongoCli');
const { ObjectId } = require('mongodb');

// METHOD GET FOR every single user in the database
router.get('/', async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db('Office');
  const userCollection = db.collection('users');

  try {
    const email = req.query.email;
    
    // check email and return users with that email, this also returns the id of the user
    // which could be used to get the user's vote or user role information
    if (email) {
      const users = await userCollection.find({ email }).toArray();
      return res.json(users);
    }
    
    // if no email is sent by the frontend then return all users
    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// METHOD POST FOR creating a new user
router.post('/', async (req, res) => {
  const { email, name, role } = req.body;
  
  // check if email and name are sent by the frontend
  // if we had a situation where the frontend wasnt sending just the name and it would break everything
  if (!email || !name) {
    return res.status(400).json({ 
      error: 'Validation Error',
      details: {
        email: !email ? 'Email is required' : null,
        name: !name ? 'Name is required' : null
      }
    });
  }

  const client = await connectToMongoDB();
  const db = client.db('Office');
  const userCollection = db.collection('users');

  try {
    // see if user is already in the database
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // if not then add them
    // roles are either user or admin, but by default it will be user if one is not sent by the frontend
    const newUser = {
      email,
      name,
      role: role || 'user'
    };

    const result = await userCollection.insertOne(newUser);
    res.status(201).json({ ...newUser, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});


// PUT for updating a user
// this is used when an admin wants to update some other user to admin
router.put('/:id', async (req, res) => {
    const { email, name, role } = req.body;
    
    const client = await connectToMongoDB();
    const db = client.db('Office');
    const userCollection = db.collection('users');
    
    try {
        const result = await userCollection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
                { 
                    $set: {
                    email,
                    name,
                    role
                    }
                },
        { returnDocument: 'after' }
        );
    
        if (!result) { //if user is not found return error 404 
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.json(result);
        } catch (error) {
        console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } finally {
            await client.close();
        }
    });

module.exports = router;
