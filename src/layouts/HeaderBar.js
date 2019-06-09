import React from 'react';
import {  
  HeaderBarSection, 
  ActualScore,
  SavedPrisoner,
} from './divStore';

export default ({score, saved, setWay, Avatar}) => (
  <HeaderBarSection>
    <Avatar onClick={()=>setWay(3)} />
    <ActualScore>{score}</ActualScore>
    <SavedPrisoner>{saved}</SavedPrisoner>
  </HeaderBarSection>
);