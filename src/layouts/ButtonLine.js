import React from 'react';

export default ({setRoute}) => {
  const handleRoute = path => setRoute(path);

  return (
    <div className="buttonLine">
      <button className="map" onClick={handleRoute(2.2)}>Map</button>
      <button className="saved" onClick={handleRoute(2.3)}>Saved</button>
      <button className="inventory" onClick={handleRoute(2.4)}>Inventory</button>
      <button className="history" onClick={handleRoute(2.11)}>History</button>
    </div>
  )
}

