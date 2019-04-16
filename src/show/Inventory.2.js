import React, {useState, useEffect, useRef} from 'react';
import { DragSource } from 'react-dnd';

const targetAreaStyle = {
  width: 200,
  height: 200,
  background: '#444',
  margin: '1em',
  display: 'inline-block',
}

const cardStyle = {
  width: 150,
  height: 200,
  background: '#777',
  margin: '1em',
  display: 'inline-block',
}

const TargetArea = ({id}) => {
  return <div style={targetAreaStyle} id={id} ></div>;
};
const Card = ({isDragging, dragSource}) => {
  return dragSource(<div style={cardStyle} id={id}></div>);
};
const CARD = 'card';
const cardSource = { beginDrag: ({text}) => ({text}), };
const cardCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const DraggableCard = DragSource(CARD, cardSource, cardCollect)(Card);

export default () => (
  <section style={{margin: '2em'}}>
    <h1>Drag and Drop test page</h1>
    <p>Veri important feauture for any application is drag and drop</p>    
    <TargetArea id={1} />
    <TargetArea id={2} />
    <DraggableCard />
    <DraggableCard />
  </section>
)