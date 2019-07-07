import React from 'react';
import {useRef, useEffect, useState, useCallback} from 'react';
import * as THREE from 'three';

export default function (props) {
  const { 
    canvasOpacity = true, 
    add3DContent=()=>()=>()=>{}, 
    canvasClasses=['area-3d-canvas'], 
    clickHandle=()=>{},
    ...restProps
  } = props;
  const mount = useRef(null);
  const [data, setData] = useState({});

  useEffect(()=>{
    const {clientWidth, clientHeight} = mount.current;
        
    const RAD = 180/Math.PI
    const FOW = 55
    const MAX_DISTANCE = 15000

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( FOW , clientWidth/clientHeight , 1, MAX_DISTANCE );
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

    const animate3DContent = add3DContent({...props, scene, camera});
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
    };
  }, [mount]);

  return (
    <canvas 
      className={canvasClasses.join(" ")}
      ref={mount} 
      onContextMenu={event=>event.preventDefault()}
      onClick={clickHandle}
      {...restProps}
    />
  );
}