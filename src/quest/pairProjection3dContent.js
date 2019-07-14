import React, { useState } from 'react';
import * as THREE from 'three';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';

export default ({playOver, gainScore, setChecking}) => studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];

  const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );
  const normalMaterial = new THREE.MeshLambertMaterial( {color: 0xAA5522, flatShading:THREE.FlatShading, opacity:1 } );
  
  const questShape = shapes[irnd(shapes.length)];
  const quest1st = makeFlatColorShape(questShape,70 ,70 ,70 , 0x130802);
  const questMaterial = quest1st.material;
  const quest2nd = quest1st.clone();
  quest1st.translateX(-80).translateY(260).rotateX(0/RAD).rotateY(0/RAD);
  quest2nd.translateX( 80).translateY(260).rotateX(0/RAD).rotateY(90/RAD);
  scene.add(quest1st);
  scene.add(quest2nd);

  const [width, height] = [4, 4];

  const shadows = Array(width * height).fill(0).map((_, i) => {    
    const shadow = makeShape(shapes[irnd(shapes.length)], 45, 45, 45, 0xAA5522, 1 , 0xFFAA77);
    shadow.position.set(i % width * 100 - 148, (i / width | 0) * 100 - 200, 0);    
    rotate(shadow,45,0,90);
    scene.add(shadow);
    return shadow;
  });

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( scene.children );
    const [{object} = {}] = intersects;    

    if (!object || object === quest1st || object === quest2nd) return;
   
    object.material = object.material === selectMaterial
      ? normalMaterial 
      : selectMaterial;
  }

  let unFoundeds = [];
  let isAllFounded = false;

  const checkSelectionsResult = () => {
    unFoundeds = scene.children
      .filter(({material}) => material !== questMaterial)
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
      global.removeEventListener( 'click', onMouseMove, false );      
    } else {
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
    const {scene, camera} = studio;    
    shadows
      .filter(shadow => shadow.geometry.type == quest1st.geometry.type)
      // .forEach(shadow => rotate(shadow,-1,1,1));
    isAllFounded && unFoundeds.forEach(unf => rotate(unf, 1,1,.2))      
    // rotate(quest1st, 1,1,.1)      
    // camera.translateZ(1); // ortho camera distance dosn't count
  }
  
  // TODO az event listenereket igy nem szedem le ! 
  return play3dContent(studio)(animation);
}