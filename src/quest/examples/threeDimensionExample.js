import * as THREE from 'three';
import { rnd, irnd } from '../../utils/randoms';
import { makeShape, GEOMS, RAD } from '../../layouts/Geometries';

export const animationFlyRandomSolid = ({scene, camera}) => {
  camera.translateZ(-50);
  if (Math.random() > .9) {
    const opacity = 1;
    const colors = [irnd(0xFFFFFF), opacity, irnd(0xFFFFFF)];
    const shape = [GEOMS.box, GEOMS.dedocahedron, GEOMS.icosahedron, GEOMS.octahedron, GEOMS.plane, GEOMS.tetrahedron];
    const solid = makeShape(shape[irnd(shape.length)], 100, 100, 10 + irnd(100), ...colors);
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    solid.position.copy(camera.position.clone().add(dir));
    solid.translateX(rnd(500) - 250);
    solid.translateY(rnd(500) - 250);
    solid.position.addScaledVector(dir, 8000);
    scene.add(solid);
  }        
};

export const animationFoundProjection = ({scene, camera}) => {
  
}