import React from 'react';
import {
  RouteArrow, 
} from '../styles/divStore';

export default Cave => ({interaction, exits = [], children, ...props}) => {
  const {handleRoute} = interaction;
  const Route = ({path}) => <RouteArrow data-path={path} onClick={handleRoute(path)} />;

  return (
    <Cave {...props}>      
      {children}
      {exits.map((exit, key) => <Route key={key} path={exit} />)}
    </Cave>
  );
}