import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet, { isPerfectBody } from './data/blenderPlusPerfectSet';

import { pipe, forEach } from 'callbag-basics';
import { clickSource, filter } from './callbagUtils';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const [width, height] = [4, 6];

  const itemsRoot = new THREE.Group();
  itemsRoot.translateY(-50);
  root.add(itemsRoot);
  
  const rotations = [
    [45,0,90],
    [45,0,45],
    [90,0,45],
    [15,15,15],
    [0,0,0],
    [0,90,0],
    [25,45,75],
  ];

  const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );
  const normalMaterial = new THREE.MeshLambertMaterial( {color: 0xAA5522, flatShading:THREE.FlatShading, opacity:1 } );

  let foundeds = [];
  let isAllFounded = false;

  Array.from({length:width * height}, (_, i) => {
    const isSameShape = irnd(shapes.length);
    const item = makeShape(shapes[isSameShape], 1,1,1, 0xAA5522, 1 , 0xFFAA77);
    item.scale.multiplyScalar(25);
    item.position.set(i % width * 100 - 148, (i / width | 0) * 100 - 200, 0);    
    rotate(item, ...rotations[irnd(rotations.length)] );    
    itemsRoot.add(item);
    return item;
  });

  const handleClick = object => {
    object.material = object.material === selectMaterial
      ? normalMaterial 
      : selectMaterial;
  }

  pipe (
    clickSource(camera, itemsRoot.children),    
    filter(object => !object.selected),
    forEach(handleClick)
  )

  const checkSelectionsResult = () => {
    const perfects = itemsRoot.children.filter( mesh => isPerfectBody(mesh));
    foundeds = itemsRoot.children.filter( mesh => mesh.material === selectMaterial);
    const foundedPerfect = foundeds.filter(mesh => isPerfectBody(mesh));

    if (perfects.length === foundeds.length && perfects.length === foundedPerfect.length) {
      gainScore(perfects.length * 10);
      playOver(true);
      isAllFounded = true;
    } else {
      itemsRoot.children.forEach( mesh => mesh.material = normalMaterial );
      gainScore(`${perfects.length} testet kerss!`);
    }
  };

  setChecking(() => checkSelectionsResult);

  const animation = studio => {
    const {root, camera} = studio;
    isAllFounded && foundeds.forEach(unf => rotate(unf, 1,1,.2));
    itemsRoot.children.filter( mesh => mesh.material === selectMaterial).forEach(unf => rotate(unf, 1,1,.2))
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