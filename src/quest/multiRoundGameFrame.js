import React, {useState, useEffect} from 'react';
import { IntroButtonHolder, IntroButton, HistoryIcon, IngameHistory } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import useMulitRoundsGameScore from './useMulitRoundsGameScore';
import ModalScore from '../layouts/ModalScore';
import noprop from '../utils/noprop';
import { showFactory } from '../utils/divFactory';
import useInterval from '../utils/useInterval';
import useTimer from './useTimer';

const [Timer, Bar] = showFactory('game-timer', 'timer-bar'); 

export default (Game, Background, isTimer = false) => ({interaction, level = 1, position}) => {
  const {questResultIs, instruction} = interaction;
  const { 
    flow, isSpeak, talking, score, gain, gainScore, 
    itsOver, playOver, checkResult, setChecking,
    handleGameReset, handleRounds, roundLeft
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
        phase = {level - roundLeft}
      />      
      <ModalScore position={position} score={gain} show={isNaN(gain)} onClick={noprop(() => gainScore(0))} />
      <ModalScore position={position} score={score} show={itsOver} onClick={noprop(handleRounds)} />
      <IntroButtonHolder>        
        {/* <IntroButton onClick={handleGameReset}>reset</IntroButton> */}
        <IntroButton onClick={() => questResultIs(false)}>később</IntroButton>
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
      <IngameHistory show={true} onClick={() => talking(!isSpeak)}/>
    </Background>
  );
};