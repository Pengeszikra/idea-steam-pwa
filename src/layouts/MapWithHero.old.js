import React, { useState } from 'react';
import showtime from './showtime';
import {  InteractiveMap } from './divStore';
import { cavePositions } from '../caves/applicationData';

export default showtime( ({addScore, savePrisoner, Avatar}) => {
  const [caveNumber, setCaveNumber] = useState(0)
  const [pos, setPos] = useState(cavePositions[caveNumber])  
  const handleClick = () => {
    const move = caveNumber < cavePositions.length - 1 ? caveNumber + 1 : 0;    
    setCaveNumber(move)
    setPos(cavePositions[move]);
    addScore(10);
    savePrisoner();
  };
  const [y,x] = pos;
  return (
    <>
      <InteractiveMap onClick={handleClick} />
      <Avatar style={{
        top: `${(y * 1.9)}vmin`,
        left: `${(x * 1.9)}vmin`,
      }}/>
    </>
  )
});