import React, {useState, useReducer, useEffect} from 'react';
import '../styles/graphic.scss';
import '../styles/caves.scss';
import {
  LevelOneAvatar,
  PrisonerOne,
  SimpleDarkBg,
  LevelTwoAvatar,
  AvatarOneOnMap,
  AvatarTwoOnMap,
} from '../styles/divStore';
import showtime from '../utils/showtime';
import SocratesSpeaking from './SocratesSpeaking';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import MapWithHero from './MapWithHero';
import Scenes from '../story/Scenes';
import { area } from '../engine/applicationData';
import { storyReducer, storyInitial, achiveScore, moveToArea } from '../engine/reducers';

const ActualGame = showtime(({onClick}) => <SimpleDarkBg onClick={onClick}><PrisonerOne /></SimpleDarkBg>);

export default ({setWay, scoreStore}) => {
  const [{score, saved, level, position}, dispatch] = useReducer(storyReducer, storyInitial);
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
    dispatch(moveToArea('Y'));
    setSocrates(false);
  };
  const handlePrisoner = () => {
    dispatch(achiveScore(10));
    console.log(position, score);
  };  
  const handleHistory = () => {
    setSocrates(!hasSocrates);    
  };  
  
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
      setTimeout(() => {
        setScene(targetAreaId)
        dispatch(moveToArea(targetAreaId));
      }, 1700);
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
        sceneId={position}
        level={level} 
        talkSocrates={talkSocrates} 
        interaction={{...mapInteraction, ...prisonerInteraction}}
        prisonerProps = {{}}
        itemProps = {{}}
      />            
      <SocratesSpeaking show={hasSocrates && !mapVisible} speak={talk} level={level} handleStopSpeak={e=>setSocrates(false)} />
      <BottomBar 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />      
      <ActualGame show={gameOngoing} onClick={()=>playGame(false)}/>
      <HeaderBar score={score} saved={saved.length} setWay={setWay} Avatar={level === 1 ? LevelOneAvatar : LevelTwoAvatar } />
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