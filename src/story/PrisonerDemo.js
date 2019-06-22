import React from 'react';
import {
  PrisonerOnScene, 
  PrisonerCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
} from '../styles/divStore';


export default ({interaction, children}) => {
  const {handleRoute, handleSavePrisoner, handleGetItem} = interaction;  
  
  return (
    <PrisonerCave>      
      <PrisonerCaveRoute1 onClick={handleRoute('C-A')} />
      <PrisonerCaveRoute2 onClick={handleRoute('C-X')} />
      <PrisonerOnScene onClick={handleSavePrisoner('C1')} />
      {children}
    </PrisonerCave>
  );
}
