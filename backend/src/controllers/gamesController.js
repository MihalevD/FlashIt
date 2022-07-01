import express from 'express';
import Game from '../../models/Game.js';
const gamesRoute = express.Router()


gamesRoute.post('/', async (req, res) => {
    const {
        name,
        imageURL
    } = req.body;
    var mongoObjectId = mongoose.Types.ObjectId();
    const data = new Game({
        _id: mongoObjectId,
        name: name,
        imageURL: imageURL,
    })
    try {
        await data.save();
        res.status(200).json({
            message: 'Game has been posted'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
gamesRoute.get('/', async (req, res) => {
    try {
        const data = await Game.findAll();
        if (data.length === 0) {
            res.status(404).json({
                message: 'Games not found'
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
gamesRoute.get('/:gameId', async (req, res) => {
    const {
        gameId
    } = req.params
    try {
        const data = await Game.findOne({
            _id: gameId
        });
        if (data.length === 0) {
            res.status(404).json({
                message: 'Game not found'
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
gamesRoute.put('/:gameId', async (req, res) => {
    try {
        const {
            name,
            imageURL
        } = req.body;
        const update = {
            name,
            imageURL
        }
        const filter = {
            _id: gameId
        }
        const options = {
            new: true
        };

        let newGame = await Game.findOneAndUpdate(filter, update, options);
        res.send(newGame)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
gamesRoute.delete('/:gameId', async (req, res) => {
    Game.findOneAndRemove({
            _id: req.params.gameId,
        })
        .then(game => res.send(`${game.name} Successfully deleted`))
        .catch(err => res.json(err));
})
export default gamesRoute;