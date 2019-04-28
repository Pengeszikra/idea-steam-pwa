import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import { whoIsTheHero, cavePositions } from '../caves/applicationData';
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
  LongCave,
  ActualScore,
  SavedPrisoner,
  WaterFallCave,
} from '../layouts/divStore';

const HeaderBar = ({score, saved}) => (
  <HeaderBarSection>
    <LevelOneAvatar />
    <ActualScore>{score}</ActualScore>
    <SavedPrisoner>{saved}</SavedPrisoner>
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
    case 4: return <LongCave />;
    case 5: return <BlueCave />;
    case 6: return <WaterFallCave />;
    default: return <EntranceCave />;
  }
}

//const MapWithHero = ({position:[x,y]=[10,15]}) => {
const MapWithHero = ({addScore, savePrisoner}) => {

  const [caveNumber, setCaveNumber] = useState(0)
  const [pos, setPos] = useState(cavePositions[caveNumber])  
  const handleClick = () => {
    const move = caveNumber < cavePositions.length - 1 ? caveNumber + 1 : 0;    
    setCaveNumber(move)
    setPos(cavePositions[move]);
    addScore(10);
    savePrisoner();
  };
  const [y,x] = pos;
  return (
    <>
      <InteractiveMap onClick={handleClick} />
      <LevelOneAvatar style={{
        top: `${y}vmin`,
        left: `${x}vmin`,
        transform: 'scale(.7)',
        transformOrigin: 'bottom center',
      }}/>
    </>
  )
}

const GamePlay = ({route, handleRoute, mapVisible, scene, setScene, hasSocrates, addScore, savePrisoner}) => {
  const handleNextScene = () => setScene(scene + 1);
  return (
    <>      
      <Scenes scene={scene} />      
      { hasSocrates && !mapVisible && <Socrates onClick={handleNextScene}><span>{whoIsTheHero}</span></Socrates>}      
      { [1,2].indexOf(scene) >= 0 && <SmallLogo />}
      { mapVisible && <MapWithHero addScore={addScore} savePrisoner={savePrisoner} />}
    </>
  );
}

export default () => {
  const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved}, dispatch] = scoreStore;
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
    
  const [scene, setScene] = useState(1);
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleInventory = () => setScene(1);
  const handlePrisoner = () => {
    setScene(scene + 1)
    setSocrates(false)
    setMapVisiblity(false)
  };  
  const handleHistory = () => setSocrates(!hasSocrates);  
  const addScore = n => dispatch(achiveScore(n));
  const savePrisoner = () => dispatch(releasePrisoner());

  return (
    <main className="graph-frame">      
      <GamePlay 
        route={route} 
        handleRoute={handleRoute} 
        mapVisible={mapVisible} 
        hasSocrates={hasSocrates} 
        scene={scene} 
        setScene={setScene} 
        addScore={addScore}
        savePrisoner={savePrisoner}
      />
      <HeaderBar score={score} saved={saved} />
      <BottomBar 
        handleRoute = {handleRoute} 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />
    </main>  
  );
}
