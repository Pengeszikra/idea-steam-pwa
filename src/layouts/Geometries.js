import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import ThreeArea from './ThreeArea';
import * as THREE from 'three';

export const RAD = 180/Math.PI;

export const GEOMS = {
  box: (w,h,d) => new THREE.BoxGeometry( w , h , d, 1, 1, 1 ),
  dedocahedron: (w,h,d) => new THREE.DodecahedronGeometry(d),
  icosahedron: (w,h,d) => new THREE.IcosahedronGeometry(d),
  octahedron: (w,h,d) => new THREE.OctahedronGeometry(d),
  plane: (w,h,d) => new THREE.PlaneGeometry( w, h, d ),
  tetrahedron: (w,h,d) => new THREE.TetrahedronGeometry(d),
  cone: (w,h,d) => new THREE.ConeGeometry(d,h,32),
}

export function makeShape( geomMaker, w , h , d , color, opacity = .7, lineColor, linewidth = 1 ) {
  const geom = geomMaker(w,h,d);
  const flatShading = THREE.FlatShading;
  const mat = new THREE.MeshLambertMaterial( {color, flatShading, opacity} );
  const body = new THREE.Mesh( geom, mat );

  if (lineColor) {
    const wmat = new THREE.LineBasicMaterial( { color: lineColor, linewidth } );
    const  hardEdgesGeo = new THREE.EdgesGeometry(geom); 
    const wireframe = new THREE.LineSegments( hardEdgesGeo, wmat );
    body.add(wireframe);  
  }

  return body;   
}

export function addWireframe( body, lineColor, linewidth = 1) {
  const wmat = new THREE.LineBasicMaterial( { color: lineColor, linewidth } );
  const  hardEdgesGeo = new THREE.EdgesGeometry(body.geometry); 
  const wireframe = new THREE.LineSegments( hardEdgesGeo, wmat );
  body.add(wireframe);
  return body;
}

export function makeWireframe( geomMaker, w , h , d , lineColor, linewidth = 1 ) {
  const geom = geomMaker(w,h,d);
  const wmat = new THREE.LineBasicMaterial( { color: lineColor, linewidth } );
  const  hardEdgesGeo = new THREE.EdgesGeometry( geom); 
  const wireframe = new THREE.LineSegments( hardEdgesGeo, wmat );
  return wireframe;   
}


export function makeFlatColorShape( geomMaker, w , h , d , color) {
  const geom = geomMaker(w,h,d);
  const mat = new THREE.MeshBasicMaterial( {color} );
  const body = new THREE.Mesh( geom, mat );  
  return body;   
}

// use : return flyThroughtRandomSolid |> play({scene, camera}); // at add3Dcontent
export const play3dContent = ({scene, camera, root}) => animation => {
  const meshMoving = () => {
    animation({scene, camera, root});
    requestAnimationFrame(meshMoving);
  };

  return () => {
    const animRef = requestAnimationFrame(meshMoving);
    return () => {cancelAnimationFrame(animRef)};
  };  
}

const turnContent = (geom, d=100, w=100, h=100, color=0xBBCCDD, opacity=.7) => ({scene}) => {
  // make 3d object
  
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

export const rotate = (mesh, ...xyz ) => {
  const [x = 0, y = 0, z = 0] = xyz;
  mesh.rotateX(x/RAD).rotateY(y/RAD).rotateZ(z/RAD)
};
