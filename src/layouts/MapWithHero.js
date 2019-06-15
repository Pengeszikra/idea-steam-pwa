import React, { useState, useEffect } from 'react';
import showtime from './showtime';
import { InteractiveMap, MapCloseButton } from './divStore';
import { cavePositions } from '../caves/applicationData';

export default showtime( ({Avatar, caveNumber, handleCloseMap, underWalk = false, setCaveNumber}) => {  
  const [pos, setPos] = useState(cavePositions[caveNumber])  
  
  useEffect(()=>{
    setPos(cavePositions[caveNumber]);
  }, [caveNumber]);
  const [y,x] = pos;

  return (
    <>
      <InteractiveMap 
        onClick={_=>{
        if (underWalk) return;
        setCaveNumber(num => {
          console.log(`prev cave: ${num}`)
          return (num + 1) % cavePositions.length;
        })
      }}
      >
        {!underWalk && <MapCloseButton onClick={handleCloseMap}/>}
      </InteractiveMap>
      <Avatar style={{
        top: `${y}vmin`,
        left: `${x}vmin`,
      }}/>
    </>
  )
});