import React, { useState, useEffect } from 'react';
import showtime from './showtime';
import { InteractiveMap, MapCloseButton } from './divStore';
// import { mapPositions } from '../caves/applicationData';

export default showtime( ({Avatar, handleCloseMap, underWalk = false, walk}) => {    
  const [y,x] = walk;
  const avatarStyle = {
    top: `${y}vmin`,
    left: `${x}vmin`,
  };

  return (
    <>
      <InteractiveMap>
        {!underWalk && <MapCloseButton onClick={handleCloseMap}/>}
      </InteractiveMap>
      <Avatar style={avatarStyle}/>
    </>
  )
});