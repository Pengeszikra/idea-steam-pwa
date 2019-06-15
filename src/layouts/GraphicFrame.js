import React, {useState} from 'react';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import {
  LevelOneAvatar,
  PrisonerOne,
  SimpleDarkBg,
  LevelTwoAvatar,
  AvatarOneOnMap,
  AvatarTwoOnMap,
} from '../layouts/divStore';
import showtime from './showtime';
import speaks from '../caves/speaks';
import SocratesSpeaking from './SocratesSpeaking';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import MapWithHero from './MapWithHero';
import Scenes from '../story/Scenes';

const ActualGame = showtime(({onClick}) => <SimpleDarkBg onClick={onClick}><PrisonerOne /></SimpleDarkBg>);

export default ({setWay, scoreStore}) => {
  // const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved, level}, dispatch] = scoreStore;
  const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
  const [speakNumber, setSpeakNumber] = useState(0);
  const [caveNumber, setCaveNumber] = useState(0);
  const [underWalk, setUnderWalk] = useState(false);
    
  const [scene, setScene] = useState(0);

  const [gameOngoing, playGame] = useState(false);

  // useEffect(()=>{console.log('--- graphic-frame-v0.3.4.5 ---')},[])
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleCloseMap = () => setMapVisiblity(false);
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

  const mapInteraction = {
    handleRoute: (from, to, targetScene = to) => e => {
      setCaveNumber(from);
      setMapVisiblity(true);
      setUnderWalk(true);
      setTimeout(() => setCaveNumber(to), 900); 
      setTimeout(() => setScene(targetScene), 1700);
      setTimeout(() => {
        setMapVisiblity(false);
        setUnderWalk(false);
      }, 2000);       
    },
  }

  const prisonerInteraction = {
    handleTryToRelease: (prisoner, speakNumber) => e => {
      talkSocrates(speakNumber)
    }
  }

  return (
    <main className="graph-frame">      
      <Scenes 
        scene={scene} 
        level={level} 
        talkSocrates={talkSocrates} 
        interaction={{...mapInteraction, ...prisonerInteraction}}
      />            
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
      <MapWithHero 
        show={mapVisible} 
        caveNumber={caveNumber} 
        Avatar={level === 1 ? AvatarOneOnMap : AvatarTwoOnMap} 
        handleCloseMap={handleCloseMap} 
        underWalk={underWalk}
        setCaveNumber={setCaveNumber}
      /> 
    </main>  
  );
}

// <EntranceCave><DraggableList items={'Alfa Beta Gamma Delta'.split(' ')} /></EntranceCave>,