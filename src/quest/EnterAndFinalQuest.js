import React, {useEffect} from 'react';
import { PipelineQuest } from '../styles/divStore';
import { cave_2_1_again } from './../engine/applicationData';

export default ({interaction, position}) => {
  const {questResultIs, checkSecret} = interaction;
  const isSecret = checkSecret(position);
    
  useEffect(
    ()=>{
      !isSecret && questResultIs(true);
      return () => {};
    }, []);

  return isSecret 
    ? (
        <PipelineQuest>
          <p>{cave_2_1_again.mission[0]()}<br/><br/>{'Siess! Tedd le a lantot az adott helyen!'}</p>
        </PipelineQuest>
      ) 
    : null;
}