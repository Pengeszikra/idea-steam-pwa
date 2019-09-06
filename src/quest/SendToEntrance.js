import React, {useEffect, useState} from 'react';
import { SimpleDarkBg, TopRock, RockFormation, BlueCave, Item, IntroButton, ItemMatrix, CenterFlex, IntroButtonHolder, PipelineQuest, ItemMatrixHolder } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import noprop from '../utils/noprop';
import { includes, equals } from 'ramda';
import { cave_2_11, itemNamesLup, cave_2_1_again } from '../engine/applicationData';
import { avatarNames } from './../engine/applicationData';

export default ({interaction, level = 1}) => {

  const {itemList, handleRoute, questResultIs} = interaction;
  const [phase, setPhase] = useState(0);
  const [selected, setSelect] = useState({});
  const [equipment] = useState(itemList());
  const [speak, talk] = useState(cave_2_11.mission(avatarNames(level)));

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

    if (!isFireInitiated) return setSelect({});

    setPhase(2)
    
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
        flex: '1 0 auto',
        // margin: '1em 1em 3em 1em',
        opacity: selected[itemId] ? 1 : .4,
      }}
      onClick={noprop(handlePutItem(itemId))} 
    ><span>{itemNamesLup[itemId]}</span></Item>
  );

  return (
    <main className="graph-frame">
      <BlueCave style = {{filter:`brightness(${phase < 2 ? .1 : 1})`}}/>
      <TopRock show={true} style = {{filter:`brightness(${phase < 2 ? .5 : 1})`}}/>
      <RockFormation show={true} style = {{filter:`brightness(${phase < 2 ? .5 : 1})`}}/>

      {phase === 1 && (
        <>
          <ItemMatrixHolder>
            <ItemMatrix>{Equipment}</ItemMatrix>
          </ItemMatrixHolder>
          <IntroButtonHolder>
            <IntroButton onClick={handleRoute('L-K')}>Visszalépés</IntroButton>
            <IntroButton onClick={checkFireInitiated}>Tűzgyújtás</IntroButton>
          </IntroButtonHolder>
          <h1>{cave_2_11.mission(avatarNames(level))}</h1>
        </>
      )}

      {phase === 2 && (
        <div>
          <IntroButton onClick={() => talk(cave_2_11.justWithKey())}>Láda</IntroButton>
          <IntroButton onClick={() => talk(cave_2_11.crashedDoor())}>Járat</IntroButton>
          <IntroButton onClick={() => setPhase(3)}>Átjut</IntroButton>
        </div>
      )}

      {phase === 3 && (
        <PipelineQuest>
          <p>{cave_2_1_again.mission()}<br/><br/>{'Siess! Tedd le a lantot az adott helyen!'}</p>
          <IntroButtonHolder>
            <IntroButton onClick={() => {
              questResultIs(true);    
              handleRoute('E-X')();
            }}>Indulok</IntroButton>
          </IntroButtonHolder>          
        </PipelineQuest>
      )}

      <SocratesSpeaking        
        show={!!speak} 
        speakAbout={speak} 
        level={level} 
        handleStopSpeak={()=> {
          if (phase === 0) {
            setPhase(1); 
            talk('');
          }

          if (phase === 2) {
            talk('')
          }
          
        }}
        style={phase === 0 ? {filter:'brightness(0.3) hue-rotate(190deg)'} : {}}
      />
      
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

/*

  const holder = {
    display: 'flex',
    position: 'relative',
    width: '100vw',
    overflow: 'scroll',
  };

  const animal = {
    fontSize: '7em',
    position: 'relative',
    userSelect: 'none',
    marginLeft: '.2em',    
  };

*/