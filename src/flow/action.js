import { actionCreator } from "../hooks/actionCreator";

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [FREE_SLAVE, freeSlave] = actionCreator('free-slave');

export const scoreReducer = ({type, payload}, state) => {
  switch(type) {
    case ACHIVE_SCORE: return {score: state.score + payload, ...state };
    case FREE_SLAVE: return {saved: state.saved + 1, ...state}
    default: state;
  }
}