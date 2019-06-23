import React from 'react';
import {
  RouteArrow, Prisoner, Item, PrisonerCave,
  BlueCave, LongCave, WaterFallCave, BehindTheDoor,
  LightCave, FangCave, NeedleCave, StairCaseCave,
  ChainCave, BuildingCave, WheelCave, EnginerCave, RoadCave,   
} from '../styles/divStore';
import DownToDeep from './DownToDeep';
import { areaData } from '../engine/applicationData';

const backroundLookup = {
  Q:  DownToDeep,
  Y:  BehindTheDoor,
  A:  BlueCave,
  B:  BuildingCave,
  C:  PrisonerCave,
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

export default ({position, level, interaction, currentArea}) => {
  const {handleRoute, handleSavePrisoner, handleGetItem} = interaction;

  const showItems = currentArea.solved 
    ? currentArea.items.map(itemId => <Item data-item={itemId} onClick={handleGetItem(itemId)} key={`itm-${itemId}`} />) 
    : null;
  const showExits = areaData[position].exits.map(exit => <RouteArrow data-path={exit} path={exit} onClick={handleRoute(exit)} key={`exit-${exit}`} />);
  const showPrisoners = currentArea.prisoners.map(prisonerId => <Prisoner data-prisoner={prisonerId} onClick={handleSavePrisoner(prisonerId)} key={`prs-${prisonerId}`} />);
  const Background = backroundLookup[position];

  return (    
    <Background level={level} interaction={interaction} >
      {showExits}
      {showItems}
      {showPrisoners}
    </Background>
  );
}
