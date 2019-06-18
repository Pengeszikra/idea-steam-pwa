import React from 'react';
import {
  PrisonerOnScene, 
  RouteArrow, 
} from '../styles/divStore';

export default Cave => ({interaction, exits = [], children, ...props}) => {
  const {handleRoute, handleTryToRelease} = interaction;
  
  const Route = ({path}) => <RouteArrow data-path={path} onClick={handleRoute(path)} />;

  return (
    <Cave {...props}>      
      {children}
      {exits.map((exit, key) => <Route key={key} path={exit} />)}
      {/* <PrisonerOnScene onClick={handleTryToRelease('prisoner - 42', 8)} /> */}      
    </Cave>
  );
}