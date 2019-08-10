import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd, shuffle } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';

import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map, fromEvent, merge } from 'callbag-basics';
import duration from 'callbag-duration-progress';
import wait from 'callbag-wait';
import pullWhen from 'callbag-pull-when';
import { mousePosition, clickSource, filter, distancedMove, moveAndDone } from './callbagUtils';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const double = arr => [...arr, ...arr];

  const shadows = double([...shapes].sort(shuffle));
  const solids  = double([...shapes].sort(shuffle));
  
  const render = root => item => root.add(item);
  const takeN = n => (_,i) => i < n;

  const solidRoot = new THREE.Group();
  const shadowRoot = new THREE.Group();
  solidRoot.translateX(-130);
  shadowRoot.translateX(130);

  root.add(solidRoot, shadowRoot);

  solids
    //.filter(takeN(6))
    .map(shape => makeShape(shape, 1,1,1, 0xAA5522, 1 , 0xFFAA77))
    .map(mesh => {mesh.scale.multiplyScalar(35); return mesh})
    .map((mesh, i) => {mesh.translateY(i * 120).rotateX(-12/RAD).rotateY(45/RAD); return mesh})
    .map(render(solidRoot))

  shadows
    //.filter(takeN(6))
    .map(shape => makeFlatColorShape(shape, 1,1,1, 0x130802))
    .map(mesh => {mesh.scale.multiplyScalar(35); return mesh})
    .map((mesh, i) => {mesh.translateY(i * 120).rotateX(-12/RAD).rotateY(45/RAD); return mesh})
    .map(render(shadowRoot))

  const measure = new THREE.Box3().setFromObject( solidRoot ).getSize();
  const lineHeight = measure.y;
  console.log(lineHeight);
  const halfScreen = 500;
  solidRoot.translateY(-lineHeight + halfScreen);
  shadowRoot.translateY(-halfScreen);
  const [solidStart, shadowStart] = [solidRoot.position.y, shadowRoot.position.y];

  let solid, shadow
  let pairFound = 0;
  const maxPairFound = 2;
  let center = null;
  let underCheck = false

  // too much happen there !! 
  const handleClick = target => {
    if (underCheck) return; 

    const isSolid = (target.parent === solidRoot );
    const object = target.clone();
    
    object.selected = true;

    /*
    if (isSolid) solid = object;
    if (!isSolid) shadow = object;
    */

    root.add(object);

    object.position.y = isSolid
      ? - ( - solidRoot.position.y - target.position.y )
      : - ( - shadowRoot.position.y - target.position.y )
    ;
    object.position.x = isSolid ? -130 : 130;
    const [x, y] = [object.position.x , object.position.y];

    distancedMove( xc => object.position.x = x - xc, 300, x );
    distancedMove( yc => object.position.y = y - yc, 300, y );

    if (!center) return center = object;

    const isPair = center.geometry.uuid ===  object.geometry.uuid && center.material !== object.material;

    underCheck = isPair;

    setTimeout(() => {
      console.log(`<-- ${isPair} -->`);
      const up = object.clone();
      const down = center.clone();
      root.add(up, down);
      distancedMove( y =>  up.position.y = - y, 800, 200, 250);
      distancedMove( y => down.position.y = + y, 800, 200, 250);

      setTimeout(() => root.remove(up, down), 250);

      root.remove(object);
      root.remove(center)
      center = null;
      underCheck = false;
    }, 250);
      
     

    /*
    if (solid && shadow) {
      if (solid.geometry.uuid === shadow.geometry.uuid) {
        pairFound ++
        distancedMove( y =>  solid.position.y = - y, 800, 200, 250);
        distancedMove( y => shadow.position.y = + y, 800, 200, 250);

        if(pairFound >= maxPairFound){
          gainScore(100);
          playOver(true);  
        }
      }
      else {
        distancedMove( y =>  solid.position.y = - y, 400, 400, 250);
        distancedMove( y => shadow.position.y = + y, 400, 400, 250);
      }
    }
    */
  };

  pipe (
    clickSource(camera, [...solidRoot.children, ...shadowRoot.children]),    
    filter(object => !object.selected),
    forEach(handleClick)
  )
  
  const animation = studio => {
    const {root, camera} = studio;

    const speed = 1;
    solidRoot.rotateY(1/RAD);
    solidRoot.translateY(speed);
    shadowRoot.translateY(-speed);
    
    // endless scroll
    if (solidRoot.position.y - halfScreen - speed > - lineHeight / 2) {
      solidRoot.position.y = solidStart;
      shadowRoot.position.y = shadowStart;
    }

    // TODO solve some unsubscribe call
    return () => console.log('--- destructure --- speed pairs ---');
  }
  
  return play3dContent(studio)(animation);
}

const Game = ({show, playOver, gainScore, setChecking}) => (
  <ThreeInteraction 
    show={show} 
    add3DContent={solidProjection3dContent({playOver, gainScore, setChecking})} 
    orthographic
  />
);
const GameWithBackground = MultiRoundGameFrame(Game, QuestSketch);
export default props => <GameWithBackground {...props} />;


  // resize by callbag, almost fine 
  /*
  pipe (    
    merge (
      fromIter([1]),
      fromEvent(global, 'resize'),
    ),    
    map(() => global.innerWidth),
    forEach(width => root.scale.setScalar(width / 500))
  )
  */