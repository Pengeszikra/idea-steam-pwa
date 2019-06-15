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
  SimpleDarkBg,
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
    <SimpleDarkBg><Minigame /></SimpleDarkBg>,
    <IslandPath interaction={interaction} />,    
    <EntranceCave></EntranceCave>,
    <RedCavePath interaction={interaction} routes={cave_2_3.routes}><Add3D content={GEOMS.dedocahedron}/></RedCavePath>,
    <LongCave />,
    <BlueCave><GameWith3dObjects /></BlueCave>,
    <WaterFallCave><Add3D content={GEOMS.icosahedron}/></WaterFallCave>,
    <LightCave><Add3D content={GEOMS.octahedron}/></LightCave>,
    <FangCave><Add3D content={GEOMS.plane}/></FangCave>,
    <StairCaseCave><Add3D content={GEOMS.box}/></StairCaseCave>,
    <NeedleCave><Add3D content={GEOMS.tetrahedron}/></NeedleCave>,
    <ChainCave><Add3D content={GEOMS.cone}/></ChainCave>,
    <BuildingCave />,
    <WheelCave></WheelCave>,
    <EnginerCave />,
  ]
  
  return sceneList[scene % sceneList.length];
}

const IslandPath = cavePath(Island);
const RedCavePath = cavePath(RedCave);