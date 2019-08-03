import React from 'react';
import { InventoryBg, MapCloseButton, Item } from '../styles/divStore';
import noprop from '../utils/noprop';
import showtime from '../utils/showtime';

const Inventory = ({handleClose, equipment, interaction}) => {
  const {handlePutItem} = interaction;
  const showItems = equipment.map(itemId => 
    <Item 
      data-item={itemId} 
      key={`itm-${itemId}`} 
      onClick={noprop(handlePutItem(itemId))} 
    />
  );
  return (
    <InventoryBg data-equipment onClick={handleClose} >      
      {showItems}
    </InventoryBg>
  );
}

export default showtime(Inventory);

// <MapCloseButton onClick={handleClose}/>