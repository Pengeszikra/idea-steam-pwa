import React, {useState, useEffect, useRef} from 'react';
import { DragSource } from 'react-dnd';

const cardStyle = {
  width: 150,
  height: 200,
  background: '#777',
  margin: '1em',
  display: 'inline-block',
}

const draggedStyle = {...cardStyle, background:'#222' }

export const CARD = 'card';

const cardSource = {
  beginDrag({id}) {
    return { id }
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return;

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log(item, dropResult);
    // CardActions.moveCardToList(item.id, dropResult.listId)
  },
}

const collect = (connect, monitor) => (
  {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
);

const Card = ({id, isDragging, connectDragSource}) => connectDragSource(
  <div style={isDragging ? draggedStyle : cardStyle} id={id} />
)

// Export the wrapped version
export default DragSource(CARD, cardSource, collect)(Card);