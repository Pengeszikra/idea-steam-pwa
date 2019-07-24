import React from 'react';
import { GreekCity, IntroHeader, IntroButton, IntroButtonHolder } from '../styles/divStore';
import { finale, avatarNames } from '../engine/applicationData';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

export default ({level, reset}) => {

  const end = finale.intro(avatarNames(level));

  return (
    <GreekCity>
      <SocratesSpeaking show={true} speakAbout={end} />        
      <IntroButtonHolder>
        <IntroButton style={{bottom: '1em', top:'noset'}} onClick={reset}>Győzelem</IntroButton>
      </IntroButtonHolder>
    </GreekCity>
  );
};