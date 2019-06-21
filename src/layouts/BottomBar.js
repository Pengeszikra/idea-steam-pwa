import React from 'react';
import {  
  BottomBarSection,
  MapIcon,
  InventoryIcon,
  SavedIcon,
  HistoryIcon,
} from '../styles/divStore';

export default ({handleMap, handleInventory, handlePrisoner, handleHistory, equipment, saved}) => {
  return (
    <BottomBarSection>
      <MapIcon onClick={handleMap}/>
      {equipment.length  && <InventoryIcon onClick={handleInventory} />}
      {saved.length && <SavedIcon onClick={handlePrisoner} />}
      <HistoryIcon onClick={handleHistory} />
    </BottomBarSection>
  );  
}