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
  ItemOne,
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

export default ({scene, playGame, level, talkSocrates, interaction}) => {
  const sceneList = [
    <DownToDeep level={level} talkSocrates={talkSocrates} />,
    <PrisonerDemo interaction={interaction} />,
    <SimpleDarkBg><Minigame /></SimpleDarkBg>,
    <Island />,    
    <EntranceCave></EntranceCave>,
    <RedCave><Add3D content={GEOMS.dedocahedron}/></RedCave>,
    <LongCave onClick={()=>playGame(true)}><ItemOne /></LongCave>,
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
