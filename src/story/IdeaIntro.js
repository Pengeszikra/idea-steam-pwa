import React, {useState} from 'react';
import { DarkGold, IntroButton, Version, IntroButtonHolder } from '../styles/divStore';
import DescriptionOfHistory from './DescriptionOfHistory';
import version from '../../version';

export default ({setWay}) => {
  const [hasHistory, setHistory] = useState(false);
  return (
    <DarkGold>
      <Version>{version}</Version>
      <IntroButtonHolder>
        <IntroButton onClick={()=>setHistory(!hasHistory)}>Történet</IntroButton>
        <IntroButton onClick={()=>setWay(1)}>A barlang</IntroButton>
        </IntroButtonHolder>
      <DescriptionOfHistory show={hasHistory} />
    </DarkGold>
  );
}