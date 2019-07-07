import React, {useRef, useState, useEffect} from 'react';
import { useGesture } from 'react-use-gesture';
import { GameHolder, IntroButton, IntroButtonHolder, GeomItem, OpenCodeQuest, TaskLabel, ItemHolder } from '../styles/divStore';
import doesOverlap from './../utils/doesOverlap';
import { taskSetups } from './data/openCodeQuest';

const QuestItem = ({targets, setHold, shapeId, level=1, ...props}) => {
  const [clearHold, setDrop] = setHold(shapeId);
  const [local, setLocal] = useState([0,0]);  

  const bind = useGesture({
    onDrag: dragState => setLocal(dragState.local),
    onDragStart: dragState => {clearHold()},
    onDragEnd: dragState => {
      const {currentTarget : shape} = dragState;      
      const overlaps = targets.filter(({current}) => doesOverlap(shape, current));
      targets.map(({current}) => current.style.filter='');
      if (overlaps.length === 1) {
        const [dropZone] = overlaps;
        dropZone.current.style.filter = 'brightness(1.4)';
        setDrop(dropZone);
      }
    },
  });

  const [xPos, yPos] = local;

  return (
    <GeomItem
      {...bind()}
      style={{transform: `translate3d(${xPos}px, ${yPos}px, 0)`}}
      data-shape={shapeId}
      {...props}
    />
  );
};

const  GeomTarget = ({fref, children, ...props}) => <div className="drop-target" ref={fref} {...props}>{children}</div>;

export default  ({interaction:{questResultIs}, level = 1, position}) => {
  const [attached, setAttached] = useState(["", "", "", ""]);
  const [solution, setSolution] = useState("Ez a megoldás");
  const [task, setTask] = useState(...taskSetups[0]);
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const t4 = useRef(null);

  const targets = [t1, t2, t3, t4];

  useEffect(() => {
    const choised = Math.random() * 3 | 0;
    const selectedTask = {...taskSetups[level][choised]};
    const shapes = selectedTask.shapes.sort((a, b) => Math.random() > .5 ? -1 : 1);
    setTask({...selectedTask, shapes});
  }, []);
  
  const holdFactory = (shape) => [
      () => setAttached(attached.map(e => e == shape ? null : e))
      ,
      (dropZone) => {
        const hold = [...attached];
        const index = targets.indexOf(dropZone);
        if (index > -1) {
          hold.map(prev => prev === shape ? null : prev );
          hold[index] = shape;
          setAttached(hold);
        }
      } 
    ]

  const checkSolution = () => {
    const isSolved = attached.length === attached.filter((shape, i) => shape === task.solution[i]).length;
    if (isSolved) {
      setTimeout(()=>questResultIs(isSolved, position), 1000);
    }
    setSolution( isSolved ? "Jó!" : "Rossz!" );
  };
  
  return (    
    <OpenCodeQuest>
      {task.labels.map((label, key) => <TaskLabel key={key} data-label={key}>{label}</TaskLabel>)}
      <GameHolder>        
        {targets.map((targetRef, key) => <GeomTarget key={key} fref={targetRef}></GeomTarget>)}
        <IntroButtonHolder>
          <IntroButton onClick={checkSolution}>{solution}</IntroButton>
        </IntroButtonHolder>        
      </GameHolder>      
      <ItemHolder>
        {task.shapes.map(shape => <QuestItem targets={targets} key={shape} setHold={holdFactory} shapeId={shape} />)}  
      </ItemHolder>
    </OpenCodeQuest>
  );
}