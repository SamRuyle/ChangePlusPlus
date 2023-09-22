import React from 'react';
import StartButton from './StartButton';
import './Welcome.css';


//Renders the welcome page, activates onStartClick when the start button is pressed,
//which changes the screen and starts the game
function Welcome(props) {
  const { onStartClick } = props;

    return (
      <div className="welcome-container">
        <h1 className="welcomeBox-text">Welcome to Sam's</h1>
        <h1 className="welcomeBox-text">Word Scramble Game!</h1>
        <StartButton className="custom-button" onStartClick={onStartClick} />
      </div>
    );
  }
  
  export default Welcome;