import React, {useState, useEffect, useRef} from 'react';
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd';
const { useDrag } = dnd;

const cardStyle = {
  width: 150,
  height: 200,
  background: '#777',
  margin: '1em',
  display: 'inline-block',
  color: '#222'  
}

const draggedStyle = {...cardStyle, background:'#222', color: 'transparent' }

const isDragging = false;


export default ({id, children}) => {
  const type = 'CARD';
  const [collectedProps, drag] = useDrag({
    item: { id, type },
  })
  // useEffect(()=>{console.log(collectedProps)},[collectedProps])
  return <div ref={drag} style={isDragging ? draggedStyle : cardStyle} id={id}>{children}</div>
};

// Fun-Fun-Function with Dan Abranow
// https://www.youtube.com/watch?v=G-aO5hzo1aw&list=PL0zVEGEvSaeEh5lzJx9f5B7RVs1FrHgNf

// DnD Hooks API
// http://react-dnd.github.io/react-dnd/docs/api/use-drag-layer

// react-beautiful-dnd
// maybe better alternative - or just doit myself
// https://github.com/atlassian/react-beautiful-dnd

// https://www.npmjs.com/package/react-drag-and-drop