import React, {useEffect} from 'react';
import { Adeimantosz, Glaukon, Island, RouteArrow } from '../styles/divStore';
import { useSpring, animated} from 'react-spring';
import { entrance } from '../engine/applicationData';

export default ({level, talkSocrates, interaction, children}) => {
  const {handleRoute} = interaction;

  const anim = useSpring({from: { opacity: 0,}, opacity: 1, });

  useEffect(()=>{
    setTimeout(() => talkSocrates(entrance.intro), 500);
  }, []);

  return (
    <Island>
      {children}
      <animated.div style={anim}>
        { level === 1 && <Glaukon style={{left:'-4vmin', bottom: '4vmin'}}/>}
        { level === 2 && <Adeimantosz style={{left:'48vmin', bottom: '4vmin', transform:'scaleX(-1)'}}/> }
      </animated.div>
      <RouteArrow data-path="Q-Y" onClick={handleRoute('Q-Y')} />
    </Island>
  );
}