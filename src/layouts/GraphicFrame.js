import React, {useState, useEffect, useReducer} from 'react';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore } from '../flow/action';
import '../styles/graphic.scss';

const HeaderBar = () => (
  <div className="header-bar">
    <div className="lvl-1-char"></div>
  </div>
);

const BottomBar = () => (
  <div className="bottom-bar">
    <div className="bottom-map"></div>
    <div className="bottom-inventory"></div>
    <div className="bottom-saved"></div>
    <div className="bottom-history"></div>
  </div>
);

const GamePlay = ({route, handleRoute}) => {
  return (
    <>
      <div className="play-city"></div>
      <div className="socrates"><span>Igaz lenne? Sokan elbeszélték már nekem Thébától Mükénéig, Hérodotosztól Thuküdidészig, hogy lesz majd ki kész a kalandokra, 
ki jártas a tudományokban, ki felszabadítja a fogságban tartottakat.</span></div>
      <div className="small-logo"></div>
    </>
  );
}

export default () => {
  const [{route, score, saved}, dispatch] = useReducer(scoreReducer, scoreInitial);
  const handleRoute = path => event => {
    dispatch(changeRoute(path))    
  };

  return (
    <main className="graph-frame">      
      <GamePlay route={route} handleRoute={handleRoute} />
      <HeaderBar score={score} saved={saved} />
      <BottomBar handleRoute = {handleRoute} />
      
    </main>  
  );
}
