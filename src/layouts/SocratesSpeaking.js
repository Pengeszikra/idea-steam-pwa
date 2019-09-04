import React from 'react';
import showtime from '../utils/showtime';
import { Socrates, SocratesHolder, SocratesAvatar, SpeakText } from '../styles/divStore';

export default showtime(({speakAbout, handleStopSpeak, onFrame = false, style={}}) => {
  return (
    <Socrates onClick={handleStopSpeak} style={style}>
      <SocratesHolder data-on-frame={onFrame} >
        <SocratesAvatar />
        <SpeakText>{speakAbout}</SpeakText>
      </SocratesHolder>
    </Socrates>
  )  
});