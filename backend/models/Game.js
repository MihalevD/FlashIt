import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    imageURL: {
        type: String,
        required: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
    }
})


// gameSchema.path('imageURL').validate((val) => {
//     urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
//     return urlRegex.test(val);
// }, 'Invalid URL.');

let Game = mongoose.model('Game', gameSchema)

export default Game;