import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import { whoIsTheHero, cavePositions, cave_2_1, avatarNames } from '../caves/applicationData';
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
  PrisonerOne,
  ItemOne,
  ChainCave,
  BuildingCave,
  WheelCave,
  EnginerCave,
} from '../layouts/divStore';
import showtime from './showtime';
import {Add3D, GEOMS, GameWith3dObjects} from '../show/Geometries';
import DescriptionOfHistory from '../show/DescriptionOfHistory';
import speaks from '../caves/speaks';

const HeaderBar = ({score, saved, setWay}) => (
  <HeaderBarSection>
    <LevelOneAvatar onClick={()=>setWay(2)} />
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
    <EntranceCave><Add3D content={GEOMS.box}/></EntranceCave>,
    <RedCave><Add3D content={GEOMS.dedocahedron}/></RedCave>,
    <LongCave onClick={()=>playGame(true)}><ItemOne /></LongCave>,
    <BlueCave><GameWith3dObjects /></BlueCave>,
    <WaterFallCave><Add3D content={GEOMS.icosahedron}/></WaterFallCave>,
    <LightCave><Add3D content={GEOMS.octahedron}/></LightCave>,
    <FangCave><Add3D content={GEOMS.plane}/></FangCave>,
    <StairCaseCave />,
    <NeedleCave><Add3D content={GEOMS.tetrahedron}/></NeedleCave>,
    <ChainCave><Add3D content={GEOMS.cone}/></ChainCave>,
    <BuildingCave />,
    <WheelCave></WheelCave>,
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

export default ({setWay}) => {
  const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved, level}, dispatch] = scoreStore;
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
  const [speakNumber, setSpeakNumber] = useState(0);
    
  const [scene, setScene] = useState(1);

  const [gameOngoing, playGame] = useState(false);
  
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

  return (
    <main className="graph-frame">      
      <Scenes scene={scene} playGame={playGame}/>            
      <SocratesSpeaking show={hasSocrates && !mapVisible}><span>{speaks[speakNumber](avatarNames(level))}</span></SocratesSpeaking>
      <BottomBar 
        handleRoute = {handleRoute} 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />      
      <ActualGame show={gameOngoing} onClick={()=>playGame(false)}/>
      <HeaderBar score={score} saved={saved} setWay={setWay} />
      {/* <DescriptionOfHistory show={hasSocrates && !mapVisible}/> */}
      <MapWithHero show={mapVisible} addScore={addScore} savePrisoner={savePrisoner} />      
    </main>  
  );
}
