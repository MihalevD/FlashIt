import express from 'express';
import Review from '../../models/Review.js';
import mongoose from 'mongoose';
import createReviewValidator from '../validators/createReviewValidator.js';
import validateBody from '../middlewares/validateBody.js'


const reviewsRoute = express.Router()


reviewsRoute.post('/:gameId', validateBody(createReviewValidator), async (req, res) => {
    const {
        user_id,
        rating,
        description
    } = req.body;
    const {
        gameId
    } = req.params
    console.log(req.params)
    var mongoObjectId = mongoose.Types.ObjectId();
    const data = new Review({
        _id: mongoObjectId,
        user_id: user_id,
        rating: rating,
        description: description,
        game_id: gameId
    })
    try {
        await data.save();
        res.status(200).json({
            message: 'Review has been posted'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
reviewsRoute.get('/:gameId', async (req, res) => {
    const {
        gameId
    } = req.params
    console.log(gameId)
    try {
        const data = await Review.find({
            game_id: gameId
        });
        if (data.length === 0) {
            res.status(404).json({
                message: 'Reviews not found'
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
reviewsRoute.put('/:gameId/:reviewId', validateBody(createReviewValidator), async (req, res) => {
    try {
        const {
            rating,
            description
        } = req.body;
        const {
            gameId,
            reviewId
        } = req.params
        const filter = {
            _id: reviewId,
            game_id: gameId
        }
        const update = {
            rating: rating,
            description: description
        }
        const options = {
            new: true
        };

        let newReview = await Review.findOneAndUpdate(filter, update, options);
        res.send(newReview)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
reviewsRoute.delete('/:gameId/:reviewId', async (req, res) => {
    Review.findOneAndRemove({
            _id: req.params.id,
            game_id: req.params.gameId
        })
        .then(review => res.send(`${review.title} Successfully deleted`))
        .catch(err => res.json(err));
})



export default reviewsRoute;