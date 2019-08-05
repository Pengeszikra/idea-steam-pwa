import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map, fromEvent, merge, from, filter } from 'callbag-basics';
import duration from 'callbag-duration-progress';
import wait from 'callbag-wait';
import pullWhen from 'callbag-pull-when';
import sample from 'callbag-sample';

import * as THREE from 'three';

export const distance = d => t => t * d;
export const easeOut = p => 1 - (1 - p) * (1 - p);

export const distancedMove = ( move = () => {}, dur = 200, dist = 100, waitFor = 0 ) => pipe (  
  duration(dur),
  wait(waitFor),
  map(easeOut),  
  map(distance(dist)),
  forEach(move)
);

export const mousePosition = event => ({
  x: ( event.clientX / global.innerWidth ) * 2 - 1,
  y: - ( event.clientY / global.innerHeight ) * 2 + 1,
});

const intersects = (camera, objects) => mouse => {
  const ray = new THREE.Raycaster();
  ray.setFromCamera( mouse, camera );
  const intersects = ray.intersectObjects( objects );
  const [{object} = {}] = intersects;    
  return object;
};

export const clickSource = (camera, objects)  => pipe (
  fromEvent(document, 'click'),
  map(mousePosition),
  map(intersects(camera, objects)),
  filter(object => object),    
)



// distancedMove( console.log )

// https://github.com/pull-stream/pull-stream

// https://staltz.com/why-we-need-callbags.html

// definition of callbag 
// (type: 0|1|2, payload?: any) => void 

/*

const originalMap = mapping => source => (start, sink) => {
  if (start !== 0) return;
  source(0, (t, data) => {
    sink(t, t === 1 ? mapping(data) : data)
  });
};

const basicOperator = source => (start, sink) => {
  if (start !== 0) return;
  source(
    0, 
    (t, data) => sink(
      t, 
      t === 1 
        ? [...data] 
        : t === 2 ? '--- its over ---' : data
    )
  );
};

const pausableInterval = period => (start, sink) => {
  if (start !== 0) return;
  let i = 0, id = null;
  const pause = () => { clearInterval(id);  id = null;  };
  const resume = () => { id = setInterval(() => sink(1, i++), period); };
  sink(0, t => (t === 1) ? id ? pause() : resume() : (t === 2) && pause() );
  resume();
};

// fromIter( (function * (){ yield 1; yield "hoppa"})() ),

pipe(
  fromIter('hello callbag'.split(' ')),
  basicOperator,
  forEach(console.log)
)

*/