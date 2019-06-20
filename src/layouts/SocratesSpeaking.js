import React from 'react';
import showtime from '../utils/showtime';
import { Socrates, SocratesHolder, SocratesAvatar, SpeakText } from '../styles/divStore';

export default showtime(({speakAbout, handleStopSpeak}) => {
  return (
    <Socrates onClick={handleStopSpeak} >
      <SocratesHolder>
        <SocratesAvatar />
        <SpeakText>{speakAbout}</SpeakText>
      </SocratesHolder>
    </Socrates>
  )  
});