import React, {useEffect} from 'react';
import { 
  IntroButton, IntroButtonHolder, SolidByProjectionQuest,  
  FoundTetraederUvQuest, PointProjectionQuest,
  EquipmentQuest, RomanNumbers,
  ContinuosPathQuest, PipelineQuest,
  PairSolidToProjectionQuest, PairProjectionToSolidQuest
} from '../styles/divStore';
import showtime from '../utils/showtime';
import RomanNumbersTask from './RomanNumbersTask';
import FindCubeUv from './FindCubeUv';
import OpenCodeQuestGame from './OpenCodeQuestGame';
import SolidByPorjectionQuestGame from './SolidByPorjectionQuestGame';
import PairProjectionQuestGame from './PairProjectionQuestGame';
import PairProjectionForTime from './PairProjectionForTime';
import FindCubeUvForTime from './FindCubeUvForTime';

const JustMonolog = ({interaction:{questResultIs}}) => {
  useEffect(()=>questResultIs(true),[]);
  return null;
};

const SendToEntrance = ({interaction}) => {
  const {questResultIs, checkItem} = interaction;
  useEffect(()=>{
    questResultIs(true);    
    console.log('--- enter to final quiz ---');
    console.log(`found K : C1 :: ${checkItem('C1', 'K')}`);
  },[]);
  return null;
};

const questLookup = {
  Q:  OpenCodeQuestGame,
  Y:  JustMonolog,
  A:  PairProjectionQuestGame,
  B:  SolidByPorjectionQuestGame,
  C:  PairProjectionToSolidQuest,
  D:  SolidByPorjectionQuestGame,
  X:  FoundTetraederUvQuest,
  E:  PairProjectionForTime,
  F:  FindCubeUv,
  G:  PairSolidToProjectionQuest,
  H:  ContinuosPathQuest,
  I:  FindCubeUvForTime,
  J:  RomanNumbersTask,
  K:  EquipmentQuest,
  L:  SendToEntrance, //PipelineQuest,
};

export default showtime(({position, level, interaction}) => {
  const {questResultIs} = interaction;
  const handleQuestResult = (result, position) => e => questResultIs(result, position);
  const Quest = questLookup[position];
  if (!Quest) return null;
  return (
    <>
      <Quest level={level} interaction={interaction} position={position}/>
      {
        [
          PairProjectionQuestGame, 
          JustMonolog, 
          FindCubeUv, 
          OpenCodeQuestGame,
          SolidByPorjectionQuestGame,
          RomanNumbersTask,
          FindCubeUvForTime,
          PairProjectionForTime,
        ].indexOf(Quest) === -1
        &&
        <IntroButtonHolder>
          <IntroButton onClick={handleQuestResult(false, position)}>Balsiker</IntroButton>
          <IntroButton onClick={handleQuestResult(true, position)}>Győzelem</IntroButton>
        </IntroButtonHolder>
      }
    </>
  );
});