import React, { useState } from 'react';
import * as THREE from 'three';
import { QuestSketch, IntroButtonHolder, IntroButton, ModalHolder, SmallTable } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import ThreeArea from '../layouts/ThreeArea';
import showtime from '../utils/showtime';
import { irnd } from '../utils/randoms';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

import usePipe, { usePipeWhen } from '../utils/usePipe';
import {forEach, interval, map, filter, take, pipe} from 'callbag-basics';
import {fromEvent, fromIter, combine, merge, flatten, concat, share} from 'callbag-basics';
import { animationFrames } from 'callbag-animation-frames';
import { isRegExp } from 'util';

const ThreeInteraction = showtime(ThreeArea);

const PairProjectionGame = (playOver, gainScore, setChecking) => studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];

  const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );
  const normalMaterial = new THREE.MeshLambertMaterial( {color: 0xAA5522, flatShading:THREE.FlatShading, opacity:1 } );
  
  const questShape = shapes[irnd(shapes.length)];
  const quest1st = makeFlatColorShape(questShape,70 ,70 ,70 , 0x130802);
  const questMaterial = quest1st.material;
  //const quest1st = makeShape(questShape, 45, 45, 45, 0xAA5522, 1 , 0xFFAA77);
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
      gainScore('Nem jó megoldás!')      
    }
  }

  setChecking(() => () => checkSelectionsResult());  

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
  return animation |> play3dContent(studio);
}

const ModalScore = showtime(
  ({score, ...props}) => (
    <ModalHolder {...props}>
      <SmallTable>{isNaN(score) ? score : `Score: ${score}`}</SmallTable>
    </ModalHolder>
  )
);

export default ({interaction:{questResultIs}, level = 1, position}) => {
  const [flow, setFlow] = useState(true);
  const [isSpeak, talking] = useState(false);
  const [score, setScore] = useState(0);
  const [gain, gainScore] = useState(0);
  const [itsOver, playOver] = useState(false);
  const [checkResult, setChecking] = useState(() => () => {});

  const handleGameReset = () => {
    gainScore(0);
    setFlow(f=>!f);
    playOver(false);        
  };

  usePipeWhen (itsOver) ( 
    interval(20), 
    take(gain),
    forEach(n => setScore(s => s + 1)),
  );

  return (
    <QuestSketch>
      <ThreeInteraction 
        show={flow} 
        add3DContent={PairProjectionGame(playOver, gainScore, setChecking)} 
        orthographic        
      />      
      <ModalScore score={gain} show={isNaN(gain)} onClick={() => gainScore(0)} />
      <ModalScore score={score} show={itsOver} onClick={() => questResultIs(true, position)} />
      <IntroButtonHolder>        
        <IntroButton onClick={handleGameReset}>reset</IntroButton>
        <IntroButton onClick={e => checkResult()}>megoldás</IntroButton>
      </IntroButtonHolder>
      <SocratesSpeaking show={isSpeak} speakAbout={'Teszt szovge ami igen hosszu mondanivalot is tratalmazhat igy mar mindjart jobb a lenyzo fekvese, azert az elegge para, hogy ettol fugg a Socrates megjelenese'} level={1} handleStopSpeak={()=> talking(false)} />
    </QuestSketch>
  );
};