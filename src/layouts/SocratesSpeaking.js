import React from 'react';
import showtime from './showtime';
import { Socrates, SocratesHolder, SocratesAvatar, SpeakText } from '../layouts/divStore';
import { avatarNames } from '../caves/applicationData';

export default showtime(({speak, level, handleStopSpeak}) => (
  <Socrates onClick={handleStopSpeak} >
    <SocratesHolder>
      <SocratesAvatar />
      <SpeakText>{speak(avatarNames(level))}</SpeakText>
    </SocratesHolder>
  </Socrates>
));