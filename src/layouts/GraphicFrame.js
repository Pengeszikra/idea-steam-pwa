import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import {
  LevelOneAvatar,
  BlueCave,
  RedCave,
  EntranceCave,
  LongCave,
  WaterFallCave,
  LightCave,
  FangCave,
  NeedleCave,
  StairCaseCave,
  PrisonerOne,
  ItemOne,
  ChainCave,
  BuildingCave,
  WheelCave,
  EnginerCave,
  Island,
  SimpleDarkBg,
  LevelTwoAvatar,
  AvatarOneOnMap,
  AvatarTwoOnMap,
} from '../layouts/divStore';
import showtime from './showtime';
import {Add3D, GEOMS, GameWith3dObjects, Minigame} from '../show/Geometries';
import speaks from '../caves/speaks';
import DownToDeep from '../story/DownToDeep';
import SocratesSpeaking from './SocratesSpeaking';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import MapWithHero from './MapWithHero';

const Scenes = ({scene, playGame, level, talkSocrates}) => {
  const sceneList = [
    <DownToDeep level={level} talkSocrates={talkSocrates} />,
    <SimpleDarkBg><Minigame /></SimpleDarkBg>,
    <Island />,
    <EntranceCave></EntranceCave>,    
    <RedCave><Add3D content={GEOMS.dedocahedron}/></RedCave>,
    <LongCave onClick={()=>playGame(true)}><ItemOne /></LongCave>,
    <BlueCave><GameWith3dObjects /></BlueCave>,
    <WaterFallCave><Add3D content={GEOMS.icosahedron}/></WaterFallCave>,
    <LightCave><Add3D content={GEOMS.octahedron}/></LightCave>,
    <FangCave><Add3D content={GEOMS.plane}/></FangCave>,
    <StairCaseCave><Add3D content={GEOMS.box}/></StairCaseCave>,
    <NeedleCave><Add3D content={GEOMS.tetrahedron}/></NeedleCave>,
    <ChainCave><Add3D content={GEOMS.cone}/></ChainCave>,
    <BuildingCave />,
    <WheelCave></WheelCave>,
    <EnginerCave />,
  ]
  
  return sceneList[scene % sceneList.length];
}

const ActualGame = showtime(({onClick}) => <SimpleDarkBg onClick={onClick}><PrisonerOne /></SimpleDarkBg>);

export default ({setWay, scoreStore}) => {
  // const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved, level}, dispatch] = scoreStore;
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
  const [speakNumber, setSpeakNumber] = useState(0);
    
  const [scene, setScene] = useState(0);

  const [gameOngoing, playGame] = useState(false);

  // useEffect(()=>{console.log('--- graphic-frame-v0.3.4.5 ---')},[])
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleInventory = () => setScene(1);
  const handlePrisoner = () => {
    setScene(scene + 1)
    setSocrates(false)
    setMapVisiblity(false)
  };  
  const handleHistory = () => {
    setSocrates(!hasSocrates);
    hasSocrates && setSpeakNumber(speakNumber < speaks.length - 1 ? speakNumber + 1 : 0);
  };  
  const addScore = n => dispatch(achiveScore(n));
  const savePrisoner = () => dispatch(releasePrisoner());
  const talkSocrates = speakNumber => {
    setSocrates(true);
    setSpeakNumber(speakNumber);
  }

  return (
    <main className="graph-frame">      
      <Scenes scene={scene} playGame={playGame} level={level} talkSocrates={talkSocrates} />            
      <SocratesSpeaking show={hasSocrates && !mapVisible} speak={speaks[speakNumber]} level={level} />
      <BottomBar 
        handleRoute = {handleRoute} 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />      
      <ActualGame show={gameOngoing} onClick={()=>playGame(false)}/>
      <HeaderBar score={score} saved={saved} setWay={setWay} Avatar={level === 1 ? LevelOneAvatar : LevelTwoAvatar } />
      <MapWithHero show={mapVisible} addScore={addScore} savePrisoner={savePrisoner} Avatar={level === 1 ? AvatarOneOnMap : AvatarTwoOnMap} /> 
    </main>  
  );
}

// <EntranceCave><DraggableList items={'Alfa Beta Gamma Delta'.split(' ')} /></EntranceCave>,