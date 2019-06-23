import React from 'react';
import { BottomBarSection, MapIcon, InventoryIcon, SavedIcon, HistoryIcon } from '../styles/divStore';

export default ({handleMap, handleInventory, handlePrisoner, handleHistory, equipment, saved}) => {

  return (
    <BottomBarSection>
      <MapIcon onClick={handleMap}/>
      <InventoryIcon show={equipment.length} onClick={handleInventory} />
      <SavedIcon show={saved.length} onClick={handlePrisoner} />
      <HistoryIcon onClick={handleHistory} />
    </BottomBarSection>
  );  
}