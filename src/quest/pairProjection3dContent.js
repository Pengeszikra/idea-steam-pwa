import * as THREE from 'three';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import { irnd, shuffle } from '../utils/randoms';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';
import { pipe, forEach } from 'callbag-basics';
import { clickSource, filter } from './callbagUtils';

export default ({playOver, gainScore, setChecking}) => studio => {
  const {camera, root} = studio;

  const shapes = blenderPlusPerfectSet(1.5);

  const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );
  const normalMaterial = new THREE.MeshLambertMaterial( {color: 0xAA5522, flatShading:THREE.FlatShading, opacity:1 } );
  
  const questShape = shapes[irnd(shapes.length)];
  const quest1st = makeFlatColorShape(questShape, 1, 1, 1, 0x130802);
  const quest2nd = quest1st.clone();  
  quest1st.translateX(-80).translateY(300).rotateX(0/RAD).rotateY(0/RAD);
  quest2nd.translateX( 80).translateY(300).rotateX(90/RAD).rotateY(0/RAD);
  quest1st.scale.setScalar(50);
  quest2nd.scale.setScalar(50);
  root.add(quest1st);
  root.add(quest2nd);

  const [width, height] = [4, 4];
  const itemsRoot = new THREE.Group();
  itemsRoot.translateX(-180).translateY(-200);
  root.add(itemsRoot);

  const sample = [questShape, ...shapes]
    .slice(0, width * height)
    .sort(shuffle);  

  sample.map((shape, i) => {    
    const item = makeShape(shape, 1, 1, 1, 0xAA5522, 1 , 0xFFAA77);
    item.scale.setScalar(32);
    item.position.set(i % width * 120, (i / width | 0) * 120, 0);    
    rotate(item,...([45,0,90].sort(shuffle)));
    itemsRoot.add(item);
    return item;
  });

  const handleClick = object => {
    object.material = object.material === selectMaterial
      ? normalMaterial 
      : selectMaterial;
  } 

  let foundeds = [];
  let isAllFounded = false;

  const checkSelectionsResult = () => {
   const rightOnes = mesh => mesh.geometry.uuid === quest1st.geometry.uuid;
   const perfects = itemsRoot.children.filter(rightOnes);
   foundeds = itemsRoot.children.filter( mesh => mesh.material === selectMaterial);
   const foundedPerfect = foundeds.filter(rightOnes);
     
   if (perfects.length === foundeds.length && perfects.length === foundedPerfect.length) {
      gainScore(perfects.length * 10);
      playOver(true);
      isAllFounded = true;
    } else {
      itemsRoot.children.forEach( mesh => mesh.material = normalMaterial );
      gainScore(`${perfects.length} testet kerss!`);
    }
  }

  pipe (
    clickSource(camera, itemsRoot.children),    
    filter(object => !object.selected),
    forEach(handleClick)
  )

  setChecking(() => checkSelectionsResult);

  const animation = studio => {
    const {root, scene, camera} = studio;    
    isAllFounded && foundeds.forEach(unf => rotate(unf, 1,1,.2));
  }
  
  return play3dContent(studio)(animation);
}