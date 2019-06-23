import React from 'react';
import { historicalBackground } from '../engine/applicationData';
import { HistorycalPapper } from '../styles/divStore';
import showtime from '../utils/showtime';

export default showtime(({toggleHistory}) => (
  <HistorycalPapper onClick={toggleHistory}><span>{historicalBackground}</span></HistorycalPapper>
));