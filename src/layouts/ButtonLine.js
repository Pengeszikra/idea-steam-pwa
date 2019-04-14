import React from 'react';

export default ({setRoute}) => {
  const handleRoute = path => setRoute(path);

  return (
    <div className="buttonLine">
      <button className="map" onClick={handleRoute('idea')}>Térkép</button>
      <button className="saved" onClick={handleRoute(2.3)}>Megmentettek</button>
      <button className="inventory" onClick={handleRoute(2.4)}>Felszerelés</button>
      <button className="history" onClick={handleRoute('intro')}>Történet</button>
    </div>
  )
}

