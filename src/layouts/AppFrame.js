import React, {useState, useEffect, useReducer} from 'react';
import Header from './Header';
import ButtonLine from './ButtonLine';
import Content from './Content';
import { scoreReducer, changeRoute } from '../flow/action';
import ThreeDimensionTest from '../show/ThreeDimensionTest';

export default () => {
  const [{route}, dispatch] = useReducer(scoreReducer, {score: 0, saved: 0, level: 1, route:2.8});
  const setRoute = path => event => {
    console.log(path)
    dispatch(changeRoute(path))
  };

  return (
    <main className="appFrame">
      <Header score={100} saved={1}/>
      <Content route={route} />
      <ButtonLine setRoute = {setRoute} />
      <ThreeDimensionTest />
    </main>  
  );
}
