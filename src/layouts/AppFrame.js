import React, {useState, useEffect, useReducer} from 'react';
import Header from './Header';
import ButtonLine from './ButtonLine';
import Content from './Content';
import { changeRoute, scoreReducer, scoreInitial, achiveScore } from '../flow/action';
import ThreeDimensionTest from '../show/ThreeDimensionTest';

export default () => {
  const [{route, score, saved}, dispatch] = useReducer(scoreReducer, scoreInitial);
  const handleRoute = path => event => {
    dispatch(changeRoute(path))
    dispatch(achiveScore(path * 100 || 0))
  };

  return (
    <main className="appFrame">
      <Header score={score} saved={saved} />
      <Content route={route} handleRoute={handleRoute} />
      <ButtonLine handleRoute = {handleRoute} />
      {/* <ThreeDimensionTest /> */}
    </main>  
  );
}
