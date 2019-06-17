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
  BehindTheDoor,
} from '../layouts/divStore';
import DownToDeep from './DownToDeep';
import PrisonerDemo from '../caves/PrisonerDemo';
import cavePath from '../caves/cavePath';
import { area } from '../caves/applicationData';
import { Add3D, GEOMS } from '../show/Geometries';

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
  BehindTheDoorPath,
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
  BehindTheDoor,
  DownToDeep,
);

const Prisoner = props => <div className="prisoner" {...props} />

export default ({sceneId, level, talkSocrates, interaction}) => {
  
  const sceneLookup = {
    Q: <DownToDeepPath level={level} talkSocrates={talkSocrates} interaction={interaction} exits={area.Q.exits} />,
    Y: <BehindTheDoorPath interaction={interaction} exits={area.Y.exits} />,
    A: <BlueCavePath interaction={interaction} exits={area.A.exits} ><Prisoner data-prisoner="A-1"/></BlueCavePath>,
    B: <BuildingCavePath interaction={interaction} exits={area.B.exits}>
         <Prisoner data-prisoner="B-1"/>
         <Prisoner data-prisoner="B-2"/>
       </BuildingCavePath>,
    C: <PrisonerDemo interaction={interaction} exits={area.C.exits} ><Prisoner data-prisoner="C-1"/></PrisonerDemo>,
    D: <LongCavePath interaction={interaction} exits={area.D.exits} ><Prisoner data-prisoner="D-1"/></LongCavePath>,
    X: <StairCaseCavePath interaction={interaction}  exits={area.X.exits} />,
    E: <NeedleCavePath interaction={interaction} exits={area.E.exits} >
         <Prisoner data-prisoner="E-1"/>
         <Prisoner data-prisoner="E-2"/>
       </NeedleCavePath>,
    F: <WaterFallCavePath interaction={interaction} exits={area.F.exits} >
         <Prisoner data-prisoner="F-1"/>
         <Prisoner data-prisoner="F-2"/>
       </WaterFallCavePath>,
    G: <RoadCavePath interaction={interaction} exits={area.G.exits} ><Prisoner data-prisoner="G-1"/></RoadCavePath>,
    H: <LightCavePath interaction={interaction} exits={area.H.exits}>
         <Prisoner data-prisoner="H-1"/>
         <Add3D content={GEOMS.octahedron}/>
       </LightCavePath>,
    I: <FangCavePath interaction={interaction} exits={area.I.exits} ><Prisoner data-prisoner="I-1"/></FangCavePath>,
    J: <EnginerCavePath interaction={interaction} exits={area.J.exits} />,
    K: <WheelCavePath interaction={interaction} exits={area.K.exits} />,
    L: <ChainCavePath interaction={interaction} exits={area.L.exits} />,
  };
  
  return sceneLookup[sceneId] || null;
}