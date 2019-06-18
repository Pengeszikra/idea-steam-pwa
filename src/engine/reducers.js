import { actionCreator } from "../utils/actionCreator";

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [SELECT_LEVEL, selectLevel] = actionCreator('select-level');
export const [SAVE_PRISONER, savePrisoner] = actionCreator('save-prisoner');
export const [GET_ITEM, getItem] = actionCreator('get-item');
export const [MOVE_TO_AREA, moveToArea] = actionCreator('move-to-area');
export const [QUEST_SOLVED, questSolved] = actionCreator('quest-solved');

export const storyInitial = {
  level: 1,  
  score: 0,   
  areaId: 'Q',
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
};

export const storyReducer = (state, {type, payload}) => {
  const area = state.caveLookUp[state.areaId];
  
  switch(type) {
    case ACHIVE_SCORE: 
      return {
        ...state, 
        score: state.score + payload 
      };

    case SELECT_LEVEL: 
      return {
        ...state, 
        level: payload
      };

    case MOVE_TO_AREA: 
      if (!state.caveLookUp[payload]) return state;
      // const exploredArea = state.caveLookUp[state.areaId];
      return {
        ...state, 
        area: payload, 
        caveLookUp: {...state.caveLookUp,  [state.areaId]:{...area, explored: true}} 
      }

    case SAVE_PRISONER:
      // const savedArea = state.caveLookUp[state.areaId];
      const prisoners = savedArea.items.filter(prisoner => prisoner !== payload);
      return {
        ...state, 
        caveLookUp: {...state.caveLookUp,  [state.areaId]:{...area, prisoners} },
        saved: [...state.saved, payload]
      };
    
    case GET_ITEM: 
      // const itemArea = state.caveLookUp[state.areaId];
      const items = itemArea.items.filter(item => item !== payload);
      return {
        ...state, 
        caveLookUp: {...state.caveLookUp,  [state.areaId]:{...area, items} },
        equipment: [...state.equipment, payload]
      };

    case QUEST_SOLVED:
      // const questArea = state.caveLookUp[state.areaId];      
      return {
        ...state, 
        caveLookUp: {...state.caveLookUp,  [state.areaId]:{...area, solved: true} },        
      }
  
    default: state;
  }
}