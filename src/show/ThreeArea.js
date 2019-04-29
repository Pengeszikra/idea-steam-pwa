import React from 'react';
import {useRef, useLayoutEffect, useEffect, useState, useCallback} from 'react';
import * as THREE from 'three';

export default function (props) {
  const {canvasOpacity = true, add3DContent=()=>()=>()=>{}, canvasClasses=[]} = props;
  const mount = useRef(null);
  const [data, setData] = useState({});

  useLayoutEffect(()=>{setData({isMounted:true})}, [mount]);

  function makeBox( w , h , d , color, opacity = .7 ) {
    const geom = new THREE.BoxGeometry( w , h , d, 1, 1, 1 );    
      geom.translate( 0 , 0 , d/2 );
    const flatShading = THREE.FlatShading;
    const transparent = true; //opacity < 1;
    // const mat = new THREE.MeshBasicMaterial( {color, flatShading, opacity , transparent, wireframe: true } );
    const mat = new THREE.MeshLambertMaterial( {color, flatShading, opacity , transparent } );
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

    /*
    const box = makeBox(72, 172, 172, 0xBBCCDD );
    box.rotateZ(12 / RAD);
    box.rotateX(32 / RAD);    
    scene.add(box);
    */

    const animate3DContent = add3DContent({...props, scene, camera});
    const unsubscribeAnimate3D = animate3DContent();

    let hasPlay = true;
    const animate = () => {      
      renderer.render(scene, camera);      
      hasPlay && requestAnimationFrame(animate);
    };

    // const boxMoving = setInterval( _ => box.rotateY( 2/RAD ) , 20 );

    animate();
    
    return () => {
      hasPlay = false;
      unsubscribeAnimate3D();
      // clearInterval(boxMoving);
    };
  }, []);

  /*
  const canvasStyle = {
    position:'absolute', 
    background:'transparent', 
    width:'40vw', 
    height:'40vh', 
    top:'10vh', 
    left:0,
  };
  */

  return (
    <canvas 
      className={["nosel", ...canvasClasses].join(" ")}
      ref={mount} 
      // style={canvasStyle}
      onContextMenu={event=>event.preventDefault()}
    />
  );
}