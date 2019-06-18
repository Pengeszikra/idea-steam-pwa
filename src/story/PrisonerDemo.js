import React from 'react';
import {
  PrisonerOnScene, 
  PrisonerCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../styles/divStore';


export default ({interaction, children}) => {
  const {handleRoute, handleTryToRelease} = interaction;  
  
  return (
    <PrisonerCave>      
      <PrisonerCaveRoute1 onClick={handleRoute('C-A')} />
      <PrisonerCaveRoute2 onClick={handleRoute('C-X')} />
      <PrisonerOnScene onClick={()=>console.log('C prisoner wait for solving geometry problem')} />
      {children}
    </PrisonerCave>
  );
}
