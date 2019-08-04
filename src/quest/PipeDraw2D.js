import React, {useState, useEffect, useLayoutEffect} from 'react';
import { QuestSketch, IntroHeader, ModalHolder } from '../styles/divStore';
import MultiRoundGameFrame from './multiRoundGameFrame';
import divFactory from '../utils/divFactory';
import { cave_2_12 } from '../engine/applicationData';
import { GEOMS, RAD } from '../layouts/Geometries';
import { doIntersect } from './sectionsIntersection';
import { irnd } from '../utils/randoms';

const [PipeDot] = divFactory('pipe-dot no-sel');

const VPOS = 40;
const zoom = 44;

const pairs = ([f,...r]) => r.length ? r.map(e=>f+e).concat(pairs(r)) : r.map(e=>f+e);

function createCaveNodes(phase = 0) {
  console.log('createCaveNodes --- !!!')
  const makeCaveDots = (geomFactory, turnX = 11,  turnY = 44) => ({
    dots : geomFactory
      .rotateX(turnX/RAD)
      .rotateY(turnY/RAD)
      .vertices
      .map(({x,y}, i) => [ 
        + (x*zoom+zoom+[]).slice(0,6), 
        + (y*zoom+zoom+[]).slice(0,6),
        String.fromCharCode(65 + i)
      ]),
  });
  
  const cave = makeCaveDots( 
    [
      GEOMS.box(1,1,1),
      GEOMS.icosahedron(1,1,1),
      GEOMS.dedocahedron(1,1,1),
    ][phase]
  );
  
  cave.coords = cave.dots.reduce((r,[x,y,k]) => ({...r, [k]:{x,y}}) , {});
  cave.all = cave.dots.map(([,,key]) => key).sort().join('');
  
  const points = s => s.split('').map(k=>cave.coords[k]);
  const isCrossed = (twoLine, [a,b,c,d] = twoLine.split('')) => 
    !(a == c || a == d || b == c || b == d) 
    && doIntersect(...points(twoLine));
  cave.wrongs = pairs(pairs(cave.all)).filter(cross => isCrossed(cross)).reduce(
    (r, [a,b,c,d]) => [...r, a+b+c+d, b+a+c+d, a+b+d+c, c+d+a+b, d+c+a+b, c+d+b+a, d+c+b+a ]
  ,[]);

  return cave;
}

const DrawPipeGame = ({show, playOver, gainScore, setChecking, phase = 2}) => {
  const [selections, setSelections] = useState('');
  const [hasWin, setWin] = useState(false);
  const [tryAmount, trying] = useState(0);
  const [draws, setDraws] = useState([]);
  const [cave, setCave] = useState({dots:[]});
  
  const reset = () => { 
    setSelections(''); 
  };  
  
  const checkEachOnceAndLastEqualFirst = () => {    
    console.log('--- check!! --- ')
    const isWorth = (
      selections.length === cave.dots.length + 1
      && selections.slice(-1) === selections.slice(0,1)
      && selections.slice(1).split('').sort().join('') === cave.all
    )    
    if (!isWorth) return false; // short check

    // found crossed lines 
    const lines = [];
    for(let i = 2; i <= selections.length; i++) {
      const [a, b] = selections.slice(0,i).slice(-2).split('');
      lines.push(a+b);
    }

    const crosses = pairs(lines);
    return !crosses.find(line => cave.wrongs.indexOf(line) !== -1)
  }

  const checkResult = () => {
    const isWin = false;
    setWin(isWin);
    if (isWin) {
      gainScore(100);
      playOver(isWin);
    } else {
      gainScore('Rossz megoldás!');
    }
  };

  useEffect(() => { setChecking(() => () => trying(n => n+1)); }, []);
  useEffect(() => { tryAmount && checkResult(); }, [tryAmount]);
  useEffect(() => { show && reset(); }, [show]);

  useEffect(() => { 
    if(checkEachOnceAndLastEqualFirst()) {
      gainScore(selections.length * 20);
      playOver(true);
    }

    const lines = [];
    for(let i = 2; i <= selections.length; i++) {
      const [a, b] = selections.slice(0,i).slice(-2).split('');
      lines.push([cave.coords[a], cave.coords[b], a+b]);
    }

    setDraws(lines);
  }, [selections]);

  const draw = (key) => e => {
    // console.log(`${key} --- clicked! `);
    setSelections( sel => sel.slice(-1) === key ? sel.slice(0, sel.length - 1) : sel + key);
  }

  const lineStyle = {stroke:'white', strokeWidth:2};

  useEffect(() => {
    setCave(createCaveNodes(phase));
  }, [phase]);

  return (
    <>
      <IntroHeader>
        { /* cave_2_12.mission() */ }
        {/* <br/><br/> */}
        {/* {selections} */}
      </IntroHeader>
      <ModalHolder>
        <svg height="100vh" width="100vw">
          {
            draws.map(([{x:x1, y:y1},{x:x2, y:y2}], i) => 
              <line 
                key={`${x1}:${y1}-${x2}:${y2}-${i}`}
                x1={`${(x1 + 4)}vmin`}
                y1={`${(y1 + VPOS + 4)}vmin`}
                x2={`${(x2 + 4)}vmin`}
                y2={`${(y2 + VPOS + 4)}vmin`}
                style={lineStyle} 
              />
            )  
          }
          
        </svg>
        {
          cave.dots.map(([x, y, key]) => 
            <PipeDot 
              onClick={draw(key)}
              key={key} 
              style={{left:`${x}vmin`, top:`${(y + VPOS)}vmin`}}
            ></PipeDot>
          )
        }
      </ModalHolder>
    </>
  );
};

const GameWithBackground = MultiRoundGameFrame(DrawPipeGame, QuestSketch);
export default props => <GameWithBackground {...props} />;