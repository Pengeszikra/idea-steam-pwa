import React, {useState, useEffect, useReducer} from 'react';
import Header from './Header';
import ButtonLine from './ButtonLine';
import Content from './Content';
import { scoreReducer } from '../flow/action';

export default () => {
  const [route, setRoute] = useState('intro');
  const {dispatch, state} = useReducer(scoreReducer, {score: 0, saved: 0, level: 1});
  
  return (
    <main className="appFrame">
      <Header score={100} saved={1}/>
      <Content route={route} />
      <ButtonLine setRoute = {setRoute} />
    </main>  
  );
}
