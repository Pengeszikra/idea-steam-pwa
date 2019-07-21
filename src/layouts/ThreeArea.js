import React from 'react';
import {useRef, useEffect, useState, useCallback} from 'react';
import * as THREE from 'three';
import showtime from '../utils/showtime';
import { rotate } from './Geometries';

const clearScene = scene => scene.children.map(mesh => {
  scene.remove(mesh);
  const {geometry, material} = mesh;
  geometry && geometry.dispose();
  material && material.dispose();
  mesh = undefined;        
})

const ThreeArea = ({ 
  canvasOpacity = true, 
  add3DContent=()=>()=>()=>{}, 
  canvasClasses=['area-3d-canvas'], 
  clickHandler=()=>{},
  orthographic = false,
  ...props
}) => {  
  const mount = useRef(null);
  const [data, setData] = useState({});

  useEffect(()=>{
    const {clientWidth, clientHeight} = mount.current;
        
    const RAD = 180/Math.PI
    const FOW = 55
    const MAX_DISTANCE = 15000

    const scene = new THREE.Scene();        
    const camera = (!orthographic)  
      ? new THREE.PerspectiveCamera( FOW , clientWidth/clientHeight , 1, MAX_DISTANCE )
      : new THREE.OrthographicCamera( clientWidth / - 2, clientWidth / 2, clientHeight / 2, clientHeight / - 2, 1, MAX_DISTANCE );    
    camera.position.set( 0, 0, 500 )
    camera.updateProjectionMatrix()
    
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: mount.current, alpha:true } );
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(0,0);

    if (!canvasOpacity) {
      const backgroundColor = 0x7799AA;
      scene.fog = new THREE.FogExp2( backgroundColor , 0.00001 );
      renderer.setClearColor( backgroundColor );
      renderer.setClearAlpha( 1 );
      renderer.shadowMap.enabled = true;
    }

    const hemiLight = new THREE.HemisphereLight( 0xFFFFFF, 0xAAAAAA, 1 );
      hemiLight.color.setHSL( 0.6, 1 , 0.6 );
      hemiLight.color.setHex( 0x010101 );
      hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
      hemiLight.groundColor.setHex( 0xAAAAAA );
      hemiLight.position.set( 800, 500, 0 );

    const ambient = new THREE.AmbientLight( 0x999999 );

    scene.add(hemiLight);
    scene.add(ambient);
    scene.add(camera);

    // root of responsivity;
    const root = new THREE.Group();    
    const responsivity = .9;
    root.scale.setScalar(responsivity);
     scene.add(root);

    const animate3DContent = add3DContent({...props, scene, camera, root});
    const unsubscribeAnimate3D = animate3DContent();

    let hasPlay = true;
    const animate = () => {      
      renderer.render(scene, camera);      
      hasPlay && requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      hasPlay = false;
      unsubscribeAnimate3D();
      clearScene(scene); // TODO found better way
    };
  }, [mount]);

  return (
    <canvas 
      className={canvasClasses.join(" ")}
      ref={mount} 
      onContextMenu={event=>event.preventDefault()}
      onClick={clickHandler}
      {...props}
    />
  );
}

export default ThreeArea;
export const ThreeInteraction = showtime(ThreeArea);