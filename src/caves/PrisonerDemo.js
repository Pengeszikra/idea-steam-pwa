import React from 'react';
import {
  PrisonerOnScene, 
  PrisonerCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../layouts/divStore';

export default ({interaction}) => {
  const {handleRoute, handleRelease} = interaction;
  return (
    <PrisonerCave>
      <PrisonerCaveRoute1 onClick={handleRoute(0)}/>
      <PrisonerCaveRoute2 onClick={handleRoute(2)}/>
      <PrisonerOnScene onClick={handleRelease('long wait')}/>
    </PrisonerCave>
  );
}
