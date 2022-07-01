import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import mongoose from 'mongoose';
import usersRoute from './controllers/userController.js'
import reviewsRoute from './controllers/reviewController.js';

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const config = dotenv.config().parsed;

const app = express();

passport.use(jwtStrategy);
app.use(passport.initialize());

const PORT = +config.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', usersRoute)
app.use('/games/:gameId/reviews', reviewsRoute)


app.listen(process.env.PORT || PORT, () => console.log(`listening on port ${PORT}`));