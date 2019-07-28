// https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

const onSegment = (p, q, r) => 
  q.x <= Math.max(p.x, r.x) 
	  && q.x >= Math.min(p.x, r.x) 
	  && q.y <= Math.max(p.y, r.y) 
    && q.y >= Math.min(p.y, r.y)
  ;

const orientation = (p, q, r) => { 
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y); 
  if (val == 0) return 0;
  return val > 0 ? 1 : 2;
}

export const doIntersect = (p1, q1, p2, q2) => {   
  const o1 = orientation(p1, q1, p2); 
  const o2 = orientation(p1, q1, q2); 
  const o3 = orientation(p2, q2, p1); 
  const o4 = orientation(p2, q2, q1); 

  if (o1 != o2 && o3 != o4) return true; 
  if (o1 == 0 && onSegment(p1, p2, q1)) return true; 
  if (o2 == 0 && onSegment(p1, q2, q1)) return true; 
  if (o3 == 0 && onSegment(p2, p1, q2)) return true; 
  if (o4 == 0 && onSegment(p2, q1, q2)) return true; 
  return false;
};

export const testdata = [
  [74.109, 51.568, "A"],
  [82.963, 64.089, "B"],
  [46.415, 64.089, "C"],
  [60.741, 84.348, "D"],
  [38.154, 84.348, "E"],
  [84.273, 41.004, "F"],
  [62.861, 46.995, "G"],
  [48.318, 73.783, "H"],
  [41.584, 23.91, "I"],
  [13.89, 36.431, "J"],
  [18.052, 67.254, "K"],
  [5.0366, 23.91, "L"],
  [3.7266, 46.995, "M"],
  [11.77, 73.783, "N"],
  [27.258, 3.6516, "O"],
  [39.681, 14.216, "P"],
  [25.138, 41.004, "Q"],
  [69.947, 20.745, "R"],
  [49.845, 3.6516, "S"],
  [76.229, 14.216, "T"],
];