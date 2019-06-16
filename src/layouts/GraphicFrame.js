import React, {useState} from 'react';
import { changeRoute, scoreReducer, scoreInitial, achiveScore, releasePrisoner } from '../flow/action';
import '../styles/graphic.scss';
import '../styles/caves.scss';
import {
  LevelOneAvatar,
  PrisonerOne,
  SimpleDarkBg,
  LevelTwoAvatar,
  AvatarOneOnMap,
  AvatarTwoOnMap,
} from '../layouts/divStore';
import showtime from './showtime';
import SocratesSpeaking from './SocratesSpeaking';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import MapWithHero from './MapWithHero';
import Scenes from '../story/Scenes';
import { area } from '../caves/applicationData';

const ActualGame = showtime(({onClick}) => <SimpleDarkBg onClick={onClick}><PrisonerOne /></SimpleDarkBg>);

export default ({setWay, scoreStore}) => {
  const [{route, score, saved, level}, dispatch] = scoreStore;
  const [mapVisible, setMapVisiblity] = useState(false);
  const [hasSocrates, setSocrates] = useState(false);
  const [talk, setTalk] = useState(_ => _ => "");
  const [walk, setWalk] = useState(area.Q.walk);
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
  };  
  
  const addScore = n => dispatch(achiveScore(n));
  const savePrisoner = () => dispatch(releasePrisoner());
  const talkSocrates = speak => {
    setTalk(_ => speak);
    setSocrates(true);    
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
    handleTryToRelease: (prisoner, speak) => e => {
      talkSocrates(speak)
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
      <SocratesSpeaking show={hasSocrates && !mapVisible} speak={talk} level={level} handleStopSpeak={e=>setSocrates(false)} />
      <BottomBar 
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
      /> 
    </main>
  );
}