import React, {useState, useReducer} from 'react';

import AppFrame from '../_plan/PlanFrame';
import GraphicFrame from './IdeaFrame';
import showtime from '../utils/showtime';
import IdeaIntro from '../story/IdeaIntro';
import AvatarSelection from '../story/AvatarSelection';
import { scoreInitial, scoreReducer } from '../_plan/action';

const loaderOver = content => {postApplicationReady(); return content; };
const rootRender = content => render(loaderOver(content), document.getElementById('root'));

const GraphicFrameShow = showtime(GraphicFrame);
const AppFrameShow = showtime(AppFrame);
const IdeaIntroShow = showtime(IdeaIntro);
const AvatarSelectionShow = showtime(AvatarSelection);

export default () => {
  const scoreStore = useReducer(scoreReducer, scoreInitial);  
  const [way, setWay] = useState(0);  
  return (
    <>      
      <IdeaIntroShow show={way==0} setWay={setWay} />
      <AvatarSelectionShow show={way==1} setWay={setWay} scoreStore={scoreStore} />
      <GraphicFrameShow show={way===2} setWay={setWay} scoreStore={scoreStore} />
      <AppFrameShow show={way===3} setWay={setWay} />
    </>
  );
}