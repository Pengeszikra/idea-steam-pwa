import React from 'react';
import {
  PrisonerOnScene, 
  RouteArrow, 
} from '../layouts/divStore';

export default Cave => ({interaction, routes = [], children}) => {
  const {handleRoute, handleTryToRelease} = interaction;
  const Route = ({path, x, y, direction}) => <RouteArrow onClick={handleRoute(...path)} style={{transform: `translate(${x}vmin, ${y}vmin) rotate(${direction}deg)`}} />

  return (
    <Cave>      
      {children}
      {routes.map(route => <Route {...route} />)}
      <PrisonerOnScene onClick={handleTryToRelease('prisoner - 42', 8)} />
    </Cave>
  );
}