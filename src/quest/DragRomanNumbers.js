// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import divFactory from '../utils/divFactory';

const [Number] = divFactory(['roman-number']);

const dimension = 60;
// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, x) => index =>
  down && index === originalIndex
    ? { 
        x: curIndex * dimension + x,
        scale: 1.1, 
        zIndex: '1', 
        shadow: 15, 
        immediate: n => n === 'y' || n === 'zIndex' 
      }
    : { 
        x: order.indexOf(index) * dimension, 
        scale: 1, 
        zIndex: '0', 
        shadow: 1, 
        immediate: false 
      }
    ;

export default ({ items }) => {
  // Store indicies as a local ref, this represents the item order
  const order = useRef(items.map((_, index) => index)) 
  // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) 
  const bind = useGesture(({ args: [originalIndex], down, delta: [x,] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * dimension + x) / dimension), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    // Feed springs new style data, they'll animate the view without causing a single render
    console.log(newOrder, down, originalIndex, curIndex, x);
    setSprings(fn(newOrder, down, originalIndex, curIndex, x)) 
    if (!down) order.current = newOrder
  })
  return (
    //<div className="content" style={{ height: items.length * 100 }}>
    <>
      {springs.map(({ zIndex, shadow, x, scale }, i) => (
        <animated.div
          className = "roman-number"
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            transform: interpolate([x, scale], (x, s) => `translate3d(${x}px,0,0) scale(${s})`)
          }}
          children={items[i]}
        />
      ))}
    </>
  );
}