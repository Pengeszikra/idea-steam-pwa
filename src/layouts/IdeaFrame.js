import React, {useState, useReducer, useEffect} from 'react';
import '../styles/graphic.scss';
import '../styles/caves.scss';
import {
  LevelOneAvatar,
  LevelTwoAvatar,
  AvatarOneOnMap,
  AvatarTwoOnMap,
} from '../styles/divStore';
import SocratesSpeaking from './SocratesSpeaking';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import MapWithHero from './MapWithHero';

import { area } from '../engine/applicationData';
import { storyReducer, storyInitial, achiveScore, moveToArea, walkOnMap, startWalk, stopWalk, stopTalk, continueTalk, socratesTalk, savePrisoner, getItem } from '../engine/reducers';
import CaveSystem from '../story/CaveSystem';

export default ({setWay, scoreStore}) => {
  const [{score, saved, level, position, walk, underWalk, speakAbout, hasSocrates, caveLookUp}, dispatch] = useReducer(storyReducer, storyInitial);
  
  const [mapVisible, setMapVisiblity] = useState(false); 
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleCloseMap = () => setMapVisiblity(false);
  const handleInventory = () => {
    dispatch(moveToArea('Y'));
    dispatch(stopTalk());
  };
  const handlePrisoner = () => dispatch(achiveScore(10));
  const handleHistory = () => dispatch(hasSocrates ? stopTalk() : continueTalk());
    
  const talkSocrates = speak => dispatch(socratesTalk(speak));
  const handleStopSpeak = () => dispatch(stopTalk());

  const mapInteraction = {
    handleRoute: path => e => {            
      const [currentPosition, targetPosition] = path.split('-');
      dispatch(walkOnMap(area[currentPosition].walk));      
      setMapVisiblity(true);
      dispatch(startWalk());
      setTimeout(() => dispatch(walkOnMap(area[targetPosition].walk)), 500); 
      setTimeout(() => dispatch(moveToArea(targetPosition)), 1000);
      setTimeout(() => {
        setMapVisiblity(false);
        dispatch(stopWalk());
      }, 1300);       
    },
    handleSavePrisoner: prisonerId => e => dispatch(savePrisoner(prisonerId)), 
    handleGetItem: itemId => e => dispatch(getItem(itemId)),
  };

  const prisonerInteraction = {
    handleTryToRelease: (prisoner, speak) => e => {
      talkSocrates(speak)
    }
  };

  return (
    <main className="graph-frame">      
      <CaveSystem 
        position={position}
        currentArea={caveLookUp[position]}
        level={level} 
        talkSocrates={talkSocrates} 
        interaction={{...mapInteraction, ...prisonerInteraction}}
      />            
      <SocratesSpeaking show={hasSocrates && !mapVisible} speakAbout={speakAbout} level={level} handleStopSpeak={handleStopSpeak} />
      <BottomBar 
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
      />      
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