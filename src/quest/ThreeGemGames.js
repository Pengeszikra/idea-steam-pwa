import React from 'react';
import * as THREE from 'three';
import { QuestSketch } from '../styles/divStore';
import { makeShape, RAD, play3dContent, makeFlatColorShape, rotate, addWireframe } from '../layouts/Geometries';
import { irnd, shuffle } from '../utils/randoms';
import {ThreeInteraction} from '../layouts/ThreeArea';
import MultiRoundGameFrame from './multiRoundGameFrame';
import blenderPlusPerfectSet from './data/blenderPlusPerfectSet';

import { pipe, forEach, interval, take } from 'callbag-basics';
import { mousePosition, clickSource, filter, distancedMove, moveAndDone } from './callbagUtils';
import * as R from 'ramda';

const flatten = (r, e) =>  e.length ? [...r, ...e] : [...r, e];
const lastOf = arr => (arr || []).slice(-1)[0];

const selectMaterial = new THREE.MeshLambertMaterial( {color: 0x130802, flatShading:THREE.FlatShading, opacity:1 } );

const solidProjection3dContent = ({playOver, gainScore, setChecking}) => studio => {
  const {root, camera} = studio;

  const shapes = blenderPlusPerfectSet(1.5);
  const width  = 6;
  const height = 8;
  const numberOfTypes = 4;

  const getRandomShape = () => shapes[irnd(numberOfTypes)];
  const render = root => item => root.add(item);

  const matrixRoot = new THREE.Group();
 
  root.add(matrixRoot);

  let clicked = null

  const isNext = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1

  const createGem = (x, y, shape) => {
    const mesh = makeShape(shape, 1,1,1, 0xAA5522, 1 , 0xFFAA77);
    mesh.scale.multiplyScalar(20);
    mesh.translateX(x * 80 - 200).translateY(y * 80 - 270);
    rotate(mesh,...([45,0,45].sort(shuffle)));
    mesh.userData = {x, y, uuid : mesh.geometry.uuid };
    return mesh;
  };

  Array
    .from({length: width * height}, getRandomShape)
    .map((shape, i) => {
      const x = i % width;
      const y = i / width | 0;
      return createGem(x, y, shape);    
    })
    .map(render(matrixRoot));

  // too much happen there !! 
  const handleClick = target => {
    const {x,y} = target.userData;
    //console.log(`${x}:${y}`)
    if (clicked && clicked !== target) {
      const {x:x1, y:y1} = target.userData;
      const {x:x2, y:y2} = clicked.userData;
      const tud = target.userData;
      const cud = clicked.userData;
      //console.log(`${x1}:${y1} -- ${x2}:${y2}`)

      // change element
      if (isNext(x1,y1, x2,y2)) {
        const tpos = target.position.clone();
        const cpos = clicked.position.clone();
        target.position.x = cpos.x;
        target.position.y = cpos.y;
        clicked.position.x = tpos.x;
        clicked.position.y = tpos.y;
        target.userData = {...cud};
        clicked.userData = {...tud};

        return clicked = false;
      }
    }
    
    clicked = target;

    foundGems();
  };

  const foundGems = () => {
    const logUserData = ({userData}) => console.log(userData);
    const atLeastThree = ({length}) => length > 2;
    // check columns
    const verticals = matrixRoot.children.sort(({userData:{uuid:a, x:ax, y:ay}}, {userData:{uuid:b, x:bx, y:by}}) => `${a}:${ax}:${ay}` < `${b}:${bx}:${by}` ? -1 : 1 );
    const vertGroups = R.filter( atLeastThree , R.groupWith( ({userData:{x:ax, y:ay}}, {userData:{x:bx, y:by}}) => ax == bx && ay == by - 1, verticals) );
    vertGroups.map(group => group.map(e => e.userData.vs = group.length));
    //vertGroups.map(group => group.map(logUserData));
    // console.log('-----------------');
    const horizontals = matrixRoot.children.sort(({userData:{uuid:a, x:ax, y:ay}}, {userData:{uuid:b, x:bx, y:by}}) => `${a}:${ay}:${ax}` < `${b}:${by}:${bx}` ? -1 : 1 );
    const horGroups = R.filter( atLeastThree , R.groupWith( ({userData:{x:ax, y:ay}}, {userData:{x:bx, y:by}}) => ay == by && ax == bx - 1, horizontals) );
    horGroups.map(group => group.map(e => e.userData.hs = group.length));
    //horGroups.map(group => group.map(logUserData));

    const founds = R.flatten([vertGroups, horGroups])
    founds.map(mesh => mesh.material = selectMaterial);
    // founds.map(logUserData);
    console.log( 'score:',  R.sum(founds.map( ({userData:{hs = 0, vs = 0}}) => hs + vs )) );

    const clearFounds = () => founds.map(m => matrixRoot.remove(m));
    const refill = () => {
      const getVerts = () => R.groupWith(
        ({userData:{x:ax}}, {userData:{x:bx}}) => ax == bx
        , matrixRoot.children.sort( ({userData:{x:ax, y:ay}}, {userData:{x:bx, y:by}}) => `${ax}:${ay}` < `${bx}:${by}` ? -1 : 1 )
      );

      const verts = getVerts();
      // verts.map(group => {group.map(logUserData); console.log('-'.repeat(11))});

      verts.map(group => {
        const extra = height - group.length;
        Array.from({length:extra}, (_, i) => {
          const [first] = group;          
          const {x} = first.userData;
          const y = height + i;
          // console.log(`${x}::${y}`);
          const gem = createGem(x, y, getRandomShape());
          matrixRoot.add(gem);          
        });
      });

      const filled = getVerts();
      // filled.map(group => {group.map(logUserData); console.log('-'.repeat(11))});

      filled.map(group => group
        .map( (gem, i) => {
          gem.userData.y = i;
          const targetY = i * 80 - 270;
          const dist = gem.position.y - targetY;
          const y = gem.position.y;
          distancedMove(ym => gem.position.y = y - ym, 250 + ( i * 10 ) , dist );
        })
      );
    }
    
    setTimeout( clearFounds, 200);
    setTimeout( refill, 400);
  }

  pipe (
    clickSource(camera, matrixRoot.children),    
    filter(object => !object.selected),
    forEach(handleClick)
  )
  
  const animation = studio => {
    const {root, camera} = studio;

    if (clicked) {
      clicked.rotateX(3/RAD);
    }
  }
  
  return play3dContent(studio)(animation);
}

const Game = ({show, playOver, gainScore, setChecking}) => (
  <ThreeInteraction 
    show={show} 
    add3DContent={solidProjection3dContent({playOver, gainScore, setChecking})} 
    orthographic
  />
);
const GameWithBackground = MultiRoundGameFrame(Game, QuestSketch);
export default props => <GameWithBackground {...props} />;