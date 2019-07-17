import React, {useEffect} from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate, makeWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';

const pipeDraw3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {scene, camera} = studio;

  const shapes = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron];
  
  const questItem = makeWireframe(shapes[irnd(shapes.length)], 200 ,200 ,200 , 0xFFAA77);
  questItem.translateZ(-300).translateY(0).rotateX(0/RAD).rotateY(0/RAD);
  scene.add(questItem);

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( scene.children );
    const [{object} = {}] = intersects;
    // console.log(intersects, found, questItem.geometry.type == object.geometry.type);
    /*
    if (object && object !== questItem && questItem.geometry.type == object.geometry.type) {
      scene.remove(object);
      const {length} = scene.children.filter(({geometry}) => geometry && geometry.type == questItem.geometry.type);
      if (length <= 1) {
        gainScore(100);
        playOver(true);
      }
    }
    */
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
    //questItem.rotateY(.4/RAD);
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