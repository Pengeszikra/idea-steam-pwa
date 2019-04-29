import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import { whoIsTheHero, cavePositions } from '../caves/applicationData';
import ThreeDimensionTest from '../show/ThreeDimensionTest';
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
import ThreeArea from '../show/ThreeArea';
import * as THREE from 'three';

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

const GEOMS = {
  box: (w,h,d) => new THREE.BoxGeometry( w , h , d, 1, 1, 1 ),
  dedocahedron: (w,h,d) => new THREE.DodecahedronGeometry(d),
  icosahedron: (w,h,d) => new THREE.IcosahedronGeometry(d),
  octahedron: (w,h,d) => new THREE.OctahedronGeometry(d),
  plane: (w,h,d) => new THREE.PlaneGeometry( w, h, d ),
  tetrahedron: (w,h,d) => new THREE.TetrahedronGeometry(d),
}

function makeShape( geomMaker, w , h , d , color, opacity = .7 ) {
  //const geom = new THREE.BoxGeometry( w , h , d, 1, 1, 1 );    
  // const geom = new THREE.DodecahedronGeometry(d);  
  //const geom = new THREE.IcosahedronGeometry(d,0);
  const geom = geomMaker(w,h,d);
  const flatShading = THREE.FlatShading;
  const mat = new THREE.MeshLambertMaterial( {color, flatShading, opacity } );
  return new THREE.Mesh( geom, mat );
}

const turnContent = geom => ({scene}) => {

  // make 3d object
  const RAD = 180/Math.PI
  const box = makeShape(geom, 100, 100, 100, 0xBBCCDD );
  //box.rotateZ(12 / RAD);
  //box.rotateX(32 / RAD);    
  scene.add(box); 

  // animation
  return () => {
    const boxMoving = setInterval( () => box.rotateY( 2/RAD ) , 30 );
    // unsubscribe
    return () => clearInterval(boxMoving);
  }
}

const Scenes = ({scene, playGame}) => {
  return [
    <CityWithLogo />,
    <EntranceCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.box)}/></EntranceCave>,
    <RedCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.dedocahedron)}/></RedCave>,
    <LongCave onClick={()=>playGame(true)}><ItemOne /></LongCave>,
    <BlueCave />,
    <WaterFallCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.icosahedron)}/></WaterFallCave>,
    <LightCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.octahedron)}/></LightCave>,
    <FangCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.plane)}/></FangCave>,
    <StairCaseCave />,
    <NeedleCave><ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(GEOMS.tetrahedron)}/></NeedleCave>,
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

export default ({setWay}) => {
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
      <HeaderBar score={score} saved={saved} setWay={setWay} />
      <MapWithHero show={mapVisible} addScore={addScore} savePrisoner={savePrisoner} />      
    </main>  
  );
}
