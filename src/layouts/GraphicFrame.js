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
  BlueCave,
  RedCave,
  InteractiveMap,
} from '../layouts/divStore';

const HeaderBar = () => (
  <HeaderBarSection>
    <LevelOneAvatar />
  </HeaderBarSection>
);

const BottomBar = ({handleMap}) => {
  return (
    <BottomBarSection>
      <MapIcon onClick={handleMap}/>
      <InventoryIcon />
      <SavedIcon />
      <HistoryIcon />
    </BottomBarSection>
  );  
}

const Scenes = ({scene}) => {
  switch(scene) {
    case 1: return <PlayCity />;
    case 2: return <RedCave />;
    default: return <BlueCave />;
  }
}

const GamePlay = ({route, handleRoute, mapVisible}) => {
  const [scene, setScene] = useState(1);
  const handleNextScene = () => setScene(scene + 1);
  return (
    <>      
      <Scenes scene={scene} />      
      {scene < 3 && 
        <Socrates onClick={() => {
          setScene(scene + 1)
          console.log(scene);
        }}><span>{whoIsTheHero}</span></Socrates>
      }
      <SmallLogo />
      { mapVisible && <InteractiveMap />}
    </>
  );
}

export default () => {
  const [{route, score, saved}, dispatch] = useReducer(scoreReducer, scoreInitial);  
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const handleMap = () => setMapVisiblity(!mapVisible);

  return (
    <main className="graph-frame">      
      <GamePlay route={route} handleRoute={handleRoute} mapVisible={mapVisible}/>
      <HeaderBar score={score} saved={saved} />
      <BottomBar handleRoute = {handleRoute} handleMap={handleMap}/>      
    </main>  
  );
}
