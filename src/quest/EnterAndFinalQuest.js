import React, {useEffect} from 'react';
import { PipelineQuest, IntroButton, IntroButtonHolder } from '../styles/divStore';
import { cave_2_1_again } from './../engine/applicationData';

export default ({interaction, position}) => {
  const {questResultIs, checkSecret} = interaction;
  const isSecret = checkSecret(position);
    
  useEffect(
    ()=>{
      !isSecret && questResultIs(true);
      return () => {};
    }, []);

  const handleGoOut = () => {
    questResultIs(true);
  };
    
  return isSecret 
    ? (
        <PipelineQuest>
          <p>{cave_2_1_again.mission()}<br/><br/>{'Siess! Tedd le a lantot az adott helyen!'}</p>
          <IntroButtonHolder>
            <IntroButton onClick={handleGoOut}>Indulok</IntroButton>
          </IntroButtonHolder>          
        </PipelineQuest>
      ) 
    : null;
}