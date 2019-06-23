import React, {useState,useEffect} from 'react';
import { Adeimantosz, Glaukon, Island, RouteArrow } from '../styles/divStore';
import { entrance } from '../engine/applicationData';

export default ({level, children, interaction}) => {
  const {talkSocrates} = interaction;

  useEffect(()=>{
    setTimeout(() => {
      talkSocrates(entrance.intro)
    }, 500);
  }, []);
  
  return (
    <Island>
      {children}
      { level === 1 && <Glaukon style={{left:'-4vmin', bottom: '4vmin'}}/>}
      { level === 2 && <Adeimantosz style={{left:'48vmin', bottom: '4vmin', transform:'scaleX(-1)'}}/> }
    </Island>
  );
}