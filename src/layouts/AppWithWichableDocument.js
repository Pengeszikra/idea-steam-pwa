import React, {useState} from 'react';

import AppFrame from './AppFrame';
import GraphicFrame from './GraphicFrame';
import showtime from './showtime';
import IdeaIntro from '../story/IdeaIntro';

const loaderOver = content => {postApplicationReady(); return content; };
const rootRender = content => render(loaderOver(content), document.getElementById('root'));

const GraphicFrameShow = showtime(GraphicFrame);
const AppFrameShow = showtime(AppFrame);
const IdeaIntroShow = showtime(IdeaIntro);

export default () => {
  const [way, setWay] = useState(0);  
  return (
    <>
      <IdeaIntroShow show={way==0} setWay={setWay} />
      <GraphicFrameShow show={way===1} setWay={setWay} />
      <AppFrameShow show={way===2} setWay={setWay} />      
    </>
  );
}