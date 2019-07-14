import React, { useState } from 'react';
import { QuestSketch, IntroButtonHolder, IntroButton, ModalHolder, SmallTable } from '../styles/divStore';
import ThreeArea from '../layouts/ThreeArea';
import showtime from '../utils/showtime';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

import { usePipeWhen } from '../utils/usePipe';
import {forEach, interval, map, filter, take, pipe} from 'callbag-basics';
import {fromEvent, fromIter, combine, merge, flatten, concat, share} from 'callbag-basics';
import { animationFrames } from 'callbag-animation-frames';
import pairProjection3dContent from './pairProjection3dContent';

const ThreeInteraction = showtime(ThreeArea);

const ModalScore = showtime(
  ({score, ...props}) => (
    <ModalHolder {...props}>
      <SmallTable>{isNaN(score) ? score : `Score: ${score}`}</SmallTable>
    </ModalHolder>
  )
);

export default ({interaction:{questResultIs}, level = 1, position}) => {
  const [flow, setFlow] = useState(true);
  const [isSpeak, talking] = useState(false);
  const [score, setScore] = useState(0);
  const [gain, gainScore] = useState(0);
  const [itsOver, playOver] = useState(false);
  const [checkResult, setChecking] = useState(() => () => {});
  const [roundLeft, setRounds] = useState(level);

  usePipeWhen (itsOver) ( 
    interval(20), 
    take(gain),
    forEach(n => setScore(s => s + 1)),
  );

  const handleGameReset = () => {
    gainScore(0);
    setFlow(f=>!f);
    playOver(false);        
  };

  const handleRounds = () => {
    if (roundLeft > 0) {
      playOver(false);
      setRounds(round => round - 1);
      pipe(
        interval(1), 
        take(2),
        forEach(() => setFlow(f=>!f))
      );
    }  else {
      setFlow(false);
      questResultIs(true, position);
    } 
  };

  return (
    <QuestSketch>
      <ThreeInteraction 
        show={flow} 
        add3DContent={pairProjection3dContent({playOver, gainScore, setChecking})} 
        orthographic        
      />      
      <ModalScore score={gain} show={isNaN(gain)} onClick={() => gainScore(0)} />
      <ModalScore score={score} show={itsOver} onClick={handleRounds} />
      <IntroButtonHolder>        
        <IntroButton onClick={handleGameReset}>reset</IntroButton>
        <IntroButton onClick={e => checkResult()}>megoldás</IntroButton>
      </IntroButtonHolder>
      <SocratesSpeaking show={isSpeak} speakAbout={'Teszt szovge ami igen hosszu mondanivalot is tratalmazhat igy mar mindjart jobb a lenyzo fekvese, azert az elegge para, hogy ettol fugg a Socrates megjelenese'} level={1} handleStopSpeak={()=> talking(false)} />
    </QuestSketch>
  );
};