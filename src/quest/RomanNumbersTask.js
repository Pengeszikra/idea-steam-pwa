import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, IntroButton } from '../styles/divStore';
import { cave_2_10 } from '../engine/applicationData';
import divFactory from '../utils/divFactory';
import DragRomanNumbers from './DragRomanNumbers';

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

const [Number, TaskHolder] = divFactory(['roman-number', 'roman-task-holder']);

export default ({level}) => {
  const [index, setIndex] = useState(0);

  useEffect(()=>setIndex(romanTasks[level].task.length * Math.random() | 0), [setIndex]);

  const current  = romanTasks[level].task[index];
  const solution = romanTasks[level].solution[index];
    
  return (
    <QuestSketch style={{overflow:'hidden'}} >
      <IntroHeader>{cave_2_10.mission()}</IntroHeader>
      <TaskHolder>
        {/* {current.split("").map((num,key) => <Number key={key}>{num}</Number>)} */}
        <DragRomanNumbers items={current.split('')} />
      </TaskHolder>      
    </QuestSketch>
  );
}

