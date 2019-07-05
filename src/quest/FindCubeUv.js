import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, CubeUv, CubeUvArea, IntroButtonHolder, IntroButton } from '../styles/divStore';
import nets from './netsOfCube';

const WIDTH = 5;
const HEIGHT = 7;
const uvId = (u, v) => `${u}${v}`;

const randomCubUvMatrix = (x, y) => {
  return Array( x * y ).fill(0).map( (_, i) => {
    const u = i % x;
    const v = i / x | 0;
    return ({
      side : Math.random() * 6 | 0, 
      dir  : "NESW"[Math.random() * 4 | 0],
      u, v,
      key: uvId(u, v)
    });
  });
};

const getRandomNet = (index = Math.random() * nets.length | 0) => nets[index];

const placeCubeShape = (net, position=[1,2], setMatrix) => {
  const [x,y] = position;
  const netMatrix = net.split(/\n/).filter(hor => hor.length).map(hor => hor.split(':'));
  
  setMatrix( mtx => {
    netMatrix.map((hor, iy) => hor.map((uv, ix) => {
        const [u,v] = [x + ix, y + iy];
        const pos = u + v * WIDTH;
        let [side, dir] = uv.split('');
        dir.replace('Y','N').replace('J','S');        
        if (side !== '-' && mtx[pos]) {
          mtx[pos] = {...(mtx[pos]), side, dir, fine:true};
        }        
      })      
    );
    return mtx;    
  });
}

const CubeUvFragment = (selections, handleSelect, hasWin) => ({side, dir, key}) => {
  const selectedStyle = selections[key] ? hasWin ?  {filter: 'brightness(4) sepia(1)'} : {filter: 'brightness(2)'} : {}; // {border: '3px solid gold'}
  return (
    <CubeUv  key={key} data-uv={side} data-dir={dir} style={selectedStyle} onClick={handleSelect(key)}/>
  );
};


export default ({interaction:{questResultIs}}) => {
  const [matrix, setMatrix] = useState([]);
  const [selections, setSelections] = useState({});
  const [hasWin, setWin] = useState(false);

  const resetMatrix = () => {
    randomCubUvMatrix(WIDTH, HEIGHT) |> setMatrix;
    setSelections({})
    const rnet = getRandomNet();
    placeCubeShape(rnet, [Math.random() * 3 | 0, Math.random() * 3 | 0], setMatrix);      
  };  

  useEffect(resetMatrix, []);

  useEffect(() => {
    let selectedKeys = Object.keys(selections).filter(key => selections[key]);
    let matrixLookUp = matrix
      .filter(e => selectedKeys.indexOf(e.key) !== -1)
      .reduce((r, e) => ({...r, [e.key]: e}) , {});

    const found = selectedKeys.filter(key => matrixLookUp[key].fine);
    const isWin = found.length === 6 && selectedKeys.length === 6
    setWin(isWin);
    if (isWin) {
      setTimeout(() => questResultIs(isWin) , 2000);
    }    

  }, [selections]);

  const handleSelect = key => event => setSelections(prev => {prev[key] = !(prev[key]); return {...prev}});
  const handleSolutionIsValid = event => {
    const selectedUvs = matrix.filter(({key}) => selections[key]);
    const [first, second] = selectedUvs;

    if (selectedUvs.length === 1) { 
      first.dir = {N:'E',E:'S',S:'W',W:'N'}[first.dir];
      setMatrix(mtx => mtx.map(uv => uv.key === first.key ? first : uv) );
    }

    if (selectedUvs.length === 2) { 
      setMatrix(mtx => mtx.map(
        uv => uv.key === first.key 
          ? ({...uv, side:second.side}) 
          : uv.key === second.key 
            ? ({...uv, side:first.side})
            : uv
        ) 
      );
    }
  }
  
  return (
    <QuestSketch style={{overflow:'hidden'}} >
      <IntroHeader>Meg kell találni a kocka kiterített lapjait.</IntroHeader>
      <CubeUvArea >
        {matrix.map(CubeUvFragment(selections, handleSelect, hasWin))}
      </CubeUvArea>
      <IntroButtonHolder>
        <IntroButton onClick={handleSolutionIsValid}>Ellenőrzés</IntroButton>
        <IntroButton onClick={resetMatrix}>Reset</IntroButton>        
      </IntroButtonHolder>
    </QuestSketch>
  );
};