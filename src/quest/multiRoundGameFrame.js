import React, {useState, useEffect} from 'react';
import { IntroButtonHolder, IntroButton } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import useMulitRoundsGameScore from './useMulitRoundsGameScore';
import ModalScore from '../layouts/ModalScore';
import noprop from '../utils/noprop';
import { showFactory } from '../utils/divFactory';
import useInterval from '../utils/useInterval';
import useTimer from './useTimer';

const [Timer, Bar] = showFactory('game-timer', 'timer-bar'); 

export default (Game, Background, isTimer = false) => ({interaction:{questResultIs}, level = 1, position, instruction}) => {
  const { 
    flow, isSpeak, talking, score, gain, gainScore, 
    itsOver, playOver, checkResult, setChecking,
    handleGameReset, handleRounds,
  } = useMulitRoundsGameScore({level, position, questResultIs});

  const timeLeft = isTimer ? useTimer(gainScore, questResultIs, gain, itsOver) : false;
  
  return (    
    <Background>
      <Game 
        show={flow}
        playOver = {playOver}
        gainScore = {gainScore}
        setChecking = {setChecking}
        level = {level}
      />
      <ModalScore score={gain} show={isNaN(gain)} onClick={noprop(() => gainScore(0))} />
      <ModalScore score={score} show={itsOver} onClick={noprop(handleRounds)} />
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
      <Timer show={timeLeft}>
        <Bar show={true} style={{width:`calc(${timeLeft}vmin * 98)`}} />
      </Timer>
    </Background>
  );
};