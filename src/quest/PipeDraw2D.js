import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, ModalHolder } from '../styles/divStore';
import MultiRoundGameFrame from './multiRoundGameFrame';
import divFactory from '../utils/divFactory';
import { cave_2_12 } from '../engine/applicationData';
import { GEOMS, RAD } from '../layouts/Geometries';

const [PipeDot] = divFactory('pipe-dot no-sel');

const VPOS = 40;
const zoom = 44;

const cube = {
  dots : [
                   [51, 30,  'A'],
    [20, 55, 'F'], [51, 55,  'G'], [80, 55, 'B'],
    [20, 80, 'E'], [51, 80,  'H'], [80, 80, 'C'],
                   [51, 105, 'D'],
  ],
  lines : [
    'AB','AG','AF','FG','GB','BC','FE','GH','EH','HC','ED','HD','CD',
    'BA','GA','FA','GF','BG','CB','EF','HG','HE','CH','DE','DH','DC',
    'FH','HF','EG','GE','GC','CG','HB','BH'
  ],  
  wrongCombo : [
    ['FH','EG'],
    ['FH','GE'],
    ['HF','EG'],
    ['HF','GE'],
    ['GC','HB'],
    ['GC','BH'],
    ['CG','HB'],
    ['CG','BH'],
  ],  
}

const dedoka = {
  dots : GEOMS.dedocahedron(1,1,1).rotateY(40/RAD).vertices.map(({x,y}, i) => [ 
    + (x*zoom+zoom+[]).slice(0,6), 
    + (y*zoom+zoom+[]).slice(0,6),
    String.fromCharCode(65 + i)
  ]),
  lines : [
    'AB','AG','AF','FG','GB','BC','FE','GH','EH','HC','ED','HD','CD',
    'BA','GA','FA','GF','BG','CB','EF','HG','HE','CH','DE','DH','DC',
    'FH','HF','EG','GE','GC','CG','HB','BH'
  ],  
  wrongCombo : [
    ['FH','EG'],
    ['FH','GE'],
    ['HF','EG'],
    ['HF','GE'],
    ['GC','HB'],
    ['GC','BH'],
    ['CG','HB'],
    ['CG','BH'],
  ],  
}

const cave = dedoka;
cave.coords = cave.dots.reduce((r,[x,y,k]) => ({...r, [k]:[x,y]}) , {});
cave.all = cave.dots.map(([,,key]) => key).sort().join('');

const DrawPipeGame = ({show, playOver, gainScore, setChecking}) => {
  const [selections, setSelections] = useState('');
  const [hasWin, setWin] = useState(false);
  const [tryAmount, trying] = useState(0);
  const [draws, setDraws] = useState([]);
  const [rad, turn] = useState(0);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    turn(r => r + .05);
    const d = GEOMS.dedocahedron(1,1,1).rotateX(13/RAD).rotateY(rad/RAD).vertices.map(({x,y}, i) => [ 
      + (x*zoom+zoom+[]).slice(0,6), 
      + (y*zoom+zoom+[]).slice(0,6),
      String.fromCharCode(65 + i)
    ])
    setDots(d)
  });

  const reset = () => { setSelections(''); };  
  
  const checkEachOnceAndLastEqualFirst = () => {
    const isWorth = (
      selections.length === cave.dots.length + 1
      && selections.slice(-1) === selections.slice(0,1)
      && selections.slice(1).split('').sort().join('') === cave.all
    )    
    const lines = [];
    for(let i = 2; i <= selections.length; i++) {
      lines.push(selections.slice(0,i).slice(-2));      
    }
    const invalid = lines.filter(line => cave.lines.indexOf(line) === -1)
    const badCombo = cave.wrongCombo.filter(([a,b]) => lines.indexOf(a) !== -1 && lines.indexOf(b) !== -1);    
    return isWorth && !invalid.length && !badCombo.length;
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
      lines.push([cave.coords[a], cave.coords[b]]);
    }
    setDraws(lines);
  }, [selections]);

  const draw = (key) => e => {
    // console.log(`${key} --- clicked! `);
    setSelections( sel => sel.slice(-1) === key ? sel.slice(0, sel.length - 1) : sel + key);
  }

  const lineStyle = {stroke:'white', strokeWidth:2};

  return (
    <>
      <IntroHeader>
        {cave_2_12.mission()}
        <br/><br/>
        {selections}
      </IntroHeader>
      <ModalHolder>
        <svg height="100vh" width="100vw">
          {
            draws.map(([[x1, y1],[x2, y2]]) => 
              <line 
                key={`${x1}:${y1}-${x2}:${y2}`}
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
          dots.map(([x, y, key]) => 
            <PipeDot 
              onClick={draw(key)}
              key={key} 
              style={{left:`${x}vmin`, top:`${(y + VPOS)}vmin`}}
            >{key}</PipeDot>
          )
        }
      </ModalHolder>
    </>
  );
};

const GameWithBackground = MultiRoundGameFrame(DrawPipeGame, QuestSketch);
export default props => <GameWithBackground {...props} />;