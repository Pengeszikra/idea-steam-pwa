import React, {useState, useEffect} from 'react';
import { QuestSketch, IntroHeader, CubeUv, CubeUvArea, IntroButtonHolder, IntroButton } from '../styles/divStore';

const uvId = (u, v) => `${u}:${v}`;

const randomCubUvMatrix = (x, y) => {
  return Array( x * y ).fill(0).map( (_, i) => {
    const u = i % x;
    const v = i / x | 0;
    return ({
      side : Math.random() * 5 | 0, 
      dir  : "NESW"[Math.random() * 4 | 0],
      u, v,
      key: uvId(u, v)
    });
  });
};

const CubeUvFragment = (selections, handleSelect) => ({side, dir, key}) => {
  const selectedStyle = selections[key] ? {border: '3px solid gold'} : {};
  return (
    <CubeUv  key={key} data-uv={side} data-dir={dir} style={selectedStyle} onClick={handleSelect(key)}/>
  );
};


export default ({}) => {
  const [matrix, setMatrix] = useState([]);
  const [selections, setSelections] = useState({});
    
  useEffect(() => {
    randomCubUvMatrix(5, 7) |> setMatrix;
  }, []);

  const handleSelect = key => event => setSelections({...selections, [key]:!selections[key]});
  const handleSolutionIsValid = event => matrix.filter(({key}) => selections[key]).map(uv => console.log(uv));
  
  return (
    <QuestSketch style={{overflow:'hidden'}} >
      <IntroHeader>Meg kell találni a kocka kiterített lapjait.</IntroHeader>
      <CubeUvArea >
        {matrix.map(CubeUvFragment(selections, handleSelect))}
      </CubeUvArea>
      <IntroButtonHolder>
        <IntroButton onClick={handleSolutionIsValid}>Ellenőrzés</IntroButton>
        <IntroButton onClick={e => {
          randomCubUvMatrix(5, 7) |> setMatrix;
          setSelections({})
        }}>Reset</IntroButton>        
      </IntroButtonHolder>
    </QuestSketch>
  );
};

// {Array(5 * 7).fill(0).map((cube, key) => <CubeUv key={key} data-uv={key%5} data-dir={"NESW"[key % 4]}/>)}
// data-key={`${u}:${v}`}