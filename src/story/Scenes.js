import React from 'react';
import {
  BlueCave,
  RedCave,
  EntranceCave,
  LongCave,
  WaterFallCave,
  LightCave,
  FangCave,
  NeedleCave,
  StairCaseCave,
  ChainCave,
  BuildingCave,
  WheelCave,
  EnginerCave,
  Island,
  RoadCave,
} from '../layouts/divStore';
import DownToDeep from './DownToDeep';
import PrisonerDemo from '../caves/PrisonerDemo';
import cavePath from '../caves/cavePath';
import { area } from '../caves/applicationData';

const cavePaths = (...caves) => caves.map(cave => cavePath(cave));

const [
  BlueCavePath,
  RedCavePath,
  EntranceCavePath,
  LongCavePath,
  WaterFallCavePath,
  LightCavePath,
  FangCavePath,
  NeedleCavePath,
  StairCaseCavePath,
  ChainCavePath,
  BuildingCavePath,
  WheelCavePath,
  EnginerCavePath,
  IslandPath,
  RoadCavePath,
  DownToDeepPath,
] = cavePaths(
  BlueCave,
  RedCave,
  EntranceCave,
  LongCave,
  WaterFallCave,
  LightCave,
  FangCave,
  NeedleCave,
  StairCaseCave,
  ChainCave,
  BuildingCave,
  WheelCave,
  EnginerCave,
  Island,
  RoadCave,
  DownToDeep,
);



export default ({sceneId, level, talkSocrates, interaction}) => {
  const sceneList = {
    Q: <DownToDeepPath level={level} talkSocrates={talkSocrates} interaction={interaction} exits={area.Q.exits} />,
    Y: <RedCavePath interaction={interaction} exits={area.Y.exits} />,
    A: <BlueCavePath interaction={interaction} exits={area.A.exits} />,
    B: <BuildingCavePath interaction={interaction} exits={area.B.exits} />,
    C: <PrisonerDemo interaction={interaction} exits={area.C.exits} />,
    D: <LongCavePath WaterFallCavePath interaction={interaction} exits={area.D.exits} />,
    X: <StairCaseCavePath interaction={interaction}  exits={area.X.exits} />,
    E: <NeedleCavePath interaction={interaction} exits={area.E.exits} />,
    F: <WaterFallCavePath interaction={interaction} exits={area.F.exits} />,
    G: <RoadCavePath interaction={interaction} exits={area.G.exits} />,
    H: <LightCavePath interaction={interaction} exits={area.H.exits} />,
    I: <FangCavePath interaction={interaction} exits={area.I.exits} />,
    J: <EnginerCavePath interaction={interaction} exits={area.J.exits} />,
    K: <ChainCavePath interaction={interaction} exits={area.K.exits} />,
    L: <WheelCavePath interaction={interaction} exits={area.L.exits} />,
  };
  
  return sceneList[sceneId] || null;
}