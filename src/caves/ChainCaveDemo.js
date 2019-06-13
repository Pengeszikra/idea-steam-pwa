import React from 'react';
import {
  PrisonerOnScene, 
  ChainCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../layouts/divStore';

export default ({interaction}) => {
  const {handleRoute, handleTryToRelease} = interaction;

  return (
    <ChainCave>      
      <PrisonerCaveRoute1 onClick={handleRoute(3,2,0)}/>
      <PrisonerCaveRoute2 onClick={handleRoute(3,4,3)}/>
      <PrisonerOnScene onClick={handleTryToRelease('prisoner - 2', 11)} />
      <div className="item item-02" />
    </ChainCave>
  );
}
