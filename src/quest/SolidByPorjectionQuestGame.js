import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import GLTFLoader from 'three-gltf-loader';

const loader = new GLTFLoader();

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {scene, camera} = studio;
  const shapes = [GEOMS.box,  GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.tetrahedron, ];

  const questItem = makeShape(shapes[irnd(shapes.length)],90,90,90, 0xAA5522, 1 , 0xFFAA77);
  questItem.translateZ(-300).translateY(260).rotateX(-12/RAD).rotateY(45/RAD);
  scene.add(questItem);

  loader.load('/solids/idomok.glb', gltf => {
   gltf.scene.scale.multiplyScalar(25);
   gltf.scene.translateY(-500);
   gltf.scene.rotateY(20/RAD)
   questItem.add(gltf.scene);
  });

  const [width, height] = [4, 4];

  const shadows = Array(width * height).fill(0).map((_, i) => {    
    const shadow = makeFlatColorShape(shapes[irnd(shapes.length)], 45, 45, 45, 0x130802);
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
    // console.log(intersects, found, questItem.geometry.type == object.geometry.type);
    if (object && object !== questItem && questItem.geometry.type == object.geometry.type) {
      scene.remove(object);
      const {length} = scene.children.filter(({geometry}) => geometry && geometry.type == questItem.geometry.type);
      if (length <= 1) {
        gainScore(100);
        playOver(true);
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
    questItem.rotateY(.4/RAD);
    shadows
      .filter(shadow => shadow.geometry.type == questItem.geometry.type)
      // .forEach(shadow => rotate(shadow,-1,1,1));

    //camera.translateZ(1);
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
export default props => <GameWithBackground {...props} />;