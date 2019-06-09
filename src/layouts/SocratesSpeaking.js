import React from 'react';
import showtime from './showtime';
import { Socrates, SocratesHolder, SocratesAvatar, SpeakText } from '../layouts/divStore';
import { avatarNames } from '../caves/applicationData';

export default showtime(({speak, level}) => (
  <Socrates>
    <SocratesHolder>
      <SocratesAvatar />
      <SpeakText>{speak(avatarNames(level))}</SpeakText>
    </SocratesHolder>
  </Socrates>
));