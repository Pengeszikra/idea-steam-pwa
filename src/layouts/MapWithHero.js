import React from 'react';
import showtime from '../utils/showtime';
import { InteractiveMap, MapCloseButton } from '../styles/divStore';

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