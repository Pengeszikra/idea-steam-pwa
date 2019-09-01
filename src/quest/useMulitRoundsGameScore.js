import { useState, useEffect } from 'react';
import { usePipeWhen } from '../utils/usePipe';
import {forEach, interval, take, pipe} from 'callbag-basics';
import * as R from 'ramda';

export default ({level, position, questResultIs}) => {
  const [flow, setFlow] = useState(true);
  const [isSpeak, talking] = useState(false);
  const [score, setScore] = useState(0);
  const [gain, gainScore] = useState(0);
  const [itsOver, playOver] = useState(false);
  const [checkResult, setChecking] = useState(() => () => {});
  const [roundLeft, setRounds] = useState(level - 1);  // at second level each quest need for play twice
  
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
      console.log('--- handle rounds ---:', score)
      questResultIs(true, position, score);
    } 
  };

  useEffect(() => {
    const repeats = R.includes(position, ['J', 'K', 'D']) ? 2 : level - 1;
    setRounds( repeats );  
    console.log(`---> ${repeats} at position ${position}`);
    return () => {};
  } ,[position]);
  
  return {
    flow, setFlow, isSpeak, talking, score, setScore, gain, gainScore, 
    itsOver, playOver, checkResult, setChecking, roundLeft, setRounds,
    handleGameReset, handleRounds, 
  };  
}