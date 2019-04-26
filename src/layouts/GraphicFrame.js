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
  EntranceCave,
} from '../layouts/divStore';

const HeaderBar = () => (
  <HeaderBarSection>
    <LevelOneAvatar />
  </HeaderBarSection>
);

const BottomBar = ({handleMap, handleInventory, handlePrisoner, handleHistory}) => {
  return (
    <BottomBarSection>
      <MapIcon onClick={handleMap}/>
      <InventoryIcon onClick={handleInventory} />
      <SavedIcon onClick={handlePrisoner} />
      <HistoryIcon onClick={handleHistory} />
    </BottomBarSection>
  );  
}

const Scenes = ({scene}) => {
  switch(scene) {
    case 1: return <EntranceCave />;
    case 2: return <PlayCity />;
    case 3: return <RedCave />;
    default: return <BlueCave />;
  }
}

const GamePlay = ({route, handleRoute, mapVisible, scene, setScene}) => {
  const handleNextScene = () => setScene(scene + 1);
  return (
    <>      
      <Scenes scene={scene} />      
      {scene < 3 && 
        <Socrates onClick={handleNextScene}><span>{whoIsTheHero}</span></Socrates>
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
  
  
  const [scene, setScene] = useState(1);
  

  const handleMap = () => setMapVisiblity(!mapVisible);
  const handlePrisoner = () => setScene(1);
  const handleInventory = () => setScene(2);
  const handleHistory = () => setScene(3);  

  return (
    <main className="graph-frame">      
      <GamePlay route={route} handleRoute={handleRoute} mapVisible={mapVisible} scene={scene} setScene={setScene}/>
      <HeaderBar score={score} saved={saved} />
      <BottomBar handleRoute = {handleRoute} handleMap={handleMap} handlePrisoner={handlePrisoner} handleInventory={handleInventory} handleHistory={handleHistory}/>
    </main>  
  );
}
