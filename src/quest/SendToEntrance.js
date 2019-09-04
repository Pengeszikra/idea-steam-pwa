import React, {useEffect, useState} from 'react';
import { SimpleDarkBg, TopRock, RockFormation, BlueCave, Item, IntroButton, ItemMatrix, CenterFlex } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import noprop from '../utils/noprop';
import { includes, equals } from 'ramda';
import { cave_2_11, itemNamesLup } from '../engine/applicationData';



const equipment = ['C1','C2','D1','D2','E1','E2','F1','F2','G1','G2','H1','H2'];

export default ({interaction, level = 1}) => {
  const {questResultIs, checkItem, makeAlternateQuest} = interaction;
  const [isSpeak, talking] = useState(true);
  const [selected, setSelect] = useState({});
  useEffect(()=>{
    // questResultIs(true);
    // makeAlternateQuest('Y');
    
    console.log('--- enter to the dark room ---');
    
    // console.log(`found K : C1 :: ${checkItem('C1', 'K')}`);
    
  },[]);

  const handlePutItem = itemId => e => {
    console.log(itemId)
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
        opacity: selected[itemId] ? 1 : .3,
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
        show={isSpeak} 
        speakAbout={cave_2_11.mission('Mr. Foo')} 
        level={level} 
        handleStopSpeak={()=> talking(false)}
      />

      {!isSpeak && (
        <>
          <ItemMatrix>{Equipment}</ItemMatrix>
          <CenterFlex style={{margin: '2em'}}>
            <IntroButton onClick={checkFireInitiated}>Tűzgyújtás</IntroButton>
          </CenterFlex>
          <h1>{cave_2_11.mission('Mr. Foo')}</h1>
        </>
      )}
      
    </main>
  );
};

