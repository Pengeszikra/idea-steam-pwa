import React from 'react';
import { PlayerInfoBackground, IntroButton, Glaukon, Adeimantosz, SpeakText, MapCloseButton } from '../styles/divStore';
import { avatarNames } from './../engine/applicationData';

export default ({level = 1, setWay, solved, saved, score, startOfPlay, ...props}) => {

  const time = (Date.now() - startOfPlay) / 60000 | 0;

  return (
    <PlayerInfoBackground {...props}>
      { level === 1 && <Glaukon></Glaukon>}
      { level === 2 && <Adeimantosz></Adeimantosz>}      
      <SpeakText>{`
        ${avatarNames(level)} :: ${level}. szint 
        
        Megoldott feladatok: ${solved}/12
        Pontok száma: ${score}
        Követők száma:  ${saved}/12
        Eltöltött idő: ${time} perc
      `}      
      </SpeakText>
      <MapCloseButton onClick={() => setWay(3)} style={{top: '20vmin'}} />
    </PlayerInfoBackground>
  );
};