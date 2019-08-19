import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd, shuffle } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';

import { pipe, forEach } from 'callbag-basics';
import { clickSource, filter, distancedMove } from './callbagUtils';

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
    .map(shape => makeShape(shape, 1,1,1, 0xAA5522, 1 , 0xFFAA77))
    .map(mesh => {mesh.scale.multiplyScalar(35); return mesh})
    .map((mesh, i) => {mesh.translateY(i * 120).rotateX(-12/RAD).rotateY(45/RAD); return mesh})
    .map(render(solidRoot))

  shadows
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
  const maxPairFound = 4;
  let center = null;
  let underCheck = false

  // too much happen there !! 
  const handleClick = target => {
    if (underCheck) return; 

    const isSolid = (target.parent === solidRoot );
    const object = target.clone();
    
    object.selected = true;

    root.add(object);

    object.position.y = isSolid
      ? - ( - solidRoot.position.y - target.position.y )
      : - ( - shadowRoot.position.y - target.position.y )
    ;
    object.position.x = isSolid ? -130 : 130;
    const [x, y] = [object.position.x , object.position.y];

    distancedMove( xc => object.position.x = x - xc, 250, x );
    distancedMove( yc => object.position.y = y - yc, 250, y );

    if (!center) return center = object;

    const isPair = center.geometry.uuid ===  object.geometry.uuid && center.material !== object.material;

    underCheck = true;

    setTimeout(() => {
      const one = object.clone();
      const two = center.clone();
      root.add(one, two);
      
      distancedMove( y => one.position.y = - y, 500, isPair ? 200 : 400);
      distancedMove( y => two.position.y = + y, 500, isPair ? 200 : 400);

      if (isPair) {
        one.position.z = 100;
        two.position.z = 100;
        distancedMove( z => {
          one.scale.setScalar(z);
          two.scale.setScalar(z);
        }, 500, 100);
      }
      
      setTimeout(() => root.remove(one, two), 700);

      root.remove(object, center);
      center = null;
      underCheck = false;

      if (isPair) {
        pairFound ++;
        if (pairFound >= maxPairFound) {
          gainScore(100);
          playOver(true);  
        }
      }

    }, 260);

  };

  pipe (
    clickSource(camera, [...solidRoot.children, ...shadowRoot.children]),    
    filter(object => !object.selected),
    forEach(handleClick)
  )
  
  const animation = studio => {
    const {root, camera} = studio;

    const speed = 3;
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
