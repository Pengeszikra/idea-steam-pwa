import React from 'react';
import { HistorycalPapper, MapCloseButton, Item } from '../styles/divStore';
import noprop from '../utils/noprop';

export default ({handleClose, equipment, interaction}) => {
  const {handlePutItem} = interaction;
  const showItems = equipment.map(itemId => 
    <Item 
      data-item={itemId} 
      key={`itm-${itemId}`} 
      onClick={noprop(handlePutItem(itemId))} 
    />
  );
  return (
    <HistorycalPapper data-equipment>
      <MapCloseButton onClick={handleClose}/>
      {showItems}
    </HistorycalPapper>
  );
}