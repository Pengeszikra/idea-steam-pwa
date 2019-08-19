import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';
import { pipe, forEach } from 'callbag-basics';
import { clickSource, filter } from './callbagUtils';

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const questChoice = irnd(shapes.length)
  const questItem = makeShape(shapes[questChoice],90,90,90, 0xAA5522, 1 , 0xFFAA77);  
  questItem.scale.multiplyScalar(55);
  questItem.translateZ(-300).translateY(320).rotateX(-12/RAD).rotateY(45/RAD);
  root.add(questItem);

  const itemsRoot = new THREE.Group();
  itemsRoot.translateY(-240);
  root.add(itemsRoot);  

  const [width, height] = [4, 5];
  const questCopyPos = irnd(width * height);
  
  const rotations = [
    [45,0,90],
    [45,0,45],
    [90,0,45],
    [15,15,15],
    [0,0,0],
    [0,90,0],
    [25,45,75],
  ];

  const selectMaterial = new THREE.MeshBasicMaterial( {color: 0x76418F } );
  const normalMaterial = new THREE.MeshBasicMaterial( {color: 0x130802 } );

  Array.from({length:width * height}, (_, i) => {
    const isSameShape = i === questCopyPos || Math.random() < .12;    
    const shadow = makeFlatColorShape(shapes[isSameShape ? questChoice : irnd(shapes.length)], 1, 1, 1, 0x130802);
    shadow.scale.multiplyScalar(25);
    shadow.position.set(i % width * 100 - 148, (i / width | 0) * 100, 0);    
    rotate(shadow, ...rotations[irnd(rotations.length)] );    
    itemsRoot.add(shadow);
    return shadow;
  });

  let foundeds = [];
  let isAllFounded = false;

  const handleClick = object => {
    object.material = object.material === selectMaterial
      ? normalMaterial 
      : selectMaterial;
  };

  const checkSelectionsResult = () => {
      const sameShape = mesh => mesh.geometry.uuid === questItem.geometry.uuid;
      const perfects = itemsRoot.children.filter(sameShape);
      foundeds = itemsRoot.children.filter( mesh => mesh.material === selectMaterial);
  
      if (perfects.length === foundeds.length && perfects.length === foundeds.filter(sameShape).length ) {
        gainScore(perfects.length * 10);
        playOver(true);
        isAllFounded = true;
      } else {
        itemsRoot.children.forEach( mesh => mesh.material = normalMaterial );
        gainScore(`${perfects.length} árnyékot kerss!`);
      }      
  };

  pipe (
    clickSource(camera, itemsRoot.children),    
    filter(object => !object.selected),
    forEach(handleClick)
  )

  setChecking(() => checkSelectionsResult);

  const animation = studio => {
    const {root, camera} = studio;
    questItem.rotateY(.4/RAD);
    isAllFounded && foundeds.forEach(unf => rotate(unf, 1,1,.2));
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
const GameForTime = MultiRoundGameFrame(Game, QuestSketch, true);

export default props => <GameWithBackground {...props} />;

export const SolidProjectionGameForTime = props => <GameForTime {...props} />;