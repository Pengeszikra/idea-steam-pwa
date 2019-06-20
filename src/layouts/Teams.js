import React from 'react';
import { Prisoner, HistorycalPapper, MapCloseButton } from '../styles/divStore';


export default ({handleClose, saved}) => {
  const showSaved = saved.map(prisonerId => <Prisoner data-prisoner={prisonerId} key={`prs-${prisonerId}`} />);
  return (
    <HistorycalPapper data-teams>
      <MapCloseButton onClick={handleClose}/>
      {showSaved}
    </HistorycalPapper>
  );
}