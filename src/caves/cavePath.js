import React from 'react';
import {
  PrisonerOnScene, 
  RouteArrow, 
} from '../layouts/divStore';

export default Cave => ({interaction, exits = [], children, ...props}) => {
  const {handleRoute, handleTryToRelease} = interaction;
  
  const Route = ({path, x, y, direction}) => !isNaN(x) && !isNaN(y)
    ?
      <RouteArrow 
        onClick={handleRoute(path)} 
        style={{transform: `translate(${x}vmin, ${y}vmin) rotate(${direction}deg)`}} 
      />
    : null;

  return (
    <Cave {...props}>      
      {children}
      {exits.map((exit, key) => <Route key={key} {...exit} />)}
      {/* <PrisonerOnScene onClick={handleTryToRelease('prisoner - 42', 8)} /> */}      
    </Cave>
  );
}