import React, {useState, useEffect, useRef} from 'react';
import DraggableCard from './DraggableCard';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';
const { useDragLayer } = dnd;

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
  return <div style={targetAreaStyle} id={id} ></div>;
};

const areaTarget = {  
  drop(props, monitor) { console.log(props) },
  canDrop(props) { return true },
}

const collect = (connect, monitor) => (
  {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
);

const Info = ({children}) => <div style={cardInfoStyle}>{children}</div>;

export default () => (
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
)