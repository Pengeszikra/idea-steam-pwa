import GLTFLoader from 'three-gltf-loader';
import { rnd } from '../utils/randoms';

const loader = new GLTFLoader();

let meshes = []; 
export const getMeshes = () => meshes;

loader.load('/solids/idomok.glb', gltf => {
  const {scene:{children = []} = {}} = gltf;    
  meshes = children.filter(({type})=> type ==="Mesh");      
});

let minimal = [];
export const getMinimal = () => minimal;

loader.load('/solids/minimal.glb', gltf => {
  const {scene:{children = []} = {}} = gltf;
  minimal = children.filter(({type})=> type ==="Mesh");
});