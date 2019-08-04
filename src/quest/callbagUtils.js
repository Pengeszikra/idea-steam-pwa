import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map } from 'callbag-basics';
import duration from 'callbag-duration-progress';
import wait from 'callbag-wait';
import pullWhen from 'callbag-pull-when';

export const distance = d => t => t * d;
export const easeOut = p => 1 - (1 - p) * (1 - p);

export const distancedMove = ( move = () => {}, dur = 200, dist = 100, waitFor = 0 ) => pipe (  
  duration(dur),
  wait(waitFor),
  map(easeOut),
  map(distance(dist)),
  forEach(move)
);
