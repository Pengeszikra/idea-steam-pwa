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
import { area } from '../caves/applicationData';

const ActualGame = showtime(({onClick}) => <SimpleDarkBg onClick={onClick}><PrisonerOne /></SimpleDarkBg>);

export default ({setWay, scoreStore}) => {
  // const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [{route, score, saved, level}, dispatch] = scoreStore;
  // const handleRoute = path => event => dispatch(changeRoute(path));
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
  const [speakNumber, setSpeakNumber] = useState(0);
  // const [caveNumber, setCaveNumber] = useState(0);
  const [walk, setWalk] = useState({from: area.Q.map, to:null});
  const [underWalk, setUnderWalk] = useState(false);  
  const [sceneId, setScene] = useState('Q');
  const [gameOngoing, playGame] = useState(false);

  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleCloseMap = () => setMapVisiblity(false);
  const handleInventory = () => {
    setScene('Y');
    setSocrates(false);
  };
  const handlePrisoner = () => {
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
    handleRoute: path => e => {      
      const [currentAreaId, targetAreaId] = path.split('-');
      setWalk(area[currentAreaId].walk);
      setMapVisiblity(true);
      setUnderWalk(true);
      setTimeout(() => setWalk(area[targetAreaId].walk), 900); 
      setTimeout(() => setScene(targetAreaId), 1700);
      setTimeout(() => {
        setMapVisiblity(false);
        setUnderWalk(false);
      }, 2000);       
    },
  };

  const prisonerInteraction = {
    handleTryToRelease: (prisoner, speakNumber) => e => {
      talkSocrates(speakNumber)
    }
  };

  return (
    <main className="graph-frame">      
      <Scenes 
        sceneId={sceneId} 
        level={level} 
        talkSocrates={talkSocrates} 
        interaction={{...mapInteraction, ...prisonerInteraction}}
      />            
      <SocratesSpeaking show={hasSocrates && !mapVisible} speak={speaks[speakNumber]} level={level} handleStopSpeak={e=>setSocrates(false)} />
      <BottomBar 
        // handleRoute = {handleRoute} 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />      
      <ActualGame show={gameOngoing} onClick={()=>playGame(false)}/>
      <HeaderBar score={score} saved={saved} setWay={setWay} Avatar={level === 1 ? LevelOneAvatar : LevelTwoAvatar } />
      <MapWithHero 
        show={mapVisible}
        Avatar={level === 1 ? AvatarOneOnMap : AvatarTwoOnMap} 
        handleCloseMap={handleCloseMap} 
        walk={walk}
        underWalk={underWalk}
        // caveNumber={caveNumber} 
        // setCaveNumber={setCaveNumber}
      /> 
    </main>  
  );
}

// <EntranceCave><DraggableList items={'Alfa Beta Gamma Delta'.split(' ')} /></EntranceCave>,