import GLTFLoader from 'three-gltf-loader';
import { rnd } from '../utils/randoms';

let meshes = [];
export const getMeshes = () => meshes;

const loader = new GLTFLoader();

loader.load('/solids/idomok.glb', gltf => {
  const {scene:{children = []} = {}} = gltf;    
  meshes = children.filter(({type})=> type ==="Mesh");      
  meshes.forEach(mesh => mesh.type = rnd(1000));
});