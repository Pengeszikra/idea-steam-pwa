import React, { useState, useEffect } from 'react';
import showtime from './showtime';
import { InteractiveMap } from './divStore';
import { cavePositions } from '../caves/applicationData';

export default showtime( ({Avatar, caveNumber}) => {  
  const [pos, setPos] = useState(cavePositions[caveNumber])  
  
  useEffect(()=>{
    setPos(cavePositions[caveNumber]);
  }, [caveNumber]);
  const [y,x] = pos;

  return (
    <>
      <InteractiveMap />
      <Avatar style={{
        top: `${(y * 1.9)}vmin`,
        left: `${(x * 1.9)}vmin`,
      }}/>
    </>
  )
});