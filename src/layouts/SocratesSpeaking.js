import React from 'react';
import showtime from '../utils/showtime';
import { Socrates, SocratesHolder, SocratesAvatar, SpeakText } from '../styles/divStore';
import { avatarNames } from '../engine/applicationData';

export default showtime(({speak, level, handleStopSpeak}) => {
  return (
    <Socrates onClick={handleStopSpeak} >
      <SocratesHolder>
        <SocratesAvatar />
        <SpeakText>{speak(avatarNames(level))}</SpeakText>
      </SocratesHolder>
    </Socrates>
  )  
});