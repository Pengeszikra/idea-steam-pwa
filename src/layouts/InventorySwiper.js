import React from 'react';
import { Item, EquipmentItem, EquipmentMatrixHolder, ItemMatrix, InventoryTop } from '../styles/divStore';
import noprop from '../utils/noprop';
import showtime from '../utils/showtime';
import { itemNamesLup } from '../engine/applicationData';

const Inventory = ({handleClose, equipment, interaction}) => {
  const showItems = equipment.map(itemId => 
    <EquipmentItem data-item={itemId} key={`itm-${itemId}`}><span>{itemNamesLup[itemId]}</span></EquipmentItem>
  );
  return (
    <InventoryTop style={{top: '117vmin'}}>
      <EquipmentMatrixHolder style={{top: '7vmin'}}>      
        <ItemMatrix style={{justifyContent: 'flex-start'}}>{showItems}</ItemMatrix>
      </EquipmentMatrixHolder>    
    </InventoryTop>
  );
}

export default showtime(Inventory);