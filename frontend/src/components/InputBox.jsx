import React, { useState } from 'react';
import axios from 'axios';
import './Guessing.css';

function InputBox(props) {
  const [guess, setInputValue] = useState('');

  //This function changes our guess variable to whatever is currently in the guessing box
  //updates whenever a letter is added or deleted
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  //This function sends the guess to the backend whenever we press submit; 
  //It is also in charge of reciving the winner message back, and calling the handleCorrectGuess function
  function handleSubmit(event) {
    event.preventDefault(); 
    axios.post('http://localhost:4000/api/guess', { guessedWord: guess })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'You won!') {
          handleCorrectGuess();
        }
      })
      .catch((error) => {
        console.error(error);
      });
      setInputValue('');
  }

  //I don't think I really needed these functions, but it felt like good style to me to isolate props functions
  function handleCorrectGuess() {
    props.onCorrectGuess();
  }

  //Render with input box
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="inputBox"
          type="text"
          placeholder="Guess"
          value={guess}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default InputBox;