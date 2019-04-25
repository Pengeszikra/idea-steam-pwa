import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore } from '../flow/action';
import '../styles/graphic.scss';
import { whoIsTheHero } from '../caves/applicationData';
import {
  HeaderBarSection, 
  LevelOneAvatar,
  BottomBarSection,
  MapIcon,
  InventoryIcon,
  SavedIcon,
  HistoryIcon,
  PlayCity,
  Socrates,
  SmallLogo,
} from '../layouts/divStore';

const HeaderBar = () => (
  <HeaderBarSection>
    <LevelOneAvatar />
  </HeaderBarSection>
);

const BottomBar = () => (
  <BottomBarSection>
    <MapIcon />
    <InventoryIcon />
    <SavedIcon />
    <HistoryIcon />
  </BottomBarSection>
);

const GamePlay = ({route, handleRoute}) => {
  return (
    <>
      <PlayCity />
      <Socrates><span>{whoIsTheHero}</span></Socrates>
      <SmallLogo />
    </>
  );
}

export default () => {
  const [{route, score, saved}, dispatch] = useReducer(scoreReducer, scoreInitial);
  const handleRoute = path => event => dispatch(changeRoute(path));

  return (
    <main className="graph-frame">      
      <GamePlay route={route} handleRoute={handleRoute} />
      <HeaderBar score={score} saved={saved} />
      <BottomBar handleRoute = {handleRoute} />      
    </main>  
  );
}
