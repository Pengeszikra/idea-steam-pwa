import React from 'react';
import { HistorycalPapper, MapCloseButton, Item } from '../styles/divStore';

export default ({handleClose, equipment}) => {
  const showItems = equipment.map(itemId => <Item data-item={itemId} key={`itm-${itemId}`} />);
  return (
    <HistorycalPapper data-equipment>
      <MapCloseButton onClick={handleClose}/>
      {showItems}
    </HistorycalPapper>
  );
}