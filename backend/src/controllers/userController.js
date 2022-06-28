import express from 'express';
import User from '../../models/User';
import mongoose from 'mongoose';
import userRoleGuard from '../middlewares/userRoleGuards'
import {
  authMiddleware
} from '../auth/auth.middleware';
import createUserValidator from '../validators/createUserValidator';

const router = express.Router()

// CREATE USER
router.post('/users', validateBody(createUserValidator), async (req, res) => {
  var mongoObjectId = mongoose.Types.ObjectId();
  const data = new User({
    _id: mongoObjectId,
    name: req.body.name,
    age: req.body.age,
    pass: req.body.pass,
    username: req.body.username
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

//Get all USERS Method
router.get('/users', async (req, res) => {
  try {
    const data = await User.find();
    if (data.length === 0) {
      res.status(404).json({
        message: 'User not found'
      })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

//Get USER by ID Method
router.get('/users/:userId', userRoleGuard, async (req, res) => {
  try {
    const data = await User.findById(req.params.userId);
    res.json(data)
  } catch (error) {
    res.status(404).json({
      message: 'User with that ID does not exist'
    })
  }
})

//Update USER by ID Method
router.put('/users/:userId', authMiddleware, async (req, res) => {
  try {
    const id = req.params.userId;
    const updatedData = req.body;
    const options = {
      new: true
    };

    const result = await User.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

//Delete USER by ID Method
router.delete('/users/:userId', async (req, res) => {
  try {
    const id = req.params.userId;
    const data = await User.findByIdAndDelete(id)
    res.send(`User with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})


// LOGIN
usersRoute.post('/login', async (req, res) => {
  try {
    const user = await validateUser(usersData)(req.body);

    if (user) {
      const token = createToken({
        id: user.id,
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        token
      });
    } else {
      res.status(401).json({
        error: 'Invalid credentials!'
      });
    }
  } catch (error) {
    res.status(401).json({
      error: error.message
    });
  }
});
//LOGOUT
usersRoute.delete('/logout', async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  await blacklistToken(tokenData)(token);
  res.status(200).json({
    message: 'You have been logged out!'
  });
});

module.exports = router;