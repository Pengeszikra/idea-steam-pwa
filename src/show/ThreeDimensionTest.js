import React from 'react';
import {useRef, useLayoutEffect, useEffect, useState, useCallback} from 'react';
import * as THREE from 'three';

export default function ({canvasOpacity = true}) {
  const mount = useRef(null);
  const [data, setData] = useState({});

  useLayoutEffect(()=>{setData({isMounted:true})}, [mount]);

  function makeBox( w , h , d , color, opacity = 1 ) {
    const geom = new THREE.BoxGeometry( w , h , d, 1, 1, 1 );
      geom.translate( 0 , 0 , d/2 );
    const flatShading = THREE.FlatShading;
    const transparent = opacity < 1;
    const mat = new THREE.MeshPhongMaterial( {color, flatShading, opacity , transparent } );
    return new THREE.Mesh( geom, mat );
  }

  useEffect(()=>{
    const {clientWidth, clientHeight} = mount.current;
    console.log(clientWidth, clientHeight); // TODO
    
    const RAD = 180/Math.PI
    const FOW = 55
    const MAX_DISTANCE = 15000

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( FOW , clientWidth/clientHeight , 1, MAX_DISTANCE );
      camera.position.set( 0, 0, 500 )
      camera.updateProjectionMatrix()
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: mount.current, alpha:true } );
      renderer.setSize(clientWidth, clientHeight);

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

    const box = makeBox(172, 172, 172, 0xBBCCDD );
    box.rotateZ(12 / RAD);
    box.rotateX(32 / RAD);    
    scene.add(box);

    let hasPlay = true;
    const animate = () => {      
      renderer.render(scene, camera);      
      hasPlay && requestAnimationFrame(animate);
    };

    const boxMoving = setInterval( _ => box.rotateY( 3/RAD ) , 22 );

    animate();
    
    return () => {
      hasPlay = false;
      clearInterval(boxMoving);
    };
  }, []);


  return (
    <div>
      <canvas 
        class="nosel"
        ref={mount} 
        style={{position:'absolute', background:'#333', width:'100vw', height:'100vh'}}
        onContextMenu={event=>event.preventDefault()}
      />
    </div>    
  );
}