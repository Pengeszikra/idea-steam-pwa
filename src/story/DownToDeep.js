import React, {useEffect} from 'react';
import { Adeimantosz, Glaukon, Island, BayPort } from '../styles/divStore';
import { entrance } from '../engine/applicationData';

export default ({level, children, interaction}) => {
  const {monologBeforeQuest} = interaction;

  useEffect(()=>{
    setTimeout(() => {
      monologBeforeQuest(entrance.intro);
    }, 500);
  }, []);
  
  return (
    <BayPort>
      {children}
      { level === 1 && <Glaukon style={{left:'-4vmin', bottom: '4vmin'}}/>}
      { level === 2 && <Adeimantosz style={{left:'48vmin', bottom: '4vmin', transform:'scaleX(-1)'}}/> }
    </BayPort>
  );
}