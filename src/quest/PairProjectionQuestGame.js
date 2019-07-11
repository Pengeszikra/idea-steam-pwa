import React, { useState } from 'react';
import * as THREE from 'three';
import { QuestSketch, IntroButtonHolder, IntroButton, ModalHolder, SmallTable } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import ThreeArea from '../layouts/ThreeArea';
import showtime from '../utils/showtime';
import { irnd } from '../utils/randoms';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

import usePipe from '../utils/usePipe';
import {forEach, interval, map, filter, take, pipe} from 'callbag-basics';
import {fromEvent, fromIter, combine, merge, flatten, concat, share} from 'callbag-basics';
import { animationFrames } from 'callbag-animation-frames';

const ThreeInteraction = showtime(ThreeArea);

const PairProjectionGame = (questResultIs, setScore) => studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];
  
  const questShape = shapes[irnd(shapes.length)];
  const quest1st = makeFlatColorShape(questShape,70 ,70 ,70 , 0x130802);
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
    if (object && object !== quest1st && object !== quest2nd && quest1st.geometry.type == object.geometry.type) {
      scene.remove(object);
      const {length} = scene.children.filter(({geometry}) => geometry && geometry.type == quest1st.geometry.type);
      if (length <= 2) {
        setScore( score => score + 100);
        setTimeout(() => questResultIs(true), 2000);
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
    shadows
      .filter(shadow => shadow.geometry.type == quest1st.geometry.type)
      // .forEach(shadow => rotate(shadow,-1,1,1));
    //camera.translateZ(1);
  }
  
  // TODO az event listenereket igy nem szedem le ! 
  return animation |> play3dContent(studio);
}

const ModalScore = showtime(
  ({score}) => (
    <ModalHolder>
      <SmallTable>{`Score: ${score}`}</SmallTable>
    </ModalHolder>
  )
);

export default ({interaction:{questResultIs}, level = 1, position}) => {
  const [flow, setFlow] = useState(true);
  const [isSpeak, talking] = useState(false);
  const [score, setScore] = useState(-1);

  /*
  usePipe(
    interval(1000),
    take(5),
    forEach( r => console.log(r))
  );
  */

  return (
    <QuestSketch>
      <ThreeInteraction 
        show={flow} 
        add3DContent={PairProjectionGame(r => questResultIs(r, position), setScore)} 
        orthographic
      />
      <ModalScore score={score} show={score > 0} />
      <IntroButtonHolder>
        <IntroButton onClick={e => {setScore(0); setFlow(f => !f); questResultIs(true, position)}}>Stop</IntroButton>
      </IntroButtonHolder>
      <SocratesSpeaking show={isSpeak} speakAbout={'Teszt szovge ami igen hosszu mondanivalot is tratalmazhat igy mar mindjart jobb a lenyzo fekvese, azert az elegge para, hogy ettol fugg a Socrates megjelenese'} level={1} handleStopSpeak={()=> talking(false)} />
    </QuestSketch>
  );
};