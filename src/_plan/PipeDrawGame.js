import React, {useEffect} from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate, makeWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from '../quest/multiRoundGameFrame';

const pipeDraw3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {scene, camera} = studio;

  //const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];
  //const geom = shapes[irnd(shapes.length)];
  const geom =  GEOMS.dedocahedron
  const questItem = makeWireframe(geom, 200 ,200 ,200 , 0xFFAA77);
  questItem.translateZ(-300).translateY(0).rotateX(0/RAD).rotateY(30/RAD);
  scene.add(questItem);

  // pomtok a modelen
  // https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_convex.html
  // console.log(new THREE.DodecahedronGeometry( 10 ).vertices);
  console.log(GEOMS.dedocahedron(1,1,1).rotateY(30/RAD).vertices.map(({x,y}, i) => [ 
    + (x*50+50+[]).slice(0,5)
    , 
    + (y*50+50+[]).slice(0,5)
    ,
    String.fromCharCode(65 + i)
  ]));

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( scene.children );
    const [{object} = {}] = intersects;
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
    // questItem.rotateY(.4/RAD);
    //shadows.filter(shadow => shadow.geometry.type == questItem.geometry.type)
      // .forEach(shadow => rotate(shadow,-1,1,1));

    //camera.translateZ(1);
  }
  
  return play3dContent(studio)(animation);
}

const Game = ({show, playOver, gainScore, setChecking}) => {
  useEffect(() => {
    setChecking(() => () => {
      gainScore(50); 
      playOver(true);
    });
  }, []);

  return (  
    <ThreeInteraction 
      show={show} 
      add3DContent={pipeDraw3dContent({playOver, gainScore, setChecking})} 
    />
  );
}

const GameWithBackground = MultiRoundGameFrame(Game, QuestSketch);
export default props => <GameWithBackground {...props} />;