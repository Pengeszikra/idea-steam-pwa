import React from 'react';
import { IntroButton, SimpleDarkBg, Adeimantosz, Glaukon, IntroHeader, IntroButtonHolder, GreekCity, QuestSketch } from '../styles/divStore';
import { avatarNames, whoIsTheHero, avatarDescripts } from '../engine/applicationData';
import { selectLevel } from '../engine/reducers';

export default ({setWay, storyStore}) => {

  const [{}, dispatch] = storyStore;

  const handleLevelSelection = level => () => {
    setWay(2);
    dispatch(selectLevel(level))
  };

return (
    <QuestSketch>
      <IntroHeader>{whoIsTheHero}</IntroHeader>
      <IntroButtonHolder>
        <IntroButton onClick={handleLevelSelection(1)}>
          <Glaukon><span>{avatarDescripts[0]}</span></Glaukon>
          {avatarNames(1)}
        </IntroButton>
        <IntroButton onClick={handleLevelSelection(2)}>
          <Adeimantosz><span>{avatarDescripts[1]}</span></Adeimantosz>
          {avatarNames(2)}
        </IntroButton>
      </IntroButtonHolder>
    </QuestSketch>
  );
}