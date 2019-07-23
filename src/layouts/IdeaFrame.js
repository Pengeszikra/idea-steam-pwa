import React, {useState} from 'react';
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
import { 
  moveToArea, walkOnMap, startWalk, stopWalk, stopTalk, continueTalk, socratesTalk, 
  savePrisoner, getItem, questSolved, outOfQuest, achiveScore, beginQuest, putDownItem,
  alternateQuest
} from '../engine/reducers';
import CaveSystem from '../story/CaveSystem';
import Inventory from './Inventory';
import showtime from '../utils/showtime';
import Teams from './Teams';
import MockQuest from '../quest/MockQuest';

export default ({setWay, storyStore}) => {
  const [{
    score, saved, equipment, level, position, walk, underWalk, 
    speakAbout, hasSocrates, caveLookUp, hasQuesting
  }, dispatch] = storyStore;

  const [mapVisible, setMapVisiblity] = useState(false); 
  const [inventoryVisible, setInventoryVisiblity] = useState(false);
  const [teamVisible, setTeamVisiblity] = useState(false);
  
  const handleMap = () => setMapVisiblity(visible => !visible);
  const handleCloseMap = () => setMapVisiblity(false);
  const handleInventory = () => setInventoryVisiblity(visible => !visible);
  const handlePrisoner = () => setTeamVisiblity(visible => !visible);
 
  const handleHistory = () => dispatch(hasSocrates ? stopTalk() : continueTalk());
  const handleStopSpeak = () => dispatch(stopTalk());

  const walkOnMinimap = path => {            
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
  };

  const questResultIs = (isSucces, currentPosition) => {
    if (isSucces) {
      dispatch(questSolved());
      dispatch(achiveScore(100 * level));
    } 
    dispatch(outOfQuest());    
    if (currentPosition === 'Q') {
      walkOnMinimap('Q-Y');
    }
  }

  const interaction = {
    handleRoute: path => e => walkOnMinimap(path),
    handleSavePrisoner: prisonerId => e => dispatch(savePrisoner(prisonerId)),
    handleGetItem: itemId => e => dispatch(getItem(itemId)),
    handlePutItem: itemId => e => {
      setInventoryVisiblity(false);
      dispatch(putDownItem(itemId));
    },
    monologBeforeQuest: speak => {
      dispatch(socratesTalk(speak));
      dispatch(beginQuest());
    },
    startQuest: () => dispatch(beginQuest()),
    questResultIs,
    checkItem: (itemId, pos = position) => caveLookUp[pos].items.indexOf(itemId) !== -1,
    makeAlternateQuest: Quest => dispatch(alternateQuest(Quest)),
  };

  const CollectedItems = showtime(Inventory);
  const SavedPrisoners = showtime(Teams);

  return (
    <main className="graph-frame">      
      <CaveSystem 
        position={position}
        currentArea={caveLookUp[position]}
        level={level} 
        interaction={interaction}
      />            
      <SocratesSpeaking show={hasSocrates} speakAbout={speakAbout} level={level} handleStopSpeak={handleStopSpeak} />
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
      <CollectedItems show={inventoryVisible} handleClose={() => setInventoryVisiblity(false)} equipment={equipment} interaction={interaction} />
      <SavedPrisoners show={teamVisible} handleClose={() => setTeamVisiblity(false)} saved={saved} />      
      <MockQuest show={hasQuesting && !hasSocrates} position={position} interaction={interaction} level={level} />
    </main>
  );
}