import React, {useState, useEffect, useReducer, useRef, useLayoutEffect} from 'react';
import ThreeArea from './ThreeArea';
import * as THREE from 'three';
import { useGesture } from 'react-use-gesture';
import { GameHolder, IntroButton, SimpleDarkBg } from '../styles/divStore';
import doesOverlap from './../utils/doesOverlap';

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

export const Drag3D = ({add3DContent, top=0, left=0, targets, setHold, ...props}) => {
  const [clearHold, setDrop] = setHold;
  const [local, setLocal] = useState([0,0]);
  const bind = useGesture({
    onDrag: dragState => setLocal(dragState.local),
    onDragStart: dragState => {clearHold()},
    onDragEnd: dragState => {
      const {currentTarget : shape} = dragState;      
      const overlaps = targets.filter(({current}) => doesOverlap(shape, current));
      targets.map(({current}) => current.style.filter='');
      if (overlaps.length === 1) {
        const [dropZone] = overlaps;
        dropZone.current.style.filter = 'brightness(1.4)';
        setDrop(dropZone);
      }
    },
  })

  const [xPos, yPos] = local;

  return (
    <ThreeArea 
      canvasClasses={['medium-3d']} add3DContent={add3DContent}
      {...bind()}      
      style={{transform: `translate3d(${xPos}px, ${yPos}px, 0)`, top: `${top}vmin`, left: `${left}vmin`}}
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

const  GeomTarget = ({fref, children, ...props}) => <div className="drop-target" ref={fref} {...props}>{children}</div>;


export const Minigame = ({interaction:{questResultIs}}) => {
  const [attached, setAttached] = useState(["", "", "", ""]);
  const [solution, setSolution] = useState("Megoldás");
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const t4 = useRef(null);

  // useEffect(()=>console.log(t1, t2, t3, t4), []);
  
  const targets = [t1, t2, t3, t4];
  const [h1, h2, h3, h4] = attached;

  const holdFactory = (shape) => [
      () => {
        const hold = [...attached];
        setAttached(hold.map(e => e == shape ? null : e));  
      } 
      ,
      (dropZone) => {
        const hold = [...attached];
        const index = targets.indexOf(dropZone);
        if (index > -1) {
          hold.map(prev => prev === shape ? null : prev );
          hold[index] = shape;
          setAttached(hold);
        }
      } 
    ]
    
  return (    
    <SimpleDarkBg>
      <div style={{marginTop:"40vmin"}}>{attached.join(" - ")}</div>
      <GameHolder>
          
        <GeomTarget fref={t1}><p>Csúcsok száma: 3</p><p>Van derékszöge</p><p>{h1}</p></GeomTarget>  
        <GeomTarget fref={t2}><p>Csúcsok száma: 4</p><p>Van derékszöge</p><p>{h2}</p></GeomTarget>
        <GeomTarget fref={t3}><p>Csúcsok száma: 3</p><p>Nincs derékszöge</p><p>{h3}</p></GeomTarget>
        <GeomTarget fref={t4}><p>Csúcsok száma: 4</p><p>Nincs derékszöge</p><p>{h4}</p></GeomTarget>
        <IntroButton onClick={() => {
          const isSolved = attached.join("-") === "alfa-beta--";
          setTimeout(()=>questResultIs(isSolved),1000);
          setSolution( isSolved ? "Jó!" : "Rossz!" );
        }}>{solution}</IntroButton>
        
      </GameHolder>
      <Drag3D add3DContent={showContent(GEOMS.box, 250, 250, 250)} top={15} left={0} targets={targets} setHold={holdFactory("alfa")} />
      <Drag3D add3DContent={showContent(GEOMS.dedocahedron, 200)} top={15} left={25} targets={targets} setHold={holdFactory("beta")} />
      <Drag3D add3DContent={showContent(GEOMS.icosahedron, 200)} top={15} left={50} targets={targets} setHold={holdFactory("gamma")} />
      <Drag3D add3DContent={showContent(GEOMS.box, 5, 250, 250)} top={15} left={75} targets={targets} setHold={holdFactory("delta")} />
    </SimpleDarkBg>          
  );
}