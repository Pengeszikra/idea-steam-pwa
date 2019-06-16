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
);

export default ({scene, level, talkSocrates, interaction}) => {
  const sceneList = [
    <DownToDeep level={level} talkSocrates={talkSocrates} />,
    <PrisonerDemo interaction={interaction} exits={area.A.exits} />,
    <IslandPath interaction={interaction} exits={area.A.exits} />,    
    <EntranceCavePath interaction={interaction} exits={area.A.exits} />,
    <RoadCavePath interaction={interaction}  exits={area.A.exits} />,
    <LongCavePath interaction={interaction} exits={area.A.exits} />,
    <BlueCavePath interaction={interaction} exits={area.A.exits} />,
    <WaterFallCavePath interaction={interaction} exits={area.A.exits} />,
    <LightCavePath interaction={interaction} exits={area.A.exits} />,
    <FangCavePath interaction={interaction} exits={area.A.exits} />,
    <StairCaseCavePath interaction={interaction} exits={area.A.exits} />,
    <RedCavePath interaction={interaction} exits={area.A.exits} />,
    <NeedleCavePath interaction={interaction} exits={area.A.exits} />,
    <ChainCavePath interaction={interaction} exits={area.A.exits} />,
    <BuildingCavePath interaction={interaction} exits={area.A.exits} />,
    <WheelCavePath interaction={interaction} exits={area.A.exits} />,
    <EnginerCavePath interaction={interaction} exits={area.A.exits} />,
  ]
  
  return sceneList[scene % sceneList.length];
}