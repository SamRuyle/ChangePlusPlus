import React, { useEffect, useState } from 'react';
import InputBox from './InputBox';
import axios from 'axios';

function Guessing(props) {
  const [scrambledWord, setScrambledWord] = useState('');


  //fetches scrambled word from backend the when this page is rendered
  useEffect(() => {
    axios.get('http://localhost:4000/api/scrambled-word')
      .then((response) => {
        setScrambledWord(response.data.scrambledWord);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


//passes onCorrectGuess up to app.js
  function handleCorrectGuess() {
    props.onCorrectGuess();
  }


//Easy render. just some text boxes, our scrambled word which we got from the backend, and our inputbox (defined in inputbox.jsx)
    return (
      <div className="guessing-container">
        <h1 className="title-text">Scramble Time!!!</h1>
        <h2 className="instructions-text">Unscramble this:</h2>
        <div className="scrambledWord-container">
          <h1 className="scrambleWord-text">{scrambledWord}</h1>
        </div>
        <InputBox className="inputBox" onCorrectGuess={handleCorrectGuess} />
      </div>
    );
  }
  
  export default Guessing;