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
import { cave_2_3 } from '../caves/applicationData';



export default ({scene, level, talkSocrates, interaction}) => {
  const sceneList = [
    <DownToDeep level={level} talkSocrates={talkSocrates} />,
    <PrisonerDemo interaction={interaction} />,
    <Island interaction={interaction} />,    
    <EntranceCave />,
    <RoadCave interaction={interaction} routes={cave_2_3.routes} />,
    <LongCave />,
    <BlueCave />,
    <WaterFallCave />,
    <LightCave />,
    <FangCave />,
    <StairCaseCave />,
    <RedCave />,
    <NeedleCave />,
    <ChainCave />,
    <BuildingCave />,
    <WheelCave />,
    <EnginerCave />,
  ]
  
  return sceneList[scene % sceneList.length];
}