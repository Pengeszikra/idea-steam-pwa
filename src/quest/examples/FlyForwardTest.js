import React, {useState} from 'react';
import { QuestSketch, IntroButtonHolder, IntroButton } from '../../styles/divStore';
import { animationFlyRandomSolid } from './threeDimensionExample';
import ThreeStudio from '../../layouts/ThreeStudio';

export default ({interaction:{questResultIs}, level = 1, position}) => {
  const [flow, setFlow] = useState(true);

  return (
    <QuestSketch>
      <ThreeStudio movie={animationFlyRandomSolid} show={flow} />
      <IntroButtonHolder>
        <IntroButton onClick={e => {setFlow(false); questResultIs(true, position)}}>Stop</IntroButton>
      </IntroButtonHolder>
    </QuestSketch>
  );
};