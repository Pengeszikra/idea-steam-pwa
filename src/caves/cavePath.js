import React from 'react';
import {
  PrisonerOnScene, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../layouts/divStore';

export default Cave => ({interaction, paths = [], children}) => {
  const {handleRoute, handleTryToRelease} = interaction;

  return (
    <Cave>      
      {children}
      <PrisonerCaveRoute1 onClick={handleRoute(3,2,0)}/>
      <PrisonerCaveRoute2 onClick={handleRoute(3,4,3)}/>
      <PrisonerOnScene onClick={handleTryToRelease('prisoner - 42', 8)} />
    </Cave>
  );
}
