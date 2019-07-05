import React, {useEffect} from 'react';
import { 
  IntroButton, IntroButtonHolder, SimpleDarkBg, FoundCubeUvQuest, 
  QuestSketch, OpenCodeQuest, FoundAllProjectionQuest, SolidByProjectionQuest, 
  FoundTetraederUvQuest, PointProjectionQuest,
  EquipmentQuest, RomanNumbers,
  ContinuosPathQuest, PipelineQuest,
  PairSolidToProjectionQuest, PairProjectionToSolidQuest
} from '../styles/divStore';
import showtime from '../utils/showtime';
import { Minigame } from '../layouts/Geometries';
import RomanNumbersTask from './RomanNumbersTask';
import DragListTest from './DragListTest';
import FindCubeUv from './FindCubeUv';

const JustMonolog = ({interaction:{questResultIs}}) => {
  useEffect(()=>questResultIs(true),[]);
  return null;
};

const questLookup = {
  Q:  OpenCodeQuest,
  Y:  JustMonolog,
  A:  PairProjectionToSolidQuest,
  B:  Minigame,
  C:  DragListTest,
  D:  SolidByProjectionQuest,
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
      <Quest level={level} interaction={interaction} />
      {
        [Minigame, JustMonolog, FindCubeUv].indexOf(Quest) === -1
        &&
        <IntroButtonHolder>
          <IntroButton onClick={handleQuestResult(false, position)}>Balsiker</IntroButton>
          <IntroButton onClick={handleQuestResult(true, position)}>Győzelem</IntroButton>
        </IntroButtonHolder>
      }
    </>
  );
});