import React, {useState} from 'react';
import { Adeimantosz, Glaukon, Island } from '../layouts/divStore';

export default ({level}) => {

  return (
    <Island>
      { level === 1 && <Glaukon style={{left:'-4vmin', bottom: '4vmin'}}/>}
      { level === 2 && <Adeimantosz style={{left:'48vmin', bottom: '4vmin', transform:'scaleX(-1)'}}/> }
    </Island>
  );
}