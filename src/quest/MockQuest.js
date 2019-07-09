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
import DragListTest from './DragListTest';
import FindCubeUv from './FindCubeUv';
import OpenCodeQuestGame from './OpenCodeQuestGame';
import SolidByPorjectionQuestGame from './SolidByPorjectionQuestGame';
import PairProjectionQuestGame from './PairProjectionQuestGame';

const JustMonolog = ({interaction:{questResultIs}}) => {
  useEffect(()=>questResultIs(true),[]);
  return null;
};

const questLookup = {
  Q:  OpenCodeQuestGame,
  Y:  JustMonolog,
  A:  PairProjectionQuestGame,
  B:  SolidByProjectionQuest,
  C:  PairProjectionToSolidQuest,
  D:  SolidByPorjectionQuestGame,
  X:  FoundTetraederUvQuest,
  E:  PointProjectionQuest,
  F:  FindCubeUv,
  G:  PairSolidToProjectionQuest,
  H:  ContinuosPathQuest,
  I:  FoundTetraederUvQuest,
  J:  RomanNumbersTask,
  K:  EquipmentQuest,
  L:  PipelineQuest,
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
        [JustMonolog, FindCubeUv, OpenCodeQuestGame].indexOf(Quest) === -1
        &&
        <IntroButtonHolder>
          <IntroButton onClick={handleQuestResult(false, position)}>Balsiker</IntroButton>
          <IntroButton onClick={handleQuestResult(true, position)}>Győzelem</IntroButton>
        </IntroButtonHolder>
      }
    </>
  );
});