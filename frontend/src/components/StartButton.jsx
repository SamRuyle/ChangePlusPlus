import React from 'react';
import axios from 'axios';

function StartButton(props) {
  const { onStartClick } = props;


  //This function sends the signal to start the game to the backend
  function StartClick() {
    axios.post('http://localhost:4000/api/start')
      .then((response) => {
        console.log(response.data); 
        onStartClick('Guessing');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <button className="custom-button" onClick={StartClick}>
      Start!
    </button>
  );
}

export default StartButton;