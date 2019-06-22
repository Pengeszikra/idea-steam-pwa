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

const questLookup = {
  Q:  Minigame,
  Y:  QuestSketch,
  A:  FoundCubeUvQuest,
  B:  OpenCodeQuest,
  C:  FoundAllProjectionQuest,
  D:  SolidByProjectionQuest,
  X:  FoundTetraederUvQuest,
  E:  PointProjectionQuest,
  F:  RomanNumbers,
  G:  EquipmentQuest,
  H:  ContinuosPathQuest,
  I:  PipelineQuest,
  J:  FoundTetraederUvQuest,
  K:  PairSolidToProjectionQuest,
  L:  PairProjectionToSolidQuest,
};

export default showtime(({handleQuestResult, position}) => {
  const Quest = questLookup[position];
  return (
    <SimpleDarkBg>
      <Quest />
      <IntroButtonHolder>
        <IntroButton onClick={handleQuestResult(false)}>Balsiker</IntroButton>
        <IntroButton onClick={handleQuestResult(true)}>Győzelem</IntroButton>
      </IntroButtonHolder>
    </SimpleDarkBg>
  );
});