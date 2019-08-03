import React from 'react';
import { PlayerInfoBackground, IntroButton, Glaukon, Adeimantosz, SpeakText } from '../styles/divStore';

export default ({level = 1, ...props}) => {

  return (
    <PlayerInfoBackground {...props}>
      { level === 1 && <Glaukon></Glaukon>}
      { level === 2 && <Adeimantosz></Adeimantosz>}      
      <SpeakText>{`
        1. szint 
        
        Megoldott feladatok: 2       
        Megmentett emberek száma:  3
        A barlangban eltöltött idő: 14 perc
        Elért pontok száma: 3232
      `}        
      </SpeakText>
    </PlayerInfoBackground>
  );
};