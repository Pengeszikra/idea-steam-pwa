import React, {useEffect} from 'react';
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
  const {handleRoute, handleSavePrisoner, handleGetItem, monologBeforeQuest} = interaction;

  const data = areaData[position];
  const showItems = currentArea.solved 
    ? currentArea.items.map(itemId => <Item data-item={itemId} onClick={handleGetItem(itemId)} key={`itm-${itemId}`} />) 
    : null;
  const showExits = data.exits.map(exit => <RouteArrow data-path={exit} path={exit} onClick={handleRoute(exit)} key={`exit-${exit}`} />);
  const showPrisoners = currentArea.prisoners.map(prisonerId => 
    <Prisoner 
      data-prisoner={prisonerId} 
      data-released={currentArea.solved}
      onClick={handleSavePrisoner(prisonerId)} 
      key={`prs-${prisonerId}`} 
    />
  );
  const Background = backroundLookup[position];

  const afterMonolog = data.onEnterMonolog ? currentArea.readed : true;

  // select intro text - will be sofisticated
  useEffect(()=>{
    if (!currentArea.solved) {
      data.onEnterMonolog 
        && !currentArea.secret
        && setTimeout(()=>monologBeforeQuest(data.onEnterMonolog), 500);
      data.onSecretMonolog 
        && currentArea.secret
        && setTimeout(()=>monologBeforeQuest(data.onSecretMonolog), 500);
    }
  }, [position]);

  return (    
    <Background level={level} interaction={interaction} >
      {afterMonolog && showExits}
      {showItems}
      {showPrisoners}
    </Background>
  );
}
