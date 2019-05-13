import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import ThreeArea from '../show/ThreeArea';
import * as THREE from 'three';
import { useGesture } from 'react-with-gesture';
import { GameHolder, GeomTarget, IntroButton } from '../layouts/divStore';
import { DropTarget } from 'react-dnd';

export const GEOMS = {
  box: (w,h,d) => new THREE.BoxGeometry( w , h , d, 1, 1, 1 ),
  dedocahedron: (w,h,d) => new THREE.DodecahedronGeometry(d),
  icosahedron: (w,h,d) => new THREE.IcosahedronGeometry(d),
  octahedron: (w,h,d) => new THREE.OctahedronGeometry(d),
  plane: (w,h,d) => new THREE.PlaneGeometry( w, h, d ),
  tetrahedron: (w,h,d) => new THREE.TetrahedronGeometry(d),
  cone: (w,h,d) => new THREE.ConeGeometry(d,h,32),
}

function makeShape( geomMaker, w , h , d , color, opacity = .7 ) {
  const geom = geomMaker(w,h,d);
  const flatShading = THREE.FlatShading;
  const mat = new THREE.MeshLambertMaterial( {color, flatShading, opacity } );
  return new THREE.Mesh( geom, mat );
}

const turnContent = (geom, d=100, w=100, h=100, color=0xBBCCDD, opacity=.7) => ({scene}) => {
  // make 3d object
  const RAD = 180/Math.PI
  const mesh = makeShape(geom, w, h, d, color, opacity );
  mesh.rotateZ(12 / RAD);
  mesh.rotateX(32 / RAD);    
  scene.add(mesh); 
  // animation
  return () => {
    const meshMoving = setInterval( () => mesh.rotateY( 2/RAD ) , 30 );
    // unsubscribe
    return () => clearInterval(meshMoving);
  }
}

const showContent = (geom, d=100, w=100, h=100, color=0xBBCCDD, opacity=.7) => ({scene}) => {
  const RAD = 180/Math.PI
  const mesh = makeShape(geom, w, h, d, color, opacity );
  scene.add(mesh); 
  return () => { return () => {}; }
}

export const Add3D = ({content}) => <ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(content)}/>;

export const GameWith3dObjects = () => {
  return (
    <>

    </>
  )
}

export const Draggable3D = ({add3DContent, top=0, left=0, ...props}) => {
  const [bind, {local: [x, y]}] = useGesture({
    onDragEnd: e => console.log('---- on drag end ---', e)
  });

  return (
      <ThreeArea 
        canvasClasses={['medium-3d']} add3DContent={add3DContent}
        {...bind()}
        style={{transform: `translate3d(${x}px, ${y}px, 0)`, top: `${top}vmin`, left: `${left}vmin`}}
        {...props}
      />
  );
}

export const Custom3DContent = ({scene}) => {
  const RAD = 180/Math.PI
  const box = makeShape(GEOMS.box, 250, 250, 250, 0xBBCCDD, 1 );
  box.rotateZ(22/RAD).rotateX(32/RAD);
  scene.add(box);

  return () => {
    const meshMoving = setInterval( () => {} , 30 );
    return () => {
      clearInterval(meshMoving)
    };
  }
};


export const Minigame = () => {
  return (    
    <>
      <GameHolder>
        <GeomTarget id={1}><p>Csúcsok száma: 3</p><p>Van derékszöge</p></GeomTarget>  
        <GeomTarget id={2}><p>Csúcsok száma: 4</p><p>Van derékszöge</p></GeomTarget>
        <GeomTarget id={3}><p>Csúcsok száma: 3</p><p>Nincs derékszöge</p></GeomTarget>
        <GeomTarget id={4}><p>Csúcsok száma: 4</p><p>Nincs derékszöge</p></GeomTarget>
        <IntroButton>Megoldás</IntroButton>
      </GameHolder>
      <Draggable3D add3DContent={showContent(GEOMS.box, 150, 150, 150)} top={15} left={0} />
      <Draggable3D add3DContent={showContent(GEOMS.dedocahedron, 150)} top={15} left={25} />
      <Draggable3D add3DContent={showContent(GEOMS.icosahedron, 150)} top={15} left={50} />
      <Draggable3D add3DContent={showContent(GEOMS.box, 5, 150, 150)} top={15} left={75} />
    </>          
  );
}