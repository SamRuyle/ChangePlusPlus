const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getRandomWord, scramble, currentGame, gameWinnerReset } = require('./game');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Recieves communication from the front end that the user has clicked the start button
//it fetches a random word, scrambles the current word, and puts both of them into the currentGame 
//structure
app.post('/api/start', (req, res) => {
  console.log('start');
    currentGame.currentWord = getRandomWord();
    currentGame.scrambledWord = scramble(currentGame.currentWord, 3);
    const scrambledWord = currentGame.scrambledWord;

    res.json({ message: 'New game started!', scrambledWord});
    console.log('Current Word: ' + currentGame.currentWord); //I am bad at this game
  });


//This module recieves the guess from the frontend input box
//it compares the guess to the word, and if its right, increments score and attempts and calls the reset function
//if it is wrong, it just increments the attempts. 
app.post('/api/guess', (req, res) => {
    const { guessedWord } = req.body;
    if (guessedWord.trim().toLowerCase() === currentGame.currentWord.trim().toLowerCase()) {
        currentGame.score++;
        currentGame.attempts++;
        gameWinnerReset();
        return res.json({ message: 'You won!' });
    } else {
      currentGame.attempts++;
      return res.json({ message: 'Incorrect guess, try again' });
    }
  });


//This module sends the scrambled word for use on display on the Guessing page
app.get('/api/scrambled-word', (req, res) => {
    const scrambledWord = currentGame.scrambledWord;
    res.json({ scrambledWord });
});


//This module sends the scores, attempts, and percent so we can display it on the Winner page
app.get('/api/scores', (req, res) => {
  const gameState = {
    score: currentGame.score,
    attempts: currentGame.attempts,
    percent: currentGame.percent,
  };
  res.json(gameState);
});


//port stuff. nuff said
const port = process.env.PORT || 4000
app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
   