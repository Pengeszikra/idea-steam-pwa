import React from 'react';
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

const questLookup = {
  Q:  OpenCodeQuest,
  Y:  QuestSketch,
  A:  RomanNumbersTask,
  B:  Minigame,
  C:  FoundAllProjectionQuest,
  D:  SolidByProjectionQuest,
  X:  FoundTetraederUvQuest,
  E:  PointProjectionQuest,
  F:  FoundCubeUvQuest,
  G:  EquipmentQuest,
  H:  ContinuosPathQuest,
  I:  PipelineQuest,
  J:  FoundTetraederUvQuest,
  K:  PairSolidToProjectionQuest,
  L:  PairProjectionToSolidQuest,
};

export default showtime(({handleQuestResult, position, level}) => {
  const Quest = questLookup[position];
  return (
    <SimpleDarkBg>
      <Quest level={level} />
      <IntroButtonHolder>
        <IntroButton onClick={handleQuestResult(false, position)}>Balsiker</IntroButton>
        <IntroButton onClick={handleQuestResult(true, position)}>Győzelem</IntroButton>
      </IntroButtonHolder>
    </SimpleDarkBg>
  );
});