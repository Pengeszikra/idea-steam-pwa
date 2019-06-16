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
import {Add3D, GEOMS, GameWith3dObjects, Minigame} from '../show/Geometries';
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
    Y: <EnginerCavePath interaction={interaction} exits={area.Y.exits} />,
    A: <BlueCavePath interaction={interaction} exits={area.A.exits} />,
    B: <LongCavePath interaction={interaction} exits={area.B.exits} />,
    C: <PrisonerDemo interaction={interaction} exits={area.C.exits} />,
    D: <WaterFallCavePath interaction={interaction} exits={area.D.exits} />,
    X: <RoadCavePath interaction={interaction}  exits={area.X.exits} />,
    E: <LightCavePath interaction={interaction} exits={area.E.exits} />,
    F: <FangCavePath interaction={interaction} exits={area.F.exits} />,
    G: <StairCaseCavePath interaction={interaction} exits={area.G.exits} />,
    H: <RedCavePath interaction={interaction} exits={area.H.exits} />,
    I: <NeedleCavePath interaction={interaction} exits={area.I.exits} />,
    J: <ChainCavePath interaction={interaction} exits={area.J.exits} />,
    K: <BuildingCavePath interaction={interaction} exits={area.K.exits} />,
    L: <WheelCavePath interaction={interaction} exits={area.L.exits} />,
  };
  
  return sceneList[sceneId] || null;
}