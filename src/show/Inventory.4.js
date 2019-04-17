import React, {useState, useEffect, useRef} from 'react';
import DraggableCard from './DraggableCard';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';
const { useDragLayer, useDrop } = dnd;
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const targetAreaStyle = {
  width: 200,
  height: 200,
  background: '#444',
  margin: '1em',
  display: 'inline-block',
  position: 'relative',
}

const cardInfoStyle = { position:'absolute', margin:'1em' };
const infoStyleDragged = {...cardInfoStyle};

const CARD = 'card';

const TargetArea = ({id}) => {
  const accept = 'CARD';
  const [collectedProps, drop] = useDrop({
    accept,
  })  
  // useEffect(()=>{console.log(collectedProps)},[collectedProps])
  return <div ref={drop} style={targetAreaStyle} id={id} ></div>;
};

const Info = ({children}) => <div style={cardInfoStyle}>{children}</div>;

export default () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <section style={{margin: '2em'}}>
      <h1>Drag and Drop test page</h1>
      <p>Veri important feauture for any application is drag and drop</p> 
      <TargetArea id={1} />
      <TargetArea id={2} />
      <DraggableCard id={323}><Info>alfa</Info></DraggableCard>
      <DraggableCard id={243}><Info>beta</Info></DraggableCard>
      <DraggableCard id={673}><Info>gamma</Info></DraggableCard>
      <DraggableCard id={924}><Info>delta</Info></DraggableCard>      
    </section>
  </DragDropContextProvider>  
)