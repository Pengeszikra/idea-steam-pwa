import React from 'react';
import { historicalBackground } from '../caves/applicationData';
import { HistorycalPapper } from '../layouts/divStore';
import showtime from '../layouts/showtime';

export default showtime(() => (
  <HistorycalPapper><span>{historicalBackground}</span></HistorycalPapper>
));