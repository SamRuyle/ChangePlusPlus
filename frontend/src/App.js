/*
The heart of my frontend
For this project, I decided to have 3 screens that would switch to each other based on the state. 
This file also manages the state of the program. 

We start on the welcome screen. then, if the start button is pressed, we go to the guessing screen.
On the guessing screen, if we guess right, then we go to the winner screen. if we guess wrong, nothing happens
On the winner screen, if we clicked the start button, the we go to the guessing screen

The way I have set this up it made it very easy to define only 2 states and to know which elements should be on 
the screen during which state. I was able to make 3 main components, Welcome, Guessing, and Winner, and switch
between them when the states change. This made it very easy to stylelize them to my liking and keep track
of which components went on screen. 

I used 'props' to pass things such as onCorrectGuess and onStartClick from my components to this function
*/


import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Guessing from './components/Guessing';
import Winner from './components/Winner';

function App() {
  const [activeView, setActiveView] = useState('Welcome');
  const [gameInProgress, setGameInProgress] = useState(false);


  // Render the active view based on the state
  let viewToRender;
  if (activeView === 'Welcome') {
    viewToRender = <Welcome onStartClick={() => {
      setActiveView('Guessing');
      setGameInProgress(true);
    }}/>;
  } else if (activeView === 'Guessing') {
    viewToRender = <Guessing onCorrectGuess={() => {
      setActiveView('Winner');
      setGameInProgress(false); 
    }}/>;
  } else if (activeView === 'Winner') {
    viewToRender = <Winner onStartClick={() => {
      setActiveView('Guessing');
      setGameInProgress(true);
    }}/>;
  }


  //All we need to render this puppy. cool
  return (
    <div>
      {viewToRender}
    </div>
  );
}


export default App;
