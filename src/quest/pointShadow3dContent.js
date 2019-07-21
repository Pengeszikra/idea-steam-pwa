//import React, { useState } from 'react';
import * as THREE from 'three';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';

export default ({playOver, gainScore, setChecking}) => studio => {
  const {camera, root} = studio;
    
  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];

  const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );
  const normalMaterial = new THREE.MeshLambertMaterial( {color: 0xAA5522, flatShading:THREE.FlatShading, opacity:1 } );
  
  const questShape = shapes[irnd(shapes.length)];
  const quest1st = makeFlatColorShape(questShape,70 ,70 ,70 , 0x130802);
  const quest2nd = quest1st.clone();
  quest1st.translateX(-80).translateY(260).rotateX(0/RAD).rotateY(0/RAD);
  quest2nd.translateX( 80).translateY(260).rotateX(0/RAD).rotateY(90/RAD);
  root.add(quest1st);
  root.add(quest2nd);

  const [width, height] = [4, 4];
  const selectables = new THREE.Group();
  root.add(selectables);

  const shadows = Array(width * height).fill(0).map((_, i) => {    
    const shadow = makeShape(shapes[irnd(shapes.length)], 45, 45, 45, 0xAA5522, 1 , 0xFFAA77);
    shadow.position.set(i % width * 100 - 148, (i / width | 0) * 100 - 200, 0);    
    rotate(shadow,45,0,90);
    selectables.add(shadow);
    return shadow;
  });

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( selectables.children );    
    const [{object} = {}] = intersects;    
    if (!object) return;
    object.material = object.material === selectMaterial
      ? normalMaterial 
      : selectMaterial;
  }

  let unFoundeds = [];
  let isAllFounded = false;

  const checkSelectionsResult = () => {
    unFoundeds = selectables.children
      .filter(({geometry, material}) => geometry && geometry.type == quest1st.geometry.type || material === selectMaterial)

    const {isSolved, score} = unFoundeds.reduce(
      ({isSolved, score},{geometry, material}) => ({
        isSolved: isSolved && geometry && geometry.type == quest1st.geometry.type  && material === selectMaterial,
        score: geometry && geometry.type == quest1st.geometry.type ? score + 10 : score      
      }), {isSolved:true, score:0});
     
    if (isSolved && score) {
      isAllFounded = true;
      gainScore(score);
      playOver(true);
      global.removeEventListener('click', onMouseMove, false );      
    } else {
      setTimeout(() => selectables.children.forEach(mesh => mesh.material = normalMaterial), 500);
      gainScore('Nem jó megoldás!'); 
    }
  }

  setChecking(() => checkSelectionsResult);

  const mouse = new THREE.Vector2();
  const onMouseMove = event => {
    mouse.x = ( event.clientX / global.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / global.innerHeight ) * 2 + 1;  
    click3d(mouse);
  }
  global.addEventListener( 'click', onMouseMove, false );

  const animation = studio => {
    const {root, scene, camera} = studio;    
    shadows
      .filter(shadow => shadow.geometry.type == quest1st.geometry.type)
    isAllFounded && unFoundeds.forEach(unf => rotate(unf, 1,1,.2))      
  }
  
  return play3dContent(studio)(animation);
}