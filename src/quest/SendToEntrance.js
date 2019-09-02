import React, {useEffect, useState} from 'react';
import { SimpleDarkBg, TopRock, RockFormation, BlueCave, Item } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

const equipment = ['C1','C2','D1','D2','E1','E2','F1','F2','G1','G2','H1','H2'];

export default ({interaction, level = 1}) => {
  const {questResultIs, checkItem, makeAlternateQuest} = interaction;
  const [isSpeak, talking] = useState(true);
  useEffect(()=>{
    // questResultIs(true);
    // makeAlternateQuest('Y');
    
    console.log('--- enter to the dark room ---');
    
    // console.log(`found K : C1 :: ${checkItem('C1', 'K')}`);
    
  },[]);

  const Equipment = equipment.map(itemId => 
    <Item 
      data-item={itemId} 
      key={`itm-${itemId}`} 
      style={{
        position: 'relative',
        display: 'inline-block',
        top: 0,
        left: 0,
        margin: '1em',
      }}
      // onClick={noprop(handlePutItem(itemId))} 
    />
  );

  return (
    <main className="graph-frame">
      <BlueCave style = {{filter:'brightness(.1)'}}/>
      <TopRock show={true} style = {{filter:'brightness(.5)'}}/>
      <RockFormation show={true} style = {{filter:'brightness(.5)'}}/>
      <SocratesSpeaking 
        show={isSpeak} 
        speakAbout={'--- itt a szobaban minden sotet ---'} 
        level={level} 
        handleStopSpeak={()=> talking(false)}
      />
      {!isSpeak && Equipment}
    </main>
  );
};

