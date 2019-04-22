import React, {useState, useEffect} from 'react';
import Cave from '../caves/Cave';  
import { useScoreReducer, achiveScore } from '../flow/action';
import Inventory from '../show/Inventory';

const caveNumbers = [
  ['intro', 1.1],
  [1.1, 2.1],
  [2.1, 2.2, 2.3, 2.4],  
  [2.2, 2.3, 2.4, 2.1, 2.5, 2.6, 2.7, 2.8],
  [2.3, 2.4, 2.1, 2.2],
  [2.4, 2.5, 2.6, 2.7, 2.8],
  [2.5, 2.6],
  [2.6, 2.7],
  [2.7, 2.8],
  [2.8, 2.9],
  [2.9, '2.10'],
  ['2.10', 2.11],
  [2.11, 2.12],
  [2.12, '2.1.again'],
  ['2.1.again', 3],
  [3, 4],
  [4,'intro'],
]

export default ({route, handleRoute}) => {
  const CaveButton = ({to}) => <button className="map" onClick={handleRoute(to)}>{`cave: ${to}`}</button>
  const CaveRoute = ({path, nextPath = [], ...props}) => route === path ? (
    <>
      <Cave {...props} />
      {nextPath.map((to, key) => <CaveButton to={to} key={key} />)}
    </>
  ) : null;
  const Route = ({path, children}) => route === path ? <>{children}</> : null;    
  
  return (
    <div className="contentFrame">
      <Route path={'map'}>
        <h1>Barlangok térképe</h1>
        {caveNumbers.map((path, key) => <CaveButton key={key} to={path[0]} />)}
        <img style={{position:'absolute', bottom:40, left: 0, transform:'scale(.5)'}} src="/img/platon-simple.png" />
      </Route>
      <CaveRoute path={'idea'} url={'/document/idea.md'} />
      <CaveRoute path={'intro'} url={'/document/intro.md'} />
      <CaveRoute path={'level'} url={'/document/levelSelector.md'} />
      <CaveRoute path={'history'} url={'/document/history.md'} />
      <CaveRoute path={'finale'} url={'/document/.md'} />
      <Route path={'inventory'}>
        <Inventory />
      </Route>
      {caveNumbers.map(([path, ...rest], key) => <CaveRoute key={key} path={path} nextPath={rest}  url={`/document/cave.${path}.md`} />)}
    </div>
  );
}
