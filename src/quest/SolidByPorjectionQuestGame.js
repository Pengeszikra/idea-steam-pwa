import React, {useRef, useState, useEffect} from 'react';
import * as THREE from 'three';
import { QuestSketch, IntroButtonHolder, IntroButton } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent } from '../layouts/Geometries';
import ThreeArea from '../layouts/ThreeArea';
import showtime from '../utils/showtime';
import { irnd } from '../utils/randoms';

const ThreeInteraction = showtime(ThreeArea);

const SolidProjectionGame = questResultIs => studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];
  
  const questItem = makeShape(shapes[irnd(shapes.length)],100,100,100, 0xAA5522, 1 , 0xFFAA77);
  questItem.translateZ(-300).translateY(270).rotateX(-12/RAD).rotateY(45/RAD);
  scene.add(questItem);

  const [width, height] = [6, 6];

  Array(width * height).fill(0).map((_, i) => {    
    const shadow = makeShape(shapes[irnd(shapes.length)], 30, 30, 30, 0x000000, 1);
    shadow.position.set(i % width * 70 - 170, (i / width | 0) * 70 - 240, -300);    
    scene.add(shadow);
  });

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( scene.children );
    const [{object} = {}] = intersects;
    // console.log(intersects, found, questItem.geometry.type == object.geometry.type);
    if (object && object !== questItem && questItem.geometry.type == object.geometry.type) {
      scene.remove(object);
      const {length} = scene.children.filter(({geometry}) => geometry && geometry.type == questItem.geometry.type);
      if (length <= 1) {
        questResultIs(true)
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
    const {scene, camera} = studio;
    questItem.rotateY(.3/RAD);
    //camera.translateZ(1);
  }
  
  return animation |> play3dContent(studio);
}

export default ({interaction:{questResultIs}, level = 1, position}) => {
  const [flow, setFlow] = useState(true);

  return (
    <QuestSketch>
      <ThreeInteraction show={flow} add3DContent={SolidProjectionGame(r => questResultIs(r, position))} />
      <IntroButtonHolder>
        <IntroButton onClick={e => {setFlow(f => !f); questResultIs(true, position)}}>Stop</IntroButton>
      </IntroButtonHolder>
    </QuestSketch>
  );
};