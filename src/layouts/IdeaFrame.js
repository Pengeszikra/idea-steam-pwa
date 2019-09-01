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
  alternateQuest, showModal, setModal
} from '../engine/reducers';
import CaveSystem from '../story/CaveSystem';
import Inventory from './Inventory';
import showtime from '../utils/showtime';
import Teams from './Teams';
import MockQuest from '../quest/MockQuest';
import Victory from '../story/Victory';
import PlayerInfo from './PlayerInfo';
import { avatarNames } from './../engine/applicationData';

export default ({setWay, storyStore}) => {
  const [{
    score, saved, equipment, level, position, walk, underWalk, 
    speakAbout, hasSocrates, caveLookUp, hasQuesting, finalQuestSolved, lightUp,
    mapVisible, inventoryVisible, teamVisible, playerInfoVisible, startOfPlay
  }, dispatch] = storyStore;

  const setMapVisiblity = visible => dispatch(setModal({map: visible}));
  const setInventoryVisiblity = visible => dispatch(setModal({inventory: visible}));
  const setTeamVisiblity = visible => dispatch(setModal({team: visible}));
  
  const handleMap = () => setMapVisiblity(!mapVisible);
  const handleCloseMap = () => setMapVisiblity(false);
  const handleInventory = () => setInventoryVisiblity(!inventoryVisible);
  const handlePrisoner = () => setTeamVisiblity(!teamVisible);
  
  // position dependency injected ! 
  const handlePlayerInfo = () => position !== 'Q' && dispatch(setModal({playerInfo: !playerInfoVisible}));
 
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

  const questResultIs = (isSucces, currentPosition, score = 0) => {
    if (isSucces) {
      dispatch(questSolved());
      dispatch(achiveScore(score));
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
    checkItem: (itemId, pos = posiFinstion) => caveLookUp[pos].items.indexOf(itemId) !== -1,
    makeAlternateQuest: pos => dispatch(alternateQuest(pos)),
    checkSecret: (pos = position) => caveLookUp[pos].secret,
    instruction: areaData[position].data.mission 
      ? areaData[position].data.mission(avatarNames(level))
      : `mission text is empty cave: [${position}]`,
  };

  if (finalQuestSolved) return <Victory level={level} reset={()=>setWay(3)}/>;

  return (
    <main className="graph-frame">      
      <CaveSystem 
        position={position}
        currentArea={caveLookUp[position]}
        level={level} 
        interaction={interaction}
        lightUp={lightUp}
      />            
      <Inventory show={inventoryVisible} handleClose={() => setInventoryVisiblity(false)} equipment={equipment} interaction={interaction} />
      <Teams show={teamVisible} handleClose={() => setTeamVisiblity(false)} saved={saved} />      
      <SocratesSpeaking show={hasSocrates} speakAbout={speakAbout} level={level} handleStopSpeak={handleStopSpeak} onFrame={position !== 'Q'} />
      <PlayerInfo 
        level={level} 
        score={score}
        saved={saved.length}
        startOfPlay={startOfPlay}
        solved={Object.keys(caveLookUp).reduce((acc, key) => acc = caveLookUp[key].solved ? acc + 1 : acc , -3)}
        show={playerInfoVisible} 
      setWay={setWay}
      />
      <BottomBar 
        show={position !== 'Q'}
        handleMap={handleMap} 
        handlePrisoner={handlePrisoner} 
        handleInventory={handleInventory} 
        handleHistory={handleHistory}
        equipment={equipment}
        saved={saved}
        position={position}
      />      
      <HeaderBar 
        score={score} 
        saved={saved.length}         
        Avatar={level === 1 ? LevelOneAvatar : LevelTwoAvatar } 
        handlePlayerInfo={handlePlayerInfo}
      />
      <MapWithHero 
        show={mapVisible}
        Avatar={level === 1 ? AvatarOneOnMap : AvatarTwoOnMap} 
        handleCloseMap={handleCloseMap} 
        handlePlayerInfo={handlePlayerInfo}
        walk={walk}
        underWalk={underWalk}
        solvedCaves={Object.keys(caveLookUp).filter(key => caveLookUp[key].solved)}
      />
      <MockQuest show={hasQuesting && !hasSocrates} position={position} interaction={interaction} level={level} />
    </main>
  );
}