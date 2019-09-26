import React, {useState} from 'react';
import { DarkGold, IntroButton, Version, IntroButtonHolder } from '../styles/divStore';
import DescriptionOfHistory from './DescriptionOfHistory';
import version from '../../version';

export default ({setWay}) => {
  const [hasHistory, setHistory] = useState(false);
  const toggleHistory = () => setHistory(view=>!view);
  return (
    <>
      <DarkGold show={!hasHistory}>
        <Version onClick={() => setWay(777)}>{version}</Version>
        <IntroButtonHolder>
          <IntroButton onClick={toggleHistory}>Történet</IntroButton>
          <IntroButton onClick={()=>setWay(1)}>A barlang</IntroButton>
          </IntroButtonHolder>        
      </DarkGold>
      
      <DescriptionOfHistory show={hasHistory} toggleHistory={toggleHistory} />
    </>
  );
}