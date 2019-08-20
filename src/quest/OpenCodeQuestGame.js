import React, {useRef, useState, useEffect} from 'react';
import { useGesture } from 'react-use-gesture';
import { OpenGameHolder, IntroButton, IntroButtonHolder, GeomItem, OpenCodeQuest, TaskLabel, ItemHolder, LabelHolder, IngameHistory } from '../styles/divStore';
import doesOverlap from './../utils/doesOverlap';
import { taskSetups } from './data/openCodeQuest';
import SocratesSpeaking from '../layouts/SocratesSpeaking';
import { shuffle } from '../utils/randoms';
import { entrance, avatarNames } from '../engine/applicationData';

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

export default  ({interaction, level = 2, position}) => {
  const {questResultIs, instruction} = interaction;
  const [isSpeak, setSpeak] = useState(false)
  const [attached, setAttached] = useState(["", "", "", ""]);
  const [isOpen, openDoor] = useState(0);  
  const [task, setTask] = useState(...taskSetups[0]);
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const t4 = useRef(null);

  const targets = [t1, t2, t3, t4];

  useEffect(() => {
    const choised = Math.random() * 3 | 0;
    const selectedTask = {...taskSetups[level][choised]};
    const shapes = selectedTask.shapes.sort(shuffle);
    setTask({...selectedTask, shapes});
    return ()=>{};
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
    openDoor(isSolved ? 1 : -1);
  };

  const [topOne, topTwo, leftTwo, leftOne] = task.labels;
  
  return (    
    <OpenCodeQuest>
      <LabelHolder data-pos={'top'} >
        <TaskLabel>{topOne}</TaskLabel>
        <TaskLabel>{topTwo}</TaskLabel>
      </LabelHolder>
      <LabelHolder data-pos={'left'}>
        <TaskLabel>{leftOne}</TaskLabel>
        <TaskLabel>{leftTwo}</TaskLabel>
      </LabelHolder>
      <OpenGameHolder>        
        {targets.map((targetRef, key) => <GeomTarget key={key} fref={targetRef}></GeomTarget>)}
        <IntroButtonHolder>
          <IntroButton onClick={()=>questResultIs(true, position)}>simán kinyit</IntroButton>
          <IntroButton onClick={checkSolution}>Megoldás</IntroButton>
        </IntroButtonHolder>        
      </OpenGameHolder>      
      <ItemHolder>
        {task.shapes.map(shape => <QuestItem targets={targets} key={shape} setHold={holdFactory} shapeId={shape} />)}  
      </ItemHolder>
      <IngameHistory show={true} onClick={() => setSpeak(talk => !talk)} />
      <SocratesSpeaking
        show={isSpeak || isOpen === 1 || isOpen === -1}
        speakAbout={isOpen === 1 ? entrance.gratulation(avatarNames(level)) : isOpen === -1 ? entrance.fail(avatarNames(level)) :  instruction}
        level={level}
        handleStopSpeak={isOpen === 1 ? ()=>questResultIs(true, position) : isOpen === -1 ? () => openDoor(0) : () => setSpeak(false)}
      />
    </OpenCodeQuest>
  );
}