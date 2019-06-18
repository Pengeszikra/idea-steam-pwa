import React from 'react';
import {  
  BottomBarSection,
  MapIcon,
  InventoryIcon,
  SavedIcon,
  HistoryIcon,
} from '../styles/divStore';

export default ({handleMap, handleInventory, handlePrisoner, handleHistory}) => {
  return (
    <BottomBarSection>
      <MapIcon onClick={handleMap}/>
      <InventoryIcon onClick={handleInventory} />
      <SavedIcon onClick={handlePrisoner} />
      <HistoryIcon onClick={handleHistory} />
    </BottomBarSection>
  );  
}