import { actionCreator } from "../utils/actionCreator";
import { area, avatarNames } from "../engine/applicationData";

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [SELECT_LEVEL, selectLevel] = actionCreator('select-level');
export const [SAVE_PRISONER, savePrisoner] = actionCreator('save-prisoner');
export const [GET_ITEM, getItem] = actionCreator('get-item');
export const [MOVE_TO_AREA, moveToArea] = actionCreator('move-to-area');
export const [QUEST_SOLVED, questSolved] = actionCreator('quest-solved');

export const [WALK_ON_MAP, walkOnMap] = actionCreator('walk-on-map');
export const [START_WALK, startWalk] = actionCreator('start-walk');
export const [STOP_WALK, stopWalk] = actionCreator('stop-walk');

export const [SOCRATES_TALK, socratesTalk] = actionCreator('socrates-talk');
export const [STOP_TALK, stopTalk] = actionCreator('stop-talk');
export const [CONTINUE_TALK, continueTalk] = actionCreator('continue-talk');

export const storyInitial = {
  level: 1,  
  score: 0,   
  position: 'Q',
  walk: [area.Q.walk],
  underWalk: false,
  caveLookUp: {
    Q: { explored: true , prisoners: [], items: [], solved: false },
    Y: { explored: false , prisoners: [], items: [], solved: false },
    A: { explored: false , prisoners: ['A1'], items: [], solved: false },
    B: { explored: false , prisoners: ['B1','B2'], items: [], solved: false },
    C: { explored: false , prisoners: ['C1'], items: ['C1','C2'], solved: false },
    D: { explored: false , prisoners: ['D1'], items: ['D1','D2'], solved: false },
    X: { explored: false , prisoners: [], items: [], solved: false },
    E: { explored: false , prisoners: ['E1','E2'], items: ['E1','E2'], solved: false },
    F: { explored: false , prisoners: ['F1','F2'], items: ['F1','F2'], solved: false },
    G: { explored: false , prisoners: ['G1'], items: ['G1','G2'], solved: false },
    H: { explored: false , prisoners: ['H1'], items: ['H1','H2'], solved: false },
    I: { explored: false , prisoners: [], items: [], solved: false },
    J: { explored: false , prisoners: [], items: [], solved: false },
    K: { explored: false , prisoners: [], items: [], solved: false },
    L: { explored: false , prisoners: [], items: [], solved: false },  
  },
  saved: [],
  equipment: [],
  speakAbout: "",
  hasSocrates: false,
};

export const storyReducer = (state, {type, payload}) => {
  // console.log(type, payload, state)

  const {caveLookUp, position, level} = state;
  const area = caveLookUp[position];
  
  switch(type) {
    case ACHIVE_SCORE: return { ...state, score: state.score + payload };
    
    case SELECT_LEVEL: return {...state, level: payload };

    case MOVE_TO_AREA: 
      if (!caveLookUp[payload]) return state;
      return {
        ...state, 
        area: payload, 
        caveLookUp: {...caveLookUp,  [position]:{...area, explored: true}},
        position: payload
      }

    case SAVE_PRISONER:
      const prisoners = area.prisoners.filter(prisoner => prisoner !== payload);
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, prisoners} },
        saved: [...state.saved, payload]
      };
    
    case GET_ITEM: 
      const items = area.items.filter(item => item !== payload);
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, items} },
        equipment: [...state.equipment, payload]
      };

    case QUEST_SOLVED:
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, solved: true} },        
      }

    case START_WALK: return {...state, underWalk: true};
    case STOP_WALK: return {...state, underWalk: false};
    case WALK_ON_MAP: return {...state, walk: payload };

    case SOCRATES_TALK: return {...state, speakAbout: payload(avatarNames[level]), hasSocrates: true };
    case CONTINUE_TALK: return {...state, hasSocrates: true };
    case STOP_TALK: return {...state, hasSocrates: false };

    default: state;
  }
}