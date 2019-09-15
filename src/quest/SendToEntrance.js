import React, {useState} from 'react';
import { TopRock, RockFormation, BlueCave, Item, IntroButton, ItemMatrix, CenterFlex, IntroButtonHolder, PipelineQuest, 
  ItemMatrixHolder, Chest, RedButton, RedAnswer, EquipmentMatrixHolder, EquipmentItem } from '../styles/divStore';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import noprop from '../utils/noprop';
import * as R from 'ramda';
import { cave_2_11, itemNamesLup, cave_2_1_again } from '../engine/applicationData';
import { avatarNames } from './../engine/applicationData';
import { shuffle } from './../utils/randoms';
import ModalScore from '../layouts/ModalScore';

const fireEquipment = {D1: true, E1: true, G2: true, H2: true};

export default ({interaction, level = 1}) => {

  const {itemList, handleRoute, questResultIs, getEscape, setEscape} = interaction;
  const [phase, setPhase] = useState(0);
  const [selected, setSelect] = useState({});
  const [equipment, useEquipment] = useState(itemList());
  const [speak, talk] = useState(cave_2_11.mission(avatarNames(level)));
  const [reflectWrong, setWrong] = useState(false);
  //const [escape, setEscape] = useState(false);

  const underPhase = R.includes(phase);

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
    const isFireInitiated = R.equals(selected, fireEquipment);

    if (!isFireInitiated) return setSelect({});

    const keys = R.keys(selected);
    useEquipment(keys)
    setPhase(1.5);
    setTimeout(() => setPhase(2), 1000);
  }

  const Equipment = equipment.map(itemId => 
    <EquipmentItem 
      data-item={itemId} 
      key={`itm-${itemId}`} 
      style={{ opacity: selected[itemId] ? 1 : .4 }}
      onClick={noprop(handlePutItem(itemId))} 
    ><span>{itemNamesLup[itemId]}</span></EquipmentItem>
  );

  const Selected = R.keys(selected).map(itemId => <EquipmentItem data-item={itemId} key={`itm-${itemId}`}><span>{itemNamesLup[itemId]}</span></EquipmentItem> );  

  const possibleResult = {
    bad: 'Nem jó megoldás!', 
    good: 'Helyes válasz!', 
    run: 'Menekülj!'
  };

  const answerIs = (goodAnswer, answer) => event => {
    if ( goodAnswer !== 'run') return setWrong(goodAnswer === answer ? 'good' : 'bad');
    setEscape(answer);
    setWrong('run');
  }

  return (
    <main className="graph-frame final-quest">
      <BlueCave style = {{filter:`brightness(${phase < 2 ? .1 : 1})`}}/>
      <TopRock show={true} style = {{filter:`brightness(${phase < 2 ? .5 : 1})`}}/>
      <RockFormation show={true} style = {{filter:`brightness(${phase < 2 ? .5 : 1})`}}/>

      {underPhase([1,1.5]) && (
        <>
          <EquipmentMatrixHolder style={{top: '60vmin'}}><ItemMatrix>{Selected}</ItemMatrix></EquipmentMatrixHolder>
          {phase === 1 && (
            <>
              <ItemMatrixHolder><ItemMatrix style={{justifyContent: 'flex-start'}}>{Equipment}</ItemMatrix></ItemMatrixHolder>
              <IntroButtonHolder>
                <IntroButton onClick={handleRoute('L-K')}>Visszalépés</IntroButton>
                <IntroButton onClick={checkFireInitiated}>Tűzgyújtás</IntroButton>
              </IntroButtonHolder>
            </>
          )}          
        </>
      )}

      {underPhase([2,3,4,5]) && (
        <div>          
          <Chest show={phase < 5} onClick={() => {
            if (!underPhase([2,3,4])) return;
            if (R.equals(selected, {F1: true})) {
              talk("Sikerült kinyitnod a ládát, remélem megtalálod a kiutat!");
              setPhase(5);
            } else {
              talk(cave_2_11.justWithKey())
              const items = itemList();
              const used = R.keys(fireEquipment);
              setSelect({});
              useEquipment(R.without(used, items));
              setPhase(3);  
            }
          }} />
          { phase === 4 && <EquipmentMatrixHolder><ItemMatrix>{Equipment}</ItemMatrix></EquipmentMatrixHolder>}
        </div>
      )}

      {underPhase([10, 11, 12, 13, 15]) && (
        <PipelineQuest>
          <RedAnswer show={phase == 11}>
            <p>{cave_2_1_again.question1()}</p>
            {['K','H','G','J'].map(answer => <RedButton key={answer} show={true} onClick={answerIs('G', answer)}>{answer}</RedButton>)}
          </RedAnswer>
          <RedAnswer show={phase == 12}>
            <p>{cave_2_1_again.question2()}</p>
            {[12,11,10,9,1].map(answer => <RedButton key={answer} show={true} onClick={answerIs(12, answer)}>{answer}</RedButton>)}
          </RedAnswer>
          <RedAnswer show={phase == 13}>
            <p>{cave_2_1_again.question3()}</p>
            {['D','E','F','J'].map(answer => <RedButton key={answer} show={true} onClick={answerIs('run', answer)}>{answer}</RedButton>)}
          </RedAnswer>          
          <ModalScore score={possibleResult[reflectWrong]} show={reflectWrong} onClick={() => {
            if (reflectWrong === 'good') setPhase(p => p + 1);
            if (reflectWrong === 'run') {
              setPhase(15);
              talk(`Vidd biztos helyre a felszabadítottakat, úgy gondolod ${avatarNames(level)}, hogy a ${getEscape()} barlangon keresztül visz az út a szabadba`);              
            }
            setWrong(false);            
          }} /> 
        </PipelineQuest>
      )}

      <SocratesSpeaking        
        show={!!speak} 
        speakAbout={speak} 
        level={level} 
        handleStopSpeak={()=> {
          if (phase === 0) { talk(''); setPhase(1); }
          if (underPhase([2, 10])) { talk('') }
          if (phase === 3) { talk(''); setPhase(4) }
          if (phase === 5) { 
            talk(''); 
            setPhase(10);
            setTimeout(() => talk(cave_2_1_again.intro(avatarNames(level))), 300);
          }
          if (phase === 10) { talk(''); setPhase(11) }
          if (phase === 15) {
            talk('');
            questResultIs(true);
            handleRoute('L-K')();
          }
        }}
        style={phase === 0 ? {filter:'brightness(0.3) hue-rotate(190deg)'} : {}}
      />      
    </main>
  );
};

/*

          <IntroButton onClick={() => talk(cave_2_11.crashedDoor())}>Járat</IntroButton>
          <IntroButton onClick={() => {
            setPhase(10);
            talk(cave_2_1_again.question1());
          }}>Átjut</IntroButton>

          <p>{cave_2_1_again.mission()}<br/><br/>{'Siess! Tedd le a lantot az adott helyen!'}</p>

*/