import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const questChoice = irnd(shapes.length)
  const questItem = makeShape(shapes[questChoice],90,90,90, 0xAA5522, 1 , 0xFFAA77);  
  questItem.scale.multiplyScalar(55);
  questItem.translateZ(-300).translateY(260).rotateX(-12/RAD).rotateY(45/RAD);
  root.add(questItem);

  const [width, height] = [4, 4];
  const questCopyPos = irnd(width * height);
  
  const rotations = [
    [45,0,90],
    [45,0,45],
    [90,0,45],
    [15,15,15],
    [0,0,0],
    [0,90,0],
    [25,45,75],
  ]

  let amount = 0;
  const shadows = Array(width * height).fill(0).map((_, i) => {    
    const isSameShape = i === questCopyPos || Math.random() < .2;
    // if (isSameShape) { amount ++; console.log(i) }; // TODO
    const shadow = makeFlatColorShape(shapes[isSameShape ? questChoice : irnd(shapes.length)], 45, 45, 45, 0x130802);
    shadow.scale.multiplyScalar(25);
    shadow.position.set(i % width * 100 - 148, (i / width | 0) * 100 - 200, 0);    
    rotate(shadow, ...rotations[irnd(rotations.length)] );    
    root.add(shadow);
    return shadow;
  });

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( root.children );
    const [{object} = {}] = intersects;
    
    if (object && object !== questItem && questItem.geometry.uuid == object.geometry.uuid) {
      root.remove(object);
      const {length} = root.children.filter(({geometry}) => geometry && geometry.uuid == questItem.geometry.uuid);
      if (length <= 1) {
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
    questItem.rotateY(.4/RAD);
    shadows
      .filter(shadow => shadow.geometry.type == questItem.geometry.type)
      // .forEach(shadow => rotate(shadow,-1,1,1));

    //camera.translateZ(1);
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