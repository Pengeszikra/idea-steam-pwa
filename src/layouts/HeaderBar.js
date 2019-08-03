import React from 'react';
import {  
  HeaderBarSection, 
  ActualScore,
  SavedPrisoner,
} from '../styles/divStore';

export default ({score, saved, setWay, Avatar, handlePlayerInfo}) => (
  <HeaderBarSection>
    <Avatar onClick={()=>handlePlayerInfo()} />
    <ActualScore>{score}</ActualScore>
    <SavedPrisoner>{saved}</SavedPrisoner>
  </HeaderBarSection>
);

// <Avatar onClick={()=>setWay(3)} />