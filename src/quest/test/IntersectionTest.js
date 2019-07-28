import React, {useEffect, useState} from 'react';
import { testdata, doIntersect } from '../sectionsIntersection';
import { QuestSketch, ModalHolder } from '../../styles/divStore';

const until = (goOn = (e,i) => true) => content => content.reduce(
  (r, e, i) => r.until && goOn(e,i) 
    ? ({arr:[...(r.arr),e], until: true}) 
    : r.arr || r 
   , {until: true, arr:[]}
);

/*
z = 'ABCDEFGHIJKLMNOPQRST'.split('')
t = []
pair = ([f,...r]) => r.length ? r.map(e=>f+e).concat(pair(r)) : r.map(e=>f+e)
pair(z)
pair(z).length
*/

const pairs = ([f,...r]) => r.length ? r.map(e=>f+e).concat(pairs(r)) : r.map(e=>f+e);

export default ({}) => {

  const [output, debug] = useState('');
  const [draws, setDraws] = useState([]);
  const log = p => debug(l => l + '\n' + p);
  const jog = (...all) => all.map(p => log(JSON.stringify(p,null,2)));
  const jjog = (...all) => all.map(p => log(JSON.stringify(p)));

  const testLup = testdata.reduce((r, [x,y,k]) => ({...r, [k]:{x,y}}), {});
  const points = s => s.split('').map(k=>testLup[k]);

  useEffect(() => {
    log('--- intersection test ---\n');
    
    let selections = 'ABCDEFGHIJKLMNOPQRST'
      .split('')
      .sort((a,b) => Math.random() < .5 ? 1 : -1 )
      .join('');
    
    selections += selections[0];

    //jjog(pairs(selections))

    log(selections)
    let lines = [];
    for(let i = 2; i <= selections.length; i++) {
      const [a, b] = selections.slice(0,i).slice(-2).split('');
      lines.push(a+b);
    }
    jjog(lines);

    const isCrossed = (twoLine, [a,b,c,d] = twoLine.split('')) => 
      !(a == c || a == d || b == c || b == d) 
      && doIntersect(...points(twoLine));
    const crosslog = path => log(`${path}: ${isCrossed(path)}`)  

    const allPossibelCross = pairs(pairs('ABCDEFGHIJKLMNOPQRST'))
    log(`possible crosses: ${allPossibelCross.length}`)
    log(`bad ones: ${allPossibelCross.filter(cross => isCrossed(cross)).length}`)

    crosslog(`ABBC`)
    crosslog(`BCGH`)
    crosslog(`CBHG`)
    

    setDraws( lines.map(line => points(line)) );    
  }, []);

  const lineStyle = {stroke:'gold', strokeWidth:1};

  return (
    <QuestSketch>
    <pre>{output}</pre>
      <ModalHolder>
        <svg height="100vh" width="100vw">
            {
              draws.map(([{x:x1, y:y1},{x:x2, y:y2}], i) => 
                <line 
                  key={`${x1}:${y1}-${x2}:${y2}-${i}`}
                  x1={`${(x1 + 4)}vmin`}
                  y1={`${(y1 + 44)}vmin`}
                  x2={`${(x2 + 4)}vmin`}
                  y2={`${(y2 + 44)}vmin`}
                  style={lineStyle} 
                />
              )  
            }
            
          </svg>        
      </ModalHolder>
    </QuestSketch>
  );
};