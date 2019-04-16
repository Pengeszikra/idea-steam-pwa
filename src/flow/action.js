import { useReducer } from "react";
import { actionCreator } from "../hooks/actionCreator";

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [FREE_SLAVE, freeSlave] = actionCreator('free-slave');
export const [CHANGE_ROUTE, changeRoute] = actionCreator('change-route');

export const scoreInitial = {score: 0, saved: 0, level: 1, route:'inventory'};

export const scoreReducer = (state, {type, payload}) => {
  switch(type) {
    case ACHIVE_SCORE: return {...state, score: state.score + payload };
    case FREE_SLAVE: return {...state, saved: state.saved + 1};
    case CHANGE_ROUTE: return {...state, route: payload };
    default: state;
  }
}