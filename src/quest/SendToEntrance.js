import React, {useEffect} from 'react';

export default ({interaction}) => {
  const {questResultIs, checkItem, makeAlternateQuest} = interaction;
  useEffect(()=>{
    questResultIs(true);    
    // console.log('--- enter to final quiz ---');
    // console.log(`found K : C1 :: ${checkItem('C1', 'K')}`);
    makeAlternateQuest('Y');
  },[]);
  return null;
};
