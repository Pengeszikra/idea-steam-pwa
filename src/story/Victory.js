import React from 'react';
import { GreekCity, IntroHeader, IntroButton, IntroButtonHolder, UnderWater } from '../styles/divStore';
import { finale, avatarNames } from '../engine/applicationData';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import ModalScore from '../layouts/ModalScore';

export default ({level, reset, escape}) => {

  const end = finale.intro(avatarNames(level));

  return escape === 'F' ?  
    (    
      <GreekCity>
        <SocratesSpeaking show={true} speakAbout={end} />        
        <IntroButtonHolder>
          <IntroButton style={{bottom: '1em', top:'noset'}} onClick={reset}>Győzelem</IntroButton>
        </IntroButtonHolder>
      </GreekCity>
    )
  :
    (
      <UnderWater>
        <ModalScore show={true} score={'Nem sikrült kijutni.'} position={'B'} onClick={reset} />
      </UnderWater>
    );
};