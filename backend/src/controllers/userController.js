import express from 'express';
import User from '../../models/User.js';
import mongoose from 'mongoose';
import userRoleGuard from '../middlewares/userRoleGuards.js'
import {
  authMiddleware
} from '../auth/auth.middleware.js';
import createUserValidator from '../validators/createUserValidator.js';
import validateBody from '../middlewares/validateBody.js'
import {
  validateUser
} from '../services/userServices.js';
import bcrypt from 'bcryptjs'
import createToken from '../auth/create-token.js'

const usersRoute = express.Router()

// CREATE USER
usersRoute.post('/register', validateBody(createUserValidator), async (req, res) => {
  var mongoObjectId = mongoose.Types.ObjectId();
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashPassword)
  const data = new User({
    _id: mongoObjectId,
    email: req.body.email,
    password: hashPassword,
    username: req.body.username
  })

  try {
    await data.save();

    let user = User.findById(data.id)
    const token = createToken({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      email: user.email,
      role: user.role,
      applied: user.applied,
      imageURL: user.imageURl
    });
    res.status(200).json({
      token
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

//Get all USERS Method
usersRoute.get('/users', async (req, res) => {
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
usersRoute.get('/users/:userId', userRoleGuard, async (req, res) => {
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
usersRoute.put('/users/:userId', authMiddleware, async (req, res) => {
  try {
    const id = req.params.userId;
    const updatedData = req.body;
    const options = {
      new: true
    };

    console.log(id)

    const user = await User.findByIdAndUpdate(
      id, updatedData, options
    )

    if (user) {
      const token = createToken({
        id: user.id,
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        email: user.email,
        role: user.role,
        applied: user.applied,
        imageURL: user.imageURl
      });
      res.status(200).json({
        token
      });
    } else {
      res.status(401).json({
        error: 'Something went wrong!'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

//Delete USER by ID Method
usersRoute.delete('/users/:userId', async (req, res) => {
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
    const user = await validateUser(req.body);
    if (user) {
      const token = createToken({
        id: user.id,
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        email: user.email,
        role: user.role,
        applied: user.applied,
        imageURL: user.imageURL
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
  console.log(req.headers.authorization)
  const token = req.headers.authorization.replace('Bearer ', '');
  console.log('USER LOGGED OUT')
  res.status(200).json({
    message: 'You have been logged out!'
  });
});

// GET ALL APPLICANTS

usersRoute.get('/applicants', async (req, res) => {
  try {
    const data = await User.find({
      applied: true
    });
    if (data.length === 0) {
      res.status(404).json({
        message: 'Users not found'
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


export default usersRoute;