import React from 'react';
import { historicalBackground } from './applicationData';
import { HistorycalPapper } from '../styles/divStore';
import showtime from '../utils/showtime';

export default showtime(() => (
  <HistorycalPapper><span>{historicalBackground}</span></HistorycalPapper>
));