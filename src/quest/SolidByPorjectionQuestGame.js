import React, {useRef, useState, useEffect} from 'react';
import { QuestSketch, IntroButtonHolder, IntroButton } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent } from '../layouts/Geometries';
import ThreeArea from '../layouts/ThreeArea';
import showtime from '../utils/showtime';
import { irnd } from '../utils/randoms';

const ThreeInteraction = showtime(ThreeArea);

const SolidProjectionGame = studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];
    
  const colors = [irnd(0xFFFFFF), 1, irnd(0xFFFFFF)];
  const questItem = makeShape(shapes[irnd(shapes.length)],100,100,100, ...colors)
  questItem.translateZ(-300).translateY(250).rotateX(12/RAD).rotateY(45/RAD);
  scene.add(questItem);

  const [width, height] = [6, 5];

  Array(width * height).fill(0).map((_, i) => {    
    const shadow = makeShape(shapes[irnd(shapes.length)],30,30,30, irnd(0xFFFFFF), 1);
    shadow.translateZ(-300).translateX(i % width * 70 - 160).translateY((i / width | 0) * 70 - 200);
    scene.add(shadow);
  });

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
      <ThreeInteraction show={flow} add3DContent={SolidProjectionGame} />
      <IntroButtonHolder>
        <IntroButton onClick={e => {setFlow(false); questResultIs(true, position)}}>Stop</IntroButton>
      </IntroButtonHolder>
    </QuestSketch>
  );
};