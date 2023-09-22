import React, { useState, useEffect } from 'react';
import StartButton from './StartButton';
import axios from 'axios';
import './Winner.css';

function Winner(props) {
  const { onStartClick } = props;
  const [gameState, setGameState] = useState({});

  //occurs whenever page is rendered, gets scores for display
  useEffect(() => {
    axios.get('http://localhost:4000/api/scores')
      .then((response) => {
        setGameState(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  //Ez render, just some text, a picture, the updated scores, and the start button
    return (
      <div className="winner-container">
        <h1 className="winner-text">Winner Winner Chicken Dinner!!!</h1>
        <img src="/chicken.jpg" alt="Chicken" />

        <p>Score: {gameState.score}</p>
        <p>Attempts: {gameState.attempts}</p>
        <p>Percent Correct: %{gameState.percent}</p>
        <StartButton className="custom-button" onStartClick={onStartClick} />
      </div>
    );
  }
  
  export default Winner;