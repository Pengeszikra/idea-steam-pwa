import React from 'react';
import { QuestSketch } from '../styles/divStore';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import { cave_2_9 } from '../engine/applicationData';
import pointShadow3dContent from './pointShadow3dContent';

const instruction = cave_2_9.mission();

const Game = ({show, playOver, gainScore, setChecking}) => (
  <ThreeInteraction 
    show={show} 
    add3DContent={pointShadow3dContent({playOver, gainScore, setChecking})} 
    orthographic        
  />      
);

const PairProjectionGame = MultiRoundGameFrame(Game, QuestSketch, true);

export default props => <PairProjectionGame {...props} instruction={instruction} />;