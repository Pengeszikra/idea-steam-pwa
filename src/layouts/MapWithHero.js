import React from 'react';
import showtime from '../utils/showtime';
import { InteractiveMap, MapCloseButton, CaveLetter } from '../styles/divStore';

const LetterOfCaves = ({solvedCaves}) => solvedCaves
  .filter(letter => ['Q','X','Y'].indexOf(letter) === -1)
  .map(letter => <CaveLetter key={letter} data-cave={letter}>{letter}</CaveLetter>);

export default showtime( ({Avatar, handleCloseMap, underWalk = false, walk, handlePlayerInfo, solvedCaves}) => {    
  const [y,x] = walk;
  const avatarStyle = {
    top: `${y}vmin`,
    left: `${x}vmin`,
  };

  console.log(solvedCaves)

  return (
    <>
      <InteractiveMap>
        <LetterOfCaves solvedCaves={solvedCaves} />
        {!underWalk && <MapCloseButton onClick={handleCloseMap}/>}
      </InteractiveMap>
      <Avatar style={avatarStyle} onClick={() =>!underWalk && handlePlayerInfo()} />
    </>
  )
});