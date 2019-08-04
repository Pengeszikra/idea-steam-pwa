import React from 'react';
import { ModalHolder, SmallTable, SmallButton, SmallTableTalker } from '../styles/divStore';
import showtime from '../utils/showtime';

export default showtime(
  ({score, position = "A", ...props}) => (
    <ModalHolder {...props}>
      <SmallTableTalker data-cave={position} />      
      <SmallTable>
        {isNaN(score) ? score : `Pont: ${score}`}
        <SmallButton>tovább</SmallButton>
      </SmallTable>
    </ModalHolder>
  )
);