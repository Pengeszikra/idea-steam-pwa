import {pipe} from 'callbag-basics';
import {useEffect} from 'react';

export default (...callbags) => useEffect(()=>pipe( ...callbags ), []);