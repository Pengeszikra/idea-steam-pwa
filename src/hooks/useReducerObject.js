import {useReducer} from 'react';
import reducerLookUp from './reducerLookUp';

export default (lookUp, initialState) => useReducer(reducerLookup(lookUp), initialState);