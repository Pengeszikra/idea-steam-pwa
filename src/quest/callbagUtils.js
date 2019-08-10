import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map, fromEvent, merge, from } from 'callbag-basics';
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

export const moveAndDone = done => (move, dur, dist, waitFor = 0 ) => {
  distancedMove(move, dur, dist, waitFor);
  console.log('-->')
}

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

export const middleLog = map(data => {console.log(data); return data});

export const clickSource = (camera, objects)  => pipe (
  fromEvent(document, 'click'),
  map(mousePosition),
  map(intersects(camera, objects)),
  filter(object => object),    
)

// callbag-filter --------------------------- original
const filter_original = condition => source => (start, sink) => {
  if (start !== 0) return;
  let talkback;
  source(0, (t, d) => {
    if (t === 0) {
      talkback = d;
      sink(t, d);
    } else if (t === 1) {
      if (condition(d)) sink(t, d);
      else talkback(1);
    }
    else sink(t, d);
  });
};

// callbag-filter --------------------------- reworking test 
const filter_01 = condition => source => (start, sink) => {
  if (start !== 0) return;
  let talkback;
  const handshake = (type, data) => {
    if (type === 1 && !condition(data)) return talkback(1);
    if (type === 0) talkback = data;
    sink(type, data);
  };
  source(0 , handshake);
};

// callbag-filter minimal style
export const filter = condition => source => (start, sink) => { 
  let talkback;
  start === 0 && source(0, (type, data) => {
    if (type === 1 && !condition(data)) return talkback(1);
    if (type === 0) talkback = data;
    sink(type, data);
  });
}


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