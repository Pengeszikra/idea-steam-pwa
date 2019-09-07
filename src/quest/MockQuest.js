import React, {useEffect} from 'react';
import showtime from '../utils/showtime';
import RomanNumbersTask from './RomanNumbersTask';
import FindCubeUv from './FindCubeUv';
import OpenCodeQuestGame from './OpenCodeQuestGame';
import SolidByPorjectionQuestGame, { SolidProjectionGameForTime } from './SolidByPorjectionQuestGame';
import PairProjectionQuestGame from './PairProjectionQuestGame';
import PairProjectionForTime from './PairProjectionForTime';
import FindCubeUvForTime from './FindCubeUvForTime';
import EnterAndFinalQuest from './EnterAndFinalQuest';
import PipeDraw2D from './PipeDraw2D';
import SpeedPairs3DGame from './SpeedPairs3DGame';
import ThreeGemGames from './ThreeGemGames';
import PerfectShapesGame from './PerfectShapesGame';
import SendToEntrance from './SendToEntrance';

const JustMonolog = ({interaction:{questResultIs}}) => {
  useEffect(()=>questResultIs(true),[]);
  return null;
};

const questLookup = {
  Q:  OpenCodeQuestGame,
  Y:  EnterAndFinalQuest,
  A:  PerfectShapesGame,
  B:  PairProjectionQuestGame,
  C:  SolidByPorjectionQuestGame,
  D:  FindCubeUv, 
  X:  JustMonolog,
  E:  PairProjectionForTime,
  F:  SolidProjectionGameForTime,
  G:  FindCubeUvForTime,
  H:  SpeedPairs3DGame,
  I:  ThreeGemGames,
  J:  RomanNumbersTask,
  K:  PipeDraw2D,
  L:  SendToEntrance,
};

export default showtime(({position, level, interaction}) => {
  const {questResultIs} = interaction;
  const handleQuestResult = (result, position) => e => questResultIs(result, position);
  const Quest = questLookup[position];
  if (!Quest) return null;
  return <Quest level={level} interaction={interaction} position={position}/>;
});