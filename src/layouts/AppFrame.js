import React, {useState, useEffect} from 'react';
import Header from './Header';
import ButtonLine from './ButtonLine';
import Content from './Content';
import useReducerObject from '../hooks/useReducerObject';
import { scoreLookup } from '../flow/action';

export default () => {
  const [route, setRoute] = useState('intro');
  const {dispatch, state:{score, saved}} = useReducerObject(scoreLookup, {
    score: 0,
    saved: 0,
    level: 1,
  });

  return (
    <main className="appFrame">
      <Header score={score} saved={saved}/>
      <Content route={route} />
      <ButtonLine setRoute = {setRoute} />
    </main>  
  );
}
