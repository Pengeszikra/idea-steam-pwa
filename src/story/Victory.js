import React, {useState} from 'react';
import { GreekCity, IntroHeader, IntroButton, IntroButtonHolder, UnderWater } from '../styles/divStore';
import { finale, avatarNames } from '../engine/applicationData';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import ModalScore from '../layouts/ModalScore';
import Stem from './Stem';

export default ({level, reset, escape}) => {
  const [phase, setPhase] = useState(escape);
  const toStemWelcome = () => setPhase('STEM');
  const end = finale.intro(avatarNames(level));

  switch(phase) {
    case 'F' : return (    
      <GreekCity>
        <SocratesSpeaking show={true} speakAbout={end} />        
        <IntroButtonHolder>
          <IntroButton style={{bottom: '1em', top:'noset'}} onClick={toStemWelcome}>Győzelem</IntroButton>
        </IntroButtonHolder>
      </GreekCity>
    );

    case 'STEM' : return (
      <Stem reset={reset} />
    );
  
    default: return (
      <UnderWater>
        <ModalScore show={true} score={'Nem sikrült kijutni.'} position={'B'} onClick={toStemWelcome} />
      </UnderWater>
    );
  }
};