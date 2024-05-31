const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://patrickdasilva758:Ky7OPXhWrp63Qg50@cluster0.9z6koi2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

app.use(cors());
app.use(bodyParser.json());

// Route to get scores
app.get('/scores', async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(5);
    res.json(scores);
});

// Route to add a score
app.post('/scores', async (req, res) => {
    const { name, score } = req.body;
    const newScore = new Score({ name, score });
    await newScore.save();
    res.json(newScore);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
