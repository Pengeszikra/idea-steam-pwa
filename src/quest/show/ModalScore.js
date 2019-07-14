import React from 'react';
import showtime from '../../utils/showtime';
import {ModalHolder, SmallTable} from '../../utils/divFactory';

// TODO figure out, why don't work this view out from game ???

export default showtime(
  ({score, ...props}) => {

    console.log(score, props);

    return (
      <ModalHolder {...props}>
        <SmallTable>{isNaN(score) ? score : `Score: ${score}`}</SmallTable>
      </ModalHolder>
    );
  }  
);