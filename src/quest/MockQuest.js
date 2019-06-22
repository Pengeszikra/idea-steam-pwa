import React from 'react';
import { PlayCity, IntroButton, IntroButtonHolder, SimpleDarkBg } from '../styles/divStore';
import showtime from '../utils/showtime';
import { Minigame } from '../layouts/Geometries';

const questLookup = {
  Q:  Minigame,
  Y:  Minigame,
  A:  Minigame,
  B:  Minigame,
  C:  Minigame,
  D:  Minigame,
  X:  Minigame,
  E:  Minigame,
  F:  Minigame,
  G:  Minigame,
  H:  Minigame,
  I:  Minigame,
  J:  Minigame,
  K:  Minigame,
  L:  Minigame,
};

export default showtime(({handleQuestResult, position}) => {
  return (
    <SimpleDarkBg>
      <Minigame />
      <IntroButtonHolder>
        <IntroButton onClick={handleQuestResult(false)}>Balsiker</IntroButton>
        <IntroButton onClick={handleQuestResult(true)}>Győzelem</IntroButton>
      </IntroButtonHolder>
    </SimpleDarkBg>
  );
});