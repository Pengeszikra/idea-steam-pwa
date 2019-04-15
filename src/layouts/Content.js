import React, {useState, useEffect} from 'react';
import Cave from '../caves/Cave';  
import { useScoreReducer, achiveScore } from '../flow/action';

const caveNumbers = [
  1.1,
  2.1,  
  2.2,
  2.3,
  2.4,
  2.5,
  2.6,
  2.7,
  2.8,
  2.9,
  2.10,
  2.11,
  2.12,
  '2.1.again',
]

export default ({route, handleRoute}) => {
  const CaveRoute = ({path, ...props}) => route === path ? <Cave {...props} /> : null;
  const Route = ({path, children}) => route === path ? <>{children}</> : null;    
  
  return (
    <div className="contentFrame">
      <Route path={'map'}>
        <h1>Barlangok térképe</h1>
        {caveNumbers.map((path, key) => <button className="map" onClick={handleRoute(path)}>{`cave: ${path}`}</button>)}
        <img style={{position:'absolute', bottom:40, left: 0}} src="/img/platon-simple.png" />
      </Route>
      <CaveRoute path={'idea'} url={'/document/idea.md'} />
      <CaveRoute path={'intro'} url={'/document/intro.md'} />
      <CaveRoute path={'level'} url={'/document/levelSelector.md'} />
      {caveNumbers.map((path, key) => <CaveRoute key={key} path={path} url={`/document/cave.${path}.md`} />)}
    </div>
  );
}
