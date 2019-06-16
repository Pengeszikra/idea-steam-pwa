import React from 'react';
import {
  PrisonerOnScene, 
  PrisonerCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../layouts/divStore';


export default ({interaction}) => {
  const {handleRoute, handleTryToRelease} = interaction;  
  
  return (
    <PrisonerCave>      
      <PrisonerCaveRoute1 onClick={handleRoute('C-X')} />
      <PrisonerCaveRoute2 onClick={handleRoute('C-A')} />
      {/* <PrisonerOnScene onClick={handleTryToRelease('prisoner - 1', 12)} /> */}
    </PrisonerCave>
  );
}
