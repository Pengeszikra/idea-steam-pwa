import React from 'react';
import { BottomBarSection, MapIcon, InventoryIcon, SavedIcon, HistoryIcon } from '../styles/divStore';
import showtime from '../utils/showtime';

const BottomBar = ({handleMap, handleInventory, handlePrisoner, handleHistory, equipment, saved}) => {

  return (
    <BottomBarSection>
      <MapIcon show={true} onClick={handleMap} />
      <InventoryIcon show={equipment.length} onClick={handleInventory} />
      <SavedIcon show={saved.length} onClick={handlePrisoner} />
      <HistoryIcon onClick={handleHistory} />
    </BottomBarSection>
  );  
}

export default showtime(BottomBar);