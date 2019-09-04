import React, {useEffect, useState} from 'react';
import { SimpleDarkBg, TopRock, RockFormation, BlueCave, Item, IntroButton, ItemMatrix, CenterFlex, IntroButtonHolder } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import noprop from '../utils/noprop';
import { includes, equals } from 'ramda';
import { cave_2_11, itemNamesLup } from '../engine/applicationData';
import { avatarNames } from './../engine/applicationData';

export default ({interaction, level = 1}) => {
  const {itemList, handleRoute} = interaction;
  const [phase, setPhase] = useState(0);
  const [selected, setSelect] = useState({});
  const [equipment] = useState(itemList());

  const handlePutItem = itemId => e => {    
    let list = {...selected};
    if (selected[itemId]) {
      delete list[itemId];
      setSelect(list);
    } else {
      list[itemId] = true;
      setSelect(list);
    }    
  }

  const checkFireInitiated = () => {
    const isFireInitiated = equals(selected, {D1: true, E1: true, G2: true, H2: true});
    console.log( `isFireInitiated :: ${isFireInitiated}`  )
  }

  const Equipment = equipment.map(itemId => 
    <Item 
      data-item={itemId} 
      key={`itm-${itemId}`} 
      style={{
        position: 'relative',
        display: 'inline-block',
        top: 0,
        left: 0,
        margin: '1em 1em 3em 1em',
        opacity: selected[itemId] ? 1 : .4,
      }}
      onClick={noprop(handlePutItem(itemId))} 
    ><span>{itemNamesLup[itemId]}</span></Item>
  );

  return (
    <main className="graph-frame">
      <BlueCave style = {{filter:'brightness(.1)'}}/>
      <TopRock show={true} style = {{filter:'brightness(.5)'}}/>
      <RockFormation show={true} style = {{filter:'brightness(.5)'}}/>
      <SocratesSpeaking        
        show={phase === 0} 
        speakAbout={cave_2_11.mission(avatarNames(level))} 
        level={level} 
        handleStopSpeak={()=> setPhase(1)}
        style={{filter:'brightness(0.3) hue-rotate(190deg)'}}
      />

      {phase === 1 && (
        <>
          <ItemMatrix>{Equipment}</ItemMatrix>
          <IntroButtonHolder>
            <IntroButton onClick={handleRoute('L-K')}>Visszalépés</IntroButton>
            <IntroButton onClick={checkFireInitiated}>Tűzgyújtás</IntroButton>
          </IntroButtonHolder>
          <h1>{cave_2_11.mission(avatarNames(level))}</h1>
        </>
      )}
      
    </main>
  );
};

/*

  useEffect(()=>{
    // questResultIs(true);
    // makeAlternateQuest('Y');
    console.log('--- enter to the dark room ---');
    // console.log(`found K : C1 :: ${checkItem('C1', 'K')}`);    
  },[]);

*/