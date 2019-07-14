import React from 'react';
import { ModalHolder, SmallTable } from '../styles/divStore';
import showtime from '../utils/showtime';

export default showtime(
  ({score, ...props}) => (
    <ModalHolder {...props}>
      <SmallTable>{isNaN(score) ? score : `Pont: ${score}`}</SmallTable>
    </ModalHolder>
  )
);


