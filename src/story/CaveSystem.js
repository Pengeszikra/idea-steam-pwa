import React from 'react';
import {
  RouteArrow, Prisoner, Item,
  BlueCave, LongCave, WaterFallCave, BehindTheDoor,
  LightCave, FangCave, NeedleCave, StairCaseCave,
  ChainCave, BuildingCave, WheelCave, EnginerCave, RoadCave,   
} from '../styles/divStore';
import DownToDeep from './DownToDeep';
import PrisonerDemo from './PrisonerDemo';
import cavePath from '../layouts/cavePath';
import { area } from '../engine/applicationData';

const backroundLookup = {
  // Q:  DownToDeep,
  Y:  BehindTheDoor,
  A:  BlueCave,
  B:  BuildingCave,
  // C:  PrisonerDemo,
  D:  LongCave,
  X:  StairCaseCave,
  E:  NeedleCave,
  F:  WaterFallCave,
  G:  RoadCave,
  H:  LightCave,
  I:  FangCave,
  J:  EnginerCave,
  K:  WheelCave,
  L:  ChainCave,
};

export default ({position, level, talkSocrates, interaction}) => {
  // Q:  DownToDeep,
  if (position === 'Q') return <DownToDeep level={level} talkSocrates={talkSocrates} interaction={interaction} />;
  // C:  PrisonerDemo,
  if (position === 'C') return (
    <PrisonerDemo interaction={interaction} exits={area.C.exits}>
      <Item data-item="C1" />
      <Item data-item="C2" />
    </PrisonerDemo>
  );

  const {handleRoute} = interaction;
  const Route = ({path}) => <RouteArrow data-path={path} onClick={handleRoute(path)} />;
  const Background = backroundLookup[position];

  return (
    <Background>
      {area[position].exits.map((exit, key) => <Route key={key} path={exit} />)}
    </Background>
  );
}
