import React from 'react';
import { InventoryTop, EquipmentMatrixHolder, ItemMatrix, TeamMember, EquipmentItem } from '../styles/divStore';
import showtime from '../utils/showtime';


 const Teams = ({handleClose, saved}) => {
  const showSaved = saved.map(prisonerId => 
    <EquipmentItem key={`prs-${prisonerId}`} >
      <TeamMember data-prisoner={prisonerId} />
    </EquipmentItem>
  );
  return (
    <InventoryTop style={{top: '117vmin'}}>
      <EquipmentMatrixHolder style={{top: '7vmin'}}>
        <ItemMatrix style={{justifyContent: 'flex-start'}}>{showSaved}</ItemMatrix>
      </EquipmentMatrixHolder>
    </InventoryTop>
  );
}

export default showtime(Teams);