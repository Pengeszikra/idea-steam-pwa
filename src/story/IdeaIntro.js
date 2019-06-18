import React, {useState} from 'react';
import { DarkGold, IntroButton } from '../styles/divStore';
import DescriptionOfHistory from './DescriptionOfHistory';

export default ({setWay}) => {
  const [hasHistory, setHistory] = useState(false);
  return (
    <DarkGold>
      <div className='intro-button-holder'>
        <IntroButton onClick={()=>setHistory(!hasHistory)}>Történet</IntroButton>
        <IntroButton onClick={()=>setWay(1)}>A barlang</IntroButton>
      </div>
      <DescriptionOfHistory show={hasHistory} />
    </DarkGold>
  );
}