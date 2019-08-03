import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, GEOMS, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import { getMeshes, getMinimal } from './blenderObjects';
import { interval, pipe, forEach, flatten, fromPromise, fromIter, take } from 'callbag-basics';
import pullWhen from 'callbag-pull-when';

// really nice example for controlled fromIter

function * randomIter () { for(let i=0; i < 22; i++) yield irnd(150) }
const shuffle = (...arr) => arr.sort(() => Math.random() > .5 ? -1 : 1);

pipe (
  fromIter(shuffle(1,2,3,4,5,6,7)),
  pullWhen(interval(200)),
  // take(5),
  forEach(console.log),
)

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {scene, camera} = studio;
  const shapes = getMeshes().map(({geometry}) => ((w, h, d) => geometry));

  const small = 1.5;
  shapes.push(
    () => GEOMS.box(small, small, small),
    () => GEOMS.dedocahedron(small, small, small),
    () => GEOMS.octahedron(small, small, small),
    () => GEOMS.tetrahedron(small, small, small),
    () => GEOMS.icosahedron(small, small, small),
  ); 

  const questChoice = irnd(shapes.length)
  const questItem = makeShape(shapes[questChoice],90,90,90, 0xAA5522, 1 , 0xFFAA77);  
  questItem.scale.multiplyScalar(55);
  questItem.translateZ(-300).translateY(260).rotateX(-12/RAD).rotateY(45/RAD);
  scene.add(questItem);

  const [width, height] = [4, 4];
  const questCopyPos = irnd(width * height);
  
  const rotations = [
    [45,0,90],
    [45,0,45],
    [90,0,45],
    [15,15,15],
    [0,0,0],
    [0,90,0],
    [25,45,75],
  ]

  let amount = 0;
  const shadows = Array(width * height).fill(0).map((_, i) => {    
    const isSameShape = i === questCopyPos || Math.random() < .2;
    if (isSameShape) { amount ++; console.log(i) }; // TODO
    const shadow = makeFlatColorShape(shapes[isSameShape ? questChoice : irnd(shapes.length)], 45, 45, 45, 0x130802);
    shadow.scale.multiplyScalar(25);
    shadow.position.set(i % width * 100 - 148, (i / width | 0) * 100 - 200, 0);    
    rotate(shadow, ...rotations[irnd(rotations.length)] );    
    scene.add(shadow);
    return shadow;
  });

  console.log('same shape : ', amount)

  const click3d = mouse => {
    const ray = new THREE.Raycaster();
    ray.setFromCamera( mouse, camera );
    const intersects = ray.intersectObjects( scene.children );
    const [{object} = {}] = intersects;
    // console.log(intersects, questItem.geometry.uuid, object.geometry.uuid);

    if (object && object !== questItem && questItem.geometry.uuid == object.geometry.uuid) {
      scene.remove(object);
      const {length} = scene.children.filter(({geometry}) => geometry && geometry.uuid == questItem.geometry.uuid);
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


  
   /*
   loader.load('/solids/idomok.glb', gltf => {
    //loader.load('/solids/tree.glb', gltf => {
   // gltf.scene.scale.multiplyScalar(55);
   const meshes = gltf.scene.children.filter(({type})=> type ==="Mesh");
   const first = meshes[irnd(meshes.length)];
   first.scale.multiplyScalar(55);
   //first.translateY(-200)
   //first.translateX(200).translateY(-50);
   first.material =  questItem.material;
   //questItem.add(gltf.scene);
   questItem.add(first)
   questItem.translateY(500); // hide
   first.translateY(-500); // show
   addWireframe(first, 0xFFAA77);   
  });
  */