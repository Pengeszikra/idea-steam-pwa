import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, RnHolder } from '../styles/divStore';
import { cave_2_10 } from '../engine/applicationData';
import DragRomanNumbers from './DragRomanNumbers';
import MultiRoundGameFrame from './multiRoundGameFrame';

const romanTasks = [
    {},
  // [ level 1 ]
    {
      task:     ['XXI', 'XIIIX',	'IVXXXI',	'IXLII', 'XLI',	'VLIXI', 'XILX',	'IXXXL',	'XXXXLI'],
      solution: ['XIX', 'XXIII',	'XXXVII',	'XLIII', 'LXI',	'LXVII', 'LXXI',	'LXXIX',	'LXXXIX'],
    },
  
  // [ level 2 ]
    {
      task:     ['XVIIC', 'IXXVCC', 'IIIXCD',	'CDIXCC', 'CIXLCC',	'IDC', 'XIMC', 'XMIX', 'MCLIXXXM'],
      solution: ['XCVII', 'CXCVIX', 'DCXIII',  'DCCCXI', 'CCCLIX', 'DCI', 'CMXI', 'MXXI', 'MMCLXXIX'],
    }
];

const useRomanNumber = (show, level) => {
  const [items, setItems] = useState([]);
  const [solution, setSolution] = useState('');

  useEffect(()=>{
    if (show) {      
      const index = romanTasks[level].task.length * Math.random() | 0;
      const current  = romanTasks[level].task[index];
      setSolution(romanTasks[level].solution[index]);
      setItems(current.split(''));  
    } else {
      // TODO find sloution of this crazy hack!
      setItems(' '.repeat(15).split('')); 
    }
  }, [show]);

  return [items, solution];
}

const RomanNumbersGame = ({show, playOver, gainScore, setChecking, level}) => {
  const [items, solution] = useRomanNumber(show, level);
      
  return show && items.length ? (
    <>
      <IntroHeader style={{marginTop:'20vmin'}}>{cave_2_10.mission()}</IntroHeader>
      <RnHolder style={{marginLeft: `${50 - (6 * items.length)}vmin`}}>
        <DragRomanNumbers 
          items={items} 
          solution={solution}
          setChecking={setChecking}
          gainScore={gainScore} 
          playOver={playOver}
        />
      </RnHolder>
    </>
  ) : null;
}

const GameWithBackground = MultiRoundGameFrame(RomanNumbersGame, QuestSketch);
export default props => <GameWithBackground {...props} />;