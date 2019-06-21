import React, {useState, useReducer} from 'react';

import AppFrame from '../_plan/PlanFrame';
import GraphicFrame from './IdeaFrame';
import showtime from '../utils/showtime';
import IdeaIntro from '../story/IdeaIntro';
import AvatarSelection from '../story/AvatarSelection';
import { storyReducer, storyInitial } from '../engine/reducers';

const loaderOver = content => {postApplicationReady(); return content; };
const rootRender = content => render(loaderOver(content), document.getElementById('root'));

const GraphicFrameShow = showtime(GraphicFrame);
const AppFrameShow = showtime(AppFrame);
const IdeaIntroShow = showtime(IdeaIntro);
const AvatarSelectionShow = showtime(AvatarSelection);

export default () => {
  const storyStore = useReducer(storyReducer, storyInitial);
  const [way, setWay] = useState(0);  
  return (
    <>      
      <IdeaIntroShow show={way==0} setWay={setWay} />
      <AvatarSelectionShow show={way==1} setWay={setWay} storyStore={storyStore} />
      <GraphicFrameShow show={way===2} setWay={setWay} storyStore={storyStore} />
      <AppFrameShow show={way===3} setWay={setWay} />
    </>
  );
}