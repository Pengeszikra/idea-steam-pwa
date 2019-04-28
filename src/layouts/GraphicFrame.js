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
  LightCave,
  Game1,
  AvatarOnMap,
  FangCave,
  NeedleCave,
  StairCaseCave,
  Circle,
  PrisonerOne,
  ItemOne,
  ChainCave,
  BuildingCave,
  WheelCave,
  EnginerCave,
} from '../layouts/divStore';
import showtime from './showtime';

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

const CityWithLogo = () => (
  <PlayCity>
    <SmallLogo />
  </PlayCity>
)

const Scenes = ({scene, playGame}) => {
  return [
    <CityWithLogo />,
    <EntranceCave />,    
    <RedCave />,
    <LongCave onClick={()=>playGame(true)}><ItemOne /></LongCave>,
    <BlueCave />,
    <WaterFallCave />,
    <LightCave />,
    <FangCave />,
    <StairCaseCave />,
    <NeedleCave />,
    <ChainCave />,
    <BuildingCave />,
    <WheelCave />,
    <EnginerCave />,
    <PlayCity />,
  ][scene % 14]
}

//const MapWithHero = ({position:[x,y]=[10,15]}) => {
const MapWithHero = showtime( ({addScore, savePrisoner}) => {
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
      <AvatarOnMap style={{
        top: `${(y+3)}vmin`,
        left: `${(x+3)}vmin`,
      }}/>
    </>
  )
});

const FakeGame = ({onClick}) => <Game1 onClick={onClick}><PrisonerOne /></Game1>
const ActualGame = showtime(FakeGame);
const SocratesSpeaking = showtime(Socrates);

export default () => {
  const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved}, dispatch] = scoreStore;
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
    
  const [scene, setScene] = useState(1);

  const [gameOngoing, playGame] = useState(false);
  
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
      <Scenes scene={scene} playGame={playGame}/>      
      <SocratesSpeaking show={hasSocrates && !mapVisible}><span>{whoIsTheHero}</span></SocratesSpeaking>
      <BottomBar 
        handleRoute = {handleRoute} 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />
      <ActualGame show={gameOngoing} onClick={()=>playGame(false)}/>
      <HeaderBar score={score} saved={saved} />
      <MapWithHero show={mapVisible} addScore={addScore} savePrisoner={savePrisoner} />      
    </main>  
  );
}
