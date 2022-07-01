import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'No user id found']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'No user id found']
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: [true, 'No game id found']
    },
    rating: {
        required: true,
        type: String
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
    }
})


let Review = mongoose.model('Review', reviewSchema)

export default Review;