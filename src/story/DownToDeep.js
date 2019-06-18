import React, {useEffect} from 'react';
import { Adeimantosz, Glaukon, Island } from '../styles/divStore';
import { useSpring, animated} from 'react-spring';
import { entrance } from './applicationData';

export default ({level, talkSocrates, children}) => {

  const anim = useSpring({
    from: {
      opacity: 0,
    },
    opacity: 1, 
  });

  useEffect(()=>{
    setTimeout(() => talkSocrates(entrance.intro), 1000);
  }, []);

  return (
    <Island>
      {children}
      <animated.div style={anim}>
        { level === 1 && <Glaukon style={{left:'-4vmin', bottom: '4vmin'}}/>}
        { level === 2 && <Adeimantosz style={{left:'48vmin', bottom: '4vmin', transform:'scaleX(-1)'}}/> }
      </animated.div>      
    </Island>
  );
}