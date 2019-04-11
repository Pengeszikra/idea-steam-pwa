import React, {useState, useEffect} from 'react';
import Cave from '../caves/Cave';  

const caveNumbers = [1.1,2.1,2.2,2.3,2.4,2.11,2.12]

export default ({route}) => {
  const CaveRoute = ({path, ...props}) => route === path ? <Cave {...props} /> : null;

  return (
    <div className="contentFrame">
      {caveNumbers.map(path => <CaveRoute path={path} url={`/document/cave.${path}.md`} />)}
    </div>
  );
}
