import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore } from '../flow/action';
import '../styles/graphic.scss';
import { whoIsTheHero } from '../caves/applicationData';
import divFactory from '../show/divFactory';

const [HeaderBarSection, LevelOneAvatar] = divFactory(["header-bar", "lvl-1-char"]);

console.log(LevelOneAvatar)

const HeaderBar = () => (
  <HeaderBarSection>
    <LevelOneAvatar />
  </HeaderBarSection>
);

const [
  BottomBarSection, 
  MapIcon, 
  InventoryIcon, 
  SavedIcon, 
  HistoryIcon
] = divFactory(["bottom-bar", "bottom-map", "bottom-inventory", "bottom-saved", "bottom-history"]);

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
      <div className="play-city"></div>
      <div className="socrates"><span>{whoIsTheHero}</span></div>
      <div className="small-logo"></div>
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
