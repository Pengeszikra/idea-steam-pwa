import React, {useState} from 'react';
import { DarkGold, IntroButton, SimpleDarkBg, Adeimantosz, Glaukon } from '../layouts/divStore';
import DescriptionOfHistory from '../show/DescriptionOfHistory';
import { avatarNames } from '../caves/applicationData';
import { selectLevel } from '../flow/action';

export default ({setWay, scoreStore}) => {

  const [{level}, dispatch] = scoreStore;

  const handleLevelSelection = level => () => {
    setWay(2);
    dispatch(selectLevel(level))
  };

  return (
    <SimpleDarkBg>
      <div className='intro-button-holder'>      
        <IntroButton onClick={handleLevelSelection(1)}><Glaukon />{avatarNames(1)}</IntroButton>
        <IntroButton onClick={handleLevelSelection(2)}><Adeimantosz />{avatarNames(2)}</IntroButton>
      </div>
    </SimpleDarkBg>
  );
}