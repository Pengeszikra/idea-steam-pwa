import React from 'react';
import { Prisoner, TeamsBg, MapCloseButton } from '../styles/divStore';
import showtime from '../utils/showtime';


 const Teams = ({handleClose, saved}) => {
  const showSaved = saved.map(prisonerId => <Prisoner data-prisoner={prisonerId} key={`prs-${prisonerId}`} />);
  return (
    <TeamsBg data-teams onClick={handleClose}>      
      {showSaved}
    </TeamsBg>
  );
}

export default showtime(Teams);