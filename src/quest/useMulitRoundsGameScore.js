import { useState } from 'react';
import { usePipeWhen } from '../utils/usePipe';
import {forEach, interval, take, pipe} from 'callbag-basics';

export default ({level, position, questResultIs}) => {
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
  
  return {
    flow, setFlow, isSpeak, talking, score, setScore, gain, gainScore, 
    itsOver, playOver, checkResult, setChecking, roundLeft, setRounds,
    handleGameReset, handleRounds, 
  };  
} 

