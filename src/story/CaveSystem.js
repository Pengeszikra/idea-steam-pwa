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

export default ({position, level, talkSocrates, interaction, currentArea}) => {
  const {handleRoute, handleSavePrisoner, handleGetItem} = interaction;

  const showItems = currentArea.items.map(itemId => <Item data-item={itemId} onClick={handleGetItem(itemId)} key={`itm-${itemId}`} />);
  const showExits = area[position].exits.map(exit => <RouteArrow data-path={exit} path={exit} onClick={handleRoute(exit)} key={`exit-${exit}`} />);
  const showPrisoners = currentArea.prisoners.map(prisonerId => <Prisoner data-prisoner={prisonerId} onClick={handleSavePrisoner(prisonerId)} key={`prs-${prisonerId}`} />);

  // Q:  DownToDeep,
  if (position === 'Q') return <DownToDeep level={level} talkSocrates={talkSocrates} interaction={interaction} />;

  // C:  PrisonerDemo,
  if (position === 'C') return (
    <PrisonerDemo interaction={interaction} exits={area.C.exits}>
      {showItems}      
    </PrisonerDemo>
  );

  const Background = backroundLookup[position];

  return (
    <Background>
      {showExits}
      {showItems}
      {showPrisoners}
    </Background>
  );
}
