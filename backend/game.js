/* game.js
The main purpose of this file is to define some functions used
in server.js. We also define our currentGame structure
*/

//FILE TIME!!! This chunk takes the entire list of words 
//and puts it in an array
//This method might not work on files with more words, but for this
//project I think its okay. 

const fs = require('fs');
const filePath = 'english-words.csv';
let allWords = [];
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  allWords = data.split('\n');
});

//End File Time :(



    let currentGame = {
        currentWord: '',
        scrambledWord: '',
        score: 0,
        attempts: 0,
        percent: 0,
    }




//Retrieves random word from word array and returns it
function getRandomWord() {
    randomIndex = Math.floor(Math.random() * allWords.length);
    return allWords[randomIndex];
}

//Resets the current and scrambled word, and calculates percent
//called upon when user gets the word right 
function gameWinnerReset(){
    currentGame.currentWord = '';
    currentGame.scrambledWord = '';
    currentGame.percent = currentGame.score/currentGame.attempts * 100;
    currentGame.percent = currentGame.percent.toFixed(2);
}

/* scramble
Where do I start with this function?
This function takes in a word and a number of iterations and returns a scrambled word.
The scrambling works by taking in word, splitting it to an array, and then starting from the back of the word,
puts each letter into a random empty slot. The random number is between 0 and how many letters are left to place

For example: if we have our word remaining as 'hou' and our changed word as '0s0e0' (we use 0 to represent a blank spot),
the u will get picked up, a number from 0-2 will be generated (lets say 1 for our example), and then it will get placed
in the 1th empty slot, '0sue0'.

This all sounded good in my mind, but when I tried it out, I found that the first letter of the word almost always ended up in
the last slot. I think this is a weird probability thing that I just don't understand, but it could also just be a bug in my code 
that I just cannot find. Might show my algorithms professor this code and ask for her opinion.

The good news is, while the last letter of the scrabled word is, most of the time, the first letter of the unscrabled word, 
the first letter is usually pretty random. So if we scramble it a few times, it should be a lot more random where all the letters
end up. So I just made my function recursive and made it do it 3 times in my original functional call. This seems to work well. 
*/
function scramble(word, iter){
    if(iter === 0){
        return word;
    }
    let wordArray = word.split('');
    let wordLength = wordArray.length;
    let wordArrayChange = Array(wordLength).fill(0);
        for(let i = wordLength - 1; i >= 0; i--){
            let place = Math.floor(Math.random()*i);
            let emptySlots = 0;
            for(let j = 0; j < wordLength; j++){
                if(wordArrayChange[j] === 0){
                    if(emptySlots === place){
                        wordArrayChange[j] = wordArray[i];
                        break;
                    }
                    emptySlots++;
                }
            }
        }
    return scramble(wordArrayChange.join(''), iter-1);
}

//export the things we need so we can use them in server.js
module.exports = {
    currentGame,
    getRandomWord,
    scramble,
    gameWinnerReset,
  };