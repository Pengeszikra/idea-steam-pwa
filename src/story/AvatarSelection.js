import React, {useState, useEffect} from 'react';
import { IntroButton, SimpleDarkBg, Adeimantosz, Glaukon, IntroHeader, IntroButtonHolder, GreekCity, QuestSketch, BayPort, IntroButtonBar } from '../styles/divStore';
import { avatarNames, whoIsTheHero, avatarDescripts } from '../engine/applicationData';
import { selectLevel } from '../engine/reducers';
import SocratesSpeaking from '../layouts/SocratesSpeaking';

export default ({setWay, storyStore}) => {
  const [glaukonHide, glaukonGoingToShadow] = useState(false);
  const [adeimantoszHide, adeimantoszGoingToShadow] = useState(false);
  const [phase, setPhase] = useState(-1);

  const [{}, dispatch] = storyStore;

  const handleLevelSelection = level => () => {
    setWay(2);
    dispatch(selectLevel(level))
  };

  const handleSpeakWhoAmI = level => () => {
    if ( level === 1 && adeimantoszHide || level === 2 && glaukonHide ) {
      setWay(2);
      dispatch(selectLevel(level));  
    }
    adeimantoszGoingToShadow(level === 1);
    glaukonGoingToShadow(level === 2);
  };

  useEffect(() => {
    setTimeout(() => setPhase(0), 1000 );
    return () => {};
  }, []);

return (
    <BayPort>
      <SocratesSpeaking 
        show={phase === 0}
        speakAbout={whoIsTheHero}  
        handleStopSpeak={() => setPhase(1)}
      />
      <IntroButtonBar show={phase === 1}>
        <IntroButton onClick={handleSpeakWhoAmI(1)}>
          <Glaukon data-hidden={glaukonHide} data-speak={adeimantoszHide}><span>{avatarDescripts[0]}</span></Glaukon>
          {avatarNames(1)}
        </IntroButton>
        <IntroButton onClick={handleSpeakWhoAmI(2)}>
          <Adeimantosz data-hidden={adeimantoszHide} data-speak={glaukonHide}><span>{avatarDescripts[1]}</span></Adeimantosz>
          {avatarNames(2)}
        </IntroButton>
      </IntroButtonBar>
    </BayPort>
  );
}