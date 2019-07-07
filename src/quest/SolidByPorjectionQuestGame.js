import React, {useRef, useState, useEffect} from 'react';
import { QuestSketch, IntroButtonHolder, IntroButton } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent } from '../layouts/Geometries';
import ThreeArea from '../layouts/ThreeArea';
import { animationFlyRandomSolid } from './examples/threeDimensionExample';
import ThreeStudio from '../layouts/ThreeStudio';

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