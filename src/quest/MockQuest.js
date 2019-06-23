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

const JustMonolog = ({questResultIs}) => {
  useEffect(()=>questResultIs(true),[]);
  return null;
};

const questLookup = {
  Q:  OpenCodeQuest,
  Y:  JustMonolog,
  A:  PairProjectionToSolidQuest,
  B:  Minigame,
  C:  FoundAllProjectionQuest,
  D:  SolidByProjectionQuest,
  X:  FoundTetraederUvQuest,
  E:  PointProjectionQuest,
  F:  FoundCubeUvQuest,
  G:  PairSolidToProjectionQuest,
  H:  ContinuosPathQuest,
  I:  FoundTetraederUvQuest,
  J:  RomanNumbersTask,
  K:  EquipmentQuest,
  L:  PipelineQuest,
};

export default showtime(({handleQuestResult, position, level, interaction}) => {
  const Quest = questLookup[position];
  if (!Quest) return null;
  return (
    <>
      <Quest level={level} interaction={interaction} questResultIs={solved => handleQuestResult(solved)()} />
      {
        ( Quest !== Minigame && Quest !== JustMonolog )
        &&
        <IntroButtonHolder>
          <IntroButton onClick={handleQuestResult(false, position)}>Balsiker</IntroButton>
          <IntroButton onClick={handleQuestResult(true, position)}>Győzelem</IntroButton>
        </IntroButtonHolder>
      }
    </>
  );
});