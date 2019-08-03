import React, {useState} from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import { getMeshes, getMinimal } from './blenderObjects';

// callbag playground

import { interval, pipe, forEach, flatten, fromPromise, fromIter, take, map } from 'callbag-basics';
import duration from 'callbag-duration-progress';
import wait from 'callbag-wait';
// import pullWhen from 'callbag-pull-when';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;
  const shapes = getMinimal().map(({geometry}) => (() => geometry));

  const getSacledColorMesh = (shapeCreator, scale = 1, color = 0xAA5522, lineColor = 0xFFAA77) => {
    const mesh = makeShape(shapeCreator, 1, 1, 1, color, 1 , lineColor); 
    mesh.scale.multiplyScalar(scale);
    return mesh;
  }

  const actorOnField = (color = 0x555588) => {
    const field = getSacledColorMesh(shapes[0], 155, 0x224422 , 0x447744);
    const actor = getSacledColorMesh(shapes[1], 155, color    , 0x9999CC);
    const group = new THREE.Group();
    group.add(field, actor); 
    group.translateZ(-300).rotateX(12/RAD).rotateY(45/RAD);  
    return group;
  }

  const together = actorOnField(); root.add(together);
  const other = actorOnField(0x442222); root.add(other);
  other.position.set(50, 700, -800)

  const distance = d => t => t * d;
  const easeOut = p => 1 - (1 - p) * (1 - p);

  pipe (  
    duration(700),
    map(easeOut),
    map(distance(800)),
    forEach( y => together.position.y = 600 - y)
  )

  pipe (    
    duration(700),
    wait(500),
    map(easeOut),
    map(distance(800)),
    forEach( y => other.position.y = 700 - y)
  )  

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( root.children );
    const [{object} = {}] = intersects;
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
    together.children[1].rotateY(.4/RAD);
    other.children[1].rotateY(-.4/RAD);
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
