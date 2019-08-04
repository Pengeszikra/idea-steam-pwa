import { getMeshes } from "../blenderObjects";
import { GEOMS } from "../../layouts/Geometries";

export const blenderCompatiblePerfectShapes = (geom, uuid , scale) => () => {
  const perfect = geom(scale,scale,scale);
  perfect.uuid = uuid;
  return perfect;
};

export default (scale) => {
  const shapes = getMeshes().map(({geometry}) => (() => geometry));
   
  shapes.push(
    blenderCompatiblePerfectShapes(GEOMS.box, 'uuid-box', scale),
    blenderCompatiblePerfectShapes(GEOMS.dedocahedron, 'uuid-dedocahedron', scale),
    blenderCompatiblePerfectShapes(GEOMS.octahedron, 'uuid-octahedron', scale),
    blenderCompatiblePerfectShapes(GEOMS.tetrahedron, 'uuid-tetrahedron', scale),
    blenderCompatiblePerfectShapes(GEOMS.icosahedron, 'uuid-icosahedron', scale),
  );

  return shapes;
};