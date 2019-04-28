import React, {useState} from 'react';
import {render} from 'react-dom';
import ThreeDimensionTest from './show/ThreeDimensionTest';
import './styles/global.scss';
import Cave from './caves/Cave';
import AppFrame from './layouts/AppFrame';
import GraphicFrame from './layouts/GraphicFrame';
import AnimeTest from './show/AnimeTest';
import showtime from './layouts/showtime';
const rootRender = content => render(content, document.getElementById('root'));


const GraphicFrameShow = showtime(GraphicFrame);
const AppFrameShow = showtime(AppFrame);


const Selector = () => {
  const [way, setWay] = useState(1);
  return (
    <>
      <GraphicFrameShow show={way===1} setWay={setWay} />
      <AppFrameShow show={way===2} setWay={setWay} />
    </>
  );
}


rootRender(<Selector/>);