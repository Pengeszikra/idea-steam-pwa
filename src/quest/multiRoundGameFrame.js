import React from 'react';
import { IntroButtonHolder, IntroButton } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import useMulitRoundsGameScore from './useMulitRoundsGameScore';
import ModalScore from '../layouts/ModalScore';

export default (Game, Background) => ({interaction:{questResultIs}, level = 1, position, instruction}) => {
  const { 
    flow, isSpeak, talking, score, gain, gainScore, 
    itsOver, playOver, checkResult, setChecking,
    handleGameReset, handleRounds,
  } = useMulitRoundsGameScore({level, position, questResultIs});

  return (    
    <Background>
      <Game 
        show={flow}
        playOver = {playOver}
        gainScore = {gainScore}
        setChecking = {setChecking}
        level = {level}
      />
      <ModalScore score={gain} show={isNaN(gain)} onClick={() => gainScore(0)} />
      <ModalScore score={score} show={itsOver} onClick={handleRounds} />
      <IntroButtonHolder>        
        <IntroButton onClick={handleGameReset}>reset</IntroButton>
        <IntroButton onClick={checkResult}>megoldás</IntroButton>
      </IntroButtonHolder>
      <SocratesSpeaking 
        show={isSpeak} 
        speakAbout={instruction} 
        level={level} 
        handleStopSpeak={()=> talking(false)} 
      />
    </Background>
  );
};