import { actionCreator } from "../hooks/actionCreator";
import useReducerObject from '../hooks/useReducerObject';

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [FREE_SLAVE, freeSlave] = actionCreator('free-slave');

export const scoreLookup = {
  [ACHIVE_SCORE]: ({score, ...store}, eran) => ({score: score + eran,...store}),
  [FREE_SLAVE]: ({saved, ...store}) => ({saved: saved + 1,...store}),
}
