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

import { areaData } from '../engine/applicationData';
import { moveToArea, walkOnMap, startWalk, stopWalk, stopTalk, continueTalk, socratesTalk, savePrisoner, getItem } from '../engine/reducers';
import CaveSystem from '../story/CaveSystem';
import Inventory from './Inventory';
import showtime from '../utils/showtime';
import Teams from './Teams';

export default ({setWay, storyStore}) => {
  const [{score, saved, equipment, level, position, walk, underWalk, speakAbout, hasSocrates, caveLookUp}, dispatch] = storyStore;
  
  const [mapVisible, setMapVisiblity] = useState(false); 
  const [inventoryVisible, setInventoryVisiblity] = useState(false);
  const [teamVisible, setTeamVisiblity] = useState(false);
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleCloseMap = () => setMapVisiblity(false);
  const handleInventory = () => setInventoryVisiblity(visible => !visible);
  const handlePrisoner = () => setTeamVisiblity(visible => !visible);
  
  const handleHistory = () => dispatch(hasSocrates ? stopTalk() : continueTalk());
    
  const talkSocrates = speak => dispatch(socratesTalk(speak));
  const handleStopSpeak = () => dispatch(stopTalk());

  const mapInteraction = {
    handleRoute: path => e => {            
      const [currentPosition, targetPosition] = path.split('-');
      dispatch(walkOnMap(areaData[currentPosition].walk));      
      setMapVisiblity(true);
      dispatch(startWalk());
      setTimeout(() => dispatch(walkOnMap(areaData[targetPosition].walk)), 500); 
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

  const CollectedItems = showtime(Inventory);
  const SavedPrisoners = showtime(Teams);

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
        equipment={equipment}
        saved={saved}
      />      
      <HeaderBar score={score} saved={saved.length} setWay={setWay} Avatar={level === 1 ? LevelOneAvatar : LevelTwoAvatar } />
      <MapWithHero 
        show={mapVisible}
        Avatar={level === 1 ? AvatarOneOnMap : AvatarTwoOnMap} 
        handleCloseMap={handleCloseMap} 
        walk={walk}
        underWalk={underWalk}
      />
      <CollectedItems show={inventoryVisible} handleClose={() => setInventoryVisiblity(false)} equipment={equipment} />
      <SavedPrisoners show={teamVisible} handleClose={() => setTeamVisiblity(false)} saved={saved} />
    </main>
  );
}