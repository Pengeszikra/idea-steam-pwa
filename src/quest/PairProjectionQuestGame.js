import React from 'react';
import { QuestSketch } from '../styles/divStore';
import {ThreeInteraction} from '../layouts/ThreeArea';
import pairProjection3dContent from './pairProjection3dContent';
import MultiRoundGameFrame from './multiRoundGameFrame';
import { cave_2_2 } from './../engine/applicationData';

const instruction = cave_2_2.mission();

const Game = ({show, playOver, gainScore, setChecking}) => (
  <ThreeInteraction 
    show={show} 
    add3DContent={pairProjection3dContent({playOver, gainScore, setChecking})} 
    orthographic        
  />      
);

const PairProjectionGame = MultiRoundGameFrame(Game, QuestSketch);

export default props => <PairProjectionGame {...props} instruction={instruction} />;