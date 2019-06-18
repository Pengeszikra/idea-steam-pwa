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
} from '../styles/divStore';
import DownToDeep from './DownToDeep';
import PrisonerDemo from './PrisonerDemo';
import cavePath from '../layouts/cavePath';
import { area } from './applicationData';
import { Add3D, GEOMS } from '../layouts/Geometries';

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

const Prisoner = ({prisonerProps, ...props}) => <div className="prisoner" {...props} />

const Item = ({itemProps, ...props}) => {
  // const id = props["data-item"]
  // const show = false;
  // console.log(id);
  return <div className="item" {...props} />;
}

export default ({sceneId, level, talkSocrates, interaction, prisonerProps, itemProps}) => {
  
  const sceneLookup = {
    Q:  <DownToDeepPath level={level} talkSocrates={talkSocrates} interaction={interaction} exits={area.Q.exits} />,
    Y:  <BehindTheDoorPath interaction={interaction} exits={area.Y.exits} />,
    A:  <BlueCavePath interaction={interaction} exits={area.A.exits} >
          <Prisoner data-prisoner="A1" prisonerProps={prisonerProps} />
        </BlueCavePath>,
    B:  <BuildingCavePath interaction={interaction} exits={area.B.exits}>
          <Prisoner data-prisoner="B1" prisonerProps={prisonerProps} />
          <Prisoner data-prisoner="B2" prisonerProps={prisonerProps} />
        </BuildingCavePath>,
    C:  <PrisonerDemo interaction={interaction} exits={area.C.exits} prisonerProps={prisonerProps}  >
          <Item data-item="C1" itemProps={itemProps} />
          <Item data-item="C2" itemProps={itemProps} />
        </PrisonerDemo>,
    D:  <LongCavePath interaction={interaction} exits={area.D.exits} >
          <Prisoner data-prisoner="D1"/>
          <Item data-item="D1" itemProps={itemProps} />
          <Item data-item="D2" itemProps={itemProps} />
        </LongCavePath>,
    X:  <StairCaseCavePath interaction={interaction}  exits={area.X.exits} />,
    E:  <NeedleCavePath interaction={interaction} exits={area.E.exits} >
          <Prisoner data-prisoner="E1" prisonerProps={prisonerProps} />
          <Prisoner data-prisoner="E2" prisonerProps={prisonerProps} />
          <Item data-item="E1" itemProps={itemProps} />
          <Item data-item="E2" itemProps={itemProps} />
        </NeedleCavePath>,
    F:  <WaterFallCavePath interaction={interaction} exits={area.F.exits} >
          <Prisoner data-prisoner="F1" prisonerProps={prisonerProps} />
          <Prisoner data-prisoner="F2" prisonerProps={prisonerProps} />
          <Item data-item="F1" itemProps={itemProps} />
          <Item data-item="F2" itemProps={itemProps} />
        </WaterFallCavePath>,
    G:  <RoadCavePath interaction={interaction} exits={area.G.exits} >
          <Prisoner data-prisoner="G1" prisonerProps={prisonerProps} />
          <Item data-item="G1" itemProps={itemProps} />
          <Item data-item="G2" itemProps={itemProps} />
        </RoadCavePath>,
    H:  <LightCavePath interaction={interaction} exits={area.H.exits}>
          <Prisoner data-prisoner="H1" prisonerProps={prisonerProps} />
          <Item data-item="H1" itemProps={itemProps} />
          <Item data-item="H2" itemProps={itemProps} />
          <Add3D content={GEOMS.octahedron}/>
        </LightCavePath>,
    I:  <FangCavePath interaction={interaction} exits={area.I.exits} ><Prisoner data-prisoner="I1"/></FangCavePath>,
    J:  <EnginerCavePath interaction={interaction} exits={area.J.exits} />,
    K:  <WheelCavePath interaction={interaction} exits={area.K.exits} />,
    L:  <ChainCavePath interaction={interaction} exits={area.L.exits} />,
  };
  
  return sceneLookup[sceneId] || null;
}

// a littlebit to static and long