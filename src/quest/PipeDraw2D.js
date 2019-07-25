import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, CubeUv, CubeUvArea, IntroButtonHolder, IntroButton, ModalHolder } from '../styles/divStore';
import nets from './netsOfCube';
import MultiRoundGameFrame from './multiRoundGameFrame';
import divFactory from '../utils/divFactory';
import { cave_2_12 } from '../engine/applicationData';

const [PipeDot] = divFactory('pipe-dot no-sel');

const cubeDots = [
                 [51, 30,  'A'],
  [20, 55, 'F'], [51, 55,  'G'], [80, 55, 'B'],
  [20, 80, 'E'], [51, 80,  'H'], [80, 80, 'C'],
                 [51, 105, 'D'],
];
const cubeLines = [
  'AB','AG','AF','FG','GB','BC','FE','GH','EH','HC','ED','HD','CD',
  'BA','GA','FA','GF','BG','CB','EF','HG','HE','CH','DE','DH','DC',
  'FH','HF','EG','GE','GC','CG','HB','BH'
];
const cubeWrongCombo = [
  ['FH','EG'],
  ['FH','GE'],
  ['HF','EG'],
  ['HF','GE'],
  ['GC','HB'],
  ['GC','BH'],
  ['CG','HB'],
  ['CG','BH'],
];
const cubeAll = cubeDots.map(([,,key]) => key).sort().join('');

const DrawPipeGame = ({show, playOver, gainScore, setChecking}) => {
  const [matrix, setMatrix] = useState([]);
  const [selections, setSelections] = useState('');
  const [hasWin, setWin] = useState(false);
  const [tryAmount, trying] = useState(0);

  const reset = () => {
      setMatrix([]);
      setSelections('');
  };  
  
  const checkEachOnceAndLastEqualFirst = () => {
    const isWorth = (
      selections.length === cubeDots.length + 1
      && selections.slice(-1) === selections.slice(0,1)
      && selections.slice(1).split('').sort().join('') === cubeAll
    )    
    const lines = [];
    for(let i = 2; i <= selections.length; i++) {
      lines.push(selections.slice(0,i).slice(-2));      
    }
    const invalid = lines.filter(line => cubeLines.indexOf(line) === -1)
    const badCombo = cubeWrongCombo.filter(([a,b]) => lines.indexOf(a) !== -1 && lines.indexOf(b) !== -1);    
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
  }, [selections]);

  const draw = (key) => e => {
    // console.log(`${key} --- clicked! `);
    setSelections( sel => sel.slice(-1) === key ? sel.slice(0, sel.length - 1) : sel + key);
  }

  return (
    <>
      <IntroHeader>
        {cave_2_12.mission()}
        <br/><br/>
        {selections}
      </IntroHeader>
      <ModalHolder>
        {
          cubeDots.map(([x, y, key]) => 
            <PipeDot 
              onClick={draw(key)}
              key={key} 
              style={{left:`${x}vmin`, top:`${(y+10)}vmin`}}
            >{key}</PipeDot>
          )
        }
      </ModalHolder>
    </>
  );
};

const GameWithBackground = MultiRoundGameFrame(DrawPipeGame, QuestSketch);
export default props => <GameWithBackground {...props} />;