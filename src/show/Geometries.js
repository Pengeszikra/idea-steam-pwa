import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import ThreeArea from '../show/ThreeArea';
import * as THREE from 'three';

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

const turnContent = geom => ({scene}) => {
  // make 3d object
  const RAD = 180/Math.PI
  const box = makeShape(geom, 100, 100, 100, 0xBBCCDD );
  box.rotateZ(12 / RAD);
  box.rotateX(32 / RAD);    
  scene.add(box); 
  // animation
  return () => {
    const boxMoving = setInterval( () => box.rotateY( 2/RAD ) , 30 );
    // unsubscribe
    return () => clearInterval(boxMoving);
  }
}

export const Add3D = ({content}) => <ThreeArea canvasClasses={['area-3d-canvas']} add3DContent={turnContent(content)}/>;

export const GameWith3dObjects = () => {
  return (
    <>
      <ThreeArea canvasClasses={['small-3d', 'p1']} add3DContent={turnContent(GEOMS.tetrahedron)}/>
      <ThreeArea canvasClasses={['small-3d', 'p2']} add3DContent={turnContent(GEOMS.dedocahedron)}/>
      <ThreeArea canvasClasses={['small-3d', 'p3']} add3DContent={turnContent(GEOMS.box)}/>
      <ThreeArea canvasClasses={['small-3d', 'p4']} add3DContent={turnContent(GEOMS.cone)}/>
      <ThreeArea canvasClasses={['small-3d', 'p5']} add3DContent={turnContent(GEOMS.icosahedron)}/>
      <ThreeArea canvasClasses={['small-3d', 'p6']} add3DContent={turnContent(GEOMS.octahedron)}/>
      <ThreeArea canvasClasses={['small-3d', 'p7']} add3DContent={turnContent(GEOMS.plane)}/>
    </>
  )
}