import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import anime from 'animejs';

export default () => {
  const bottomRef = useRef();

  useEffect(()=>{
    const move = {
      targets: [bottomRef],
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 8000
    };
    console.log(move);
    anime(move);
  }, [bottomRef])

  return (
    <div ref={bottomRef} style={{position:'absolute', top:10, left:10}}>T.E.S.T</div>
  );
}
