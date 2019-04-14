import React, {useState, useEffect} from 'react';
import Cave from '../caves/Cave';  

const caveNumbers = [
  1.1,
  2.1,
  '2.1.again',
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
]

export default ({route}) => {
  const CaveRoute = ({path, ...props}) => route === path ? <Cave {...props} /> : null;

  return (
    <div className="contentFrame">
      <CaveRoute path={'idea'} url={'/document/idea.md'} />
      <CaveRoute path={'intro'} url={'/document/intro.md'} />
      <CaveRoute path={'level'} url={'/document/levelSelector.md'} />
      {caveNumbers.map((path, key) => <CaveRoute key={key} path={path} url={`/document/cave.${path}.md`} />)}
    </div>
  );
}
