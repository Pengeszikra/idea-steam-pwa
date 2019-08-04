import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd, shuffle } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';

import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map } from 'callbag-basics';
import duration from 'callbag-duration-progress';
import wait from 'callbag-wait';
import pullWhen from 'callbag-pull-when';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const shadows = [...shapes].sort(shuffle);
  const solids  = [...shapes].sort(shuffle);

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
    .map((mesh, i) => {mesh.translateY(330 - i * 120).rotateX(-12/RAD).rotateY(45/RAD); return mesh})
    .map(render(solidRoot))

  shadows
    //.filter(takeN(6))
    .map(shape => makeFlatColorShape(shape, 1,1,1, 0x130802))
    .map(mesh => {mesh.scale.multiplyScalar(35); return mesh})
    .map((mesh, i) => {mesh.translateY(1800 - i * 120).rotateX(-12/RAD).rotateY(45/RAD); return mesh})
    .map(render(shadowRoot))

  let solid, shadow    

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( [...solidRoot.children, ...shadowRoot.children] );
    const [{object} = {}] = intersects;
    
    if (!object) return;
    const isSolid = (object.parent === solidRoot );
    if (isSolid && solid) root.remove(solid);
    if (isSolid) solid = object;
    if (!isSolid && shadow) root.remove(shadow);
    if (!isSolid) shadow = object;

    root.add(object)    
    object.position.sub(!isSolid ? solidRoot.position : shadowRoot.position);
    object.position.sub(object.position)
    object.translateY(isSolid ? -100 : 100)

    if (solid && shadow) {      
      if (solid.geometry.uuid === shadow.geometry.uuid) {
        gainScore(100);
        playOver(true);
      }
    }

  }
  
  const mouse = new THREE.Vector2();
  const onMouseMove = event => {
    mouse.x = ( event.clientX / global.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / global.innerHeight ) * 2 + 1;  
    click3d(mouse);
  }

  global.addEventListener( 'click', onMouseMove, false );
  
  const animation = studio => {
    const {root, camera} = studio;

    const speed = .5;
    solidRoot.rotateY(1/RAD);
    solidRoot.translateY(speed);
    shadowRoot.translateY(-speed);

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