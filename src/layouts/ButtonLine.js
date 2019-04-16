import React from 'react';

export default ({handleRoute}) => {  

  return (
    <div className="buttonLine">
      <button className="map" onClick={handleRoute('map')}>Térkép</button>
      <button className="saved" onClick={handleRoute('idea')}>Megmentettek</button>
      <button className="inventory" onClick={handleRoute('inventory')}>Felszerelés</button>
      <button className="history" onClick={handleRoute('intro')}>Történet</button>
    </div>
  )
}

