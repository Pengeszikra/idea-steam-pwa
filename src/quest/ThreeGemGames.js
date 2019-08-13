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

  matrixRoot.translateX(-200).translateY(-270); 
  root.add(matrixRoot);

  let clicked = null

  const isNext = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1

  const createGem = (x, y, shape) => {
    const mesh = makeShape(shape, 1,1,1, 0xAA5522, 1 , 0xFFAA77);
    mesh.scale.multiplyScalar(20);
    mesh.translateX(x * 80).translateY(y * 80);
    rotate(mesh,...([90,0,45].sort(shuffle)));
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

  const getVerts = () => R.groupWith(
    ({userData:{x:ax}}, {userData:{x:bx}}) => ax == bx
    , matrixRoot.children.sort( ({userData:{x:ax, y:ay}}, {userData:{x:bx, y:by}}) => `${ax}:${('00'+ay).slice(-2)}` < `${bx}:${('00'+by).slice(-2)}` ? -1 : 1 )
  );

  const foundGems = () => {
    const logUserData = ({userData}) => console.log(userData);
    const logUserDataWithPosition = ({userData, position}) => console.log(userData, position);
    const atLeastThree = ({length}) => length > 2;
    // check columns
    //  this shorts works only x,y 0->9!
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
    const scoreOfGems = R.sum(founds.map( ({userData:{hs = 0, vs = 0}}) => hs + vs ));
    console.log( 'score:', scoreOfGems );
    if (!founds.length) return console.log('--- dont found any matching ---');
  
    const clearFounds = () => founds.map(m => matrixRoot.remove(m));
    
    const refill = () => {
      const filled = getVerts();
      //filled.map(group => {group.map(logUserDataWithPosition); console.log('-'.repeat(11))});
      //console.log('---- create extras ------')

      filled.map(group => {
        const extra = group.filter( ({userData:{hs, vs}}) => hs || vs );
        const [first] = group;
        const {x} = first.userData;
        Array.from({length:extra.length}, (_, i) => {          
          const y = height + i;          
          const gem = createGem(x, y, getRandomShape());
          matrixRoot.add(gem); 
        });
      });

      const extras = getVerts();
      //extras.map(group => {group.map(logUserDataWithPosition); console.log('-'.repeat(11))});

      clearFounds();

      // down animation
      extras.map(group => group
        .filter( ({userData:{hs, vs}}) => !(hs || vs) )
        .map( (gem, i) => {
          // console.log(gem.userData.y, i)
          gem.userData.y = i;
          const targetY = i * 80;
          const dist = gem.position.y - targetY;
          const y = gem.position.y;
          distancedMove(ym => gem.position.y = y - ym, 250 , dist );
        })
      );
    }
    
    // setTimeout( clearFounds, 200);
    setTimeout( refill, 400);
    setTimeout( foundGems, 800);
  }

  pipe (
    clickSource(camera, matrixRoot.children),    
    filter(object => !object.selected),
    forEach(handleClick)
  )
  
  const animation = studio => {
    const {root, camera} = studio;

    // if (clicked) { clicked.rotateX(3/RAD); }
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