import React, {useState, useReducer} from 'react';

import IdeaFrame from './IdeaFrame';
import showtime from '../utils/showtime';
import IdeaIntro from '../story/IdeaIntro';
import AvatarSelection from '../story/AvatarSelection';
import { storyReducer, storyInitial, debugReset } from '../engine/reducers';

const loaderOver = content => {postApplicationReady(); return content; };
const rootRender = content => render(loaderOver(content), document.getElementById('root'));

const IdeaFrameShow = showtime(IdeaFrame);
const IdeaIntroShow = showtime(IdeaIntro);
const AvatarSelectionShow = showtime(AvatarSelection);

export default () => {
  const storyStore = useReducer(storyReducer, storyInitial);
  const [{}, dispatch] = storyStore;
  const [way, setWay] = useState(0);  

  const handleReset = () => {
    dispatch(debugReset());
    setWay(0);
  };

  return (
    <>      
      <IdeaIntroShow show={way==0} setWay={setWay} />
      <AvatarSelectionShow show={way==1} setWay={setWay} storyStore={storyStore} />
      <IdeaFrameShow show={way===2} setWay={handleReset} storyStore={storyStore} />
    </>
  );
}