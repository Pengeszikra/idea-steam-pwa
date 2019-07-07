export default function doesOverlap(shape, zone) {
  const [shapeRect] = shape.getClientRects();
  const [zoneRect] = zone.getClientRects();
  const {x, y, width, height} = shapeRect;
  const {x:tx, y:ty, width:tw, height:th} = zoneRect;
  return (
    !( tx + tw < x || tx > x + width )
                   &&
    !( ty + th < y || ty > y + height )
  );  
}