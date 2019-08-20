import {pipe} from 'callbag-basics';
import {useEffect} from 'react';

export default (...callbags) => useEffect(()=>pipe( ...callbags ), []);

export const usePipeWhen = when => (...callbags) => useEffect(()=>{
  if (when) {
    pipe( ...callbags )
  }
  return () => {};
}, [when]);