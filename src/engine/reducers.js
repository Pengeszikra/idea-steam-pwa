import { actionCreator } from "../utils/actionCreator";
import { areaData, avatarNames } from "../engine/applicationData";

export const [ACHIVE_SCORE, achiveScore] = actionCreator('achive-score');
export const [SELECT_LEVEL, selectLevel] = actionCreator('select-level');
export const [SAVE_PRISONER, savePrisoner] = actionCreator('save-prisoner');
export const [GET_ITEM, getItem] = actionCreator('get-item');
export const [MOVE_TO_AREA, moveToArea] = actionCreator('move-to-area');

export const [BEGIN_QUEST, beginQuest] = actionCreator('begin-quest');
export const [OUT_OF_QUEST, outOfQuest] = actionCreator('out-of-quest');
export const [QUEST_SOLVED, questSolved] = actionCreator('quest-solved');

export const [WALK_ON_MAP, walkOnMap] = actionCreator('walk-on-map');
export const [START_WALK, startWalk] = actionCreator('start-walk');
export const [STOP_WALK, stopWalk] = actionCreator('stop-walk');

export const [SOCRATES_TALK, socratesTalk] = actionCreator('socrates-talk');
export const [STOP_TALK, stopTalk] = actionCreator('stop-talk');
export const [CONTINUE_TALK, continueTalk] = actionCreator('continue-talk');
export const [DEBUG_RESET, debugReset] = actionCreator('debug-reset');
export const [PUT_DOWN_ITEM, putDownItem] = actionCreator('put-down-item');
export const [ALTERNATE_QUEST, alternateQuest] = actionCreator('alternate-quest');

export const [SET_MODAL, setModal] = actionCreator('set-modal');

const modalOff = {
  hasSocrates: false,
  mapVisible: false,
  inventoryVisible: false,
  teamVisible: false,
  playerInfoVisible: false,
}

export const storyInitial = {
  level: 1,  
  score: 0,   
  position: 'Q',
  walk: [areaData.Q.walk],
  underWalk: false,
  caveLookUp: {
    Q: { explored: true , prisoners: [], items: [], solved: false, readed: false },
    Y: { explored: false , prisoners: [], items: [], solved: false, readed: false },
    A: { explored: false , prisoners: ['A1'], items: [], solved: false, readed: false },
    B: { explored: false , prisoners: ['B1','B2'], items: [], solved: false, readed: false },
    C: { explored: false , prisoners: ['C1'], items: ['C1','C2'], solved: false, readed: false },
    D: { explored: false , prisoners: ['D1'], items: ['D1','D2'], solved: false, readed: false },
    X: { explored: false , prisoners: [], items: [], solved: true, readed: false },
    E: { explored: false , prisoners: ['E1','E2'], items: ['E1','E2'], solved: false, readed: false },
    F: { explored: false , prisoners: ['F1','F2'], items: ['F1','F2'], solved: false, readed: false },
    G: { explored: false , prisoners: ['G1'], items: ['G1','G2'], solved: false, readed: false },
    H: { explored: false , prisoners: ['H1'], items: ['H1','H2'], solved: false, readed: false },
    I: { explored: false , prisoners: ['I1'], items: [], solved: false, readed: false },
    J: { explored: false , prisoners: [], items: [], solved: false, readed: false },
    K: { explored: false , prisoners: [], items: [], solved: false, readed: false },
    L: { explored: false , prisoners: [], items: [], solved: false, readed: false },
  },
  saved: [],
  equipment: [], //['C1','C2','D1','D2','E1','E2','F1','F2','G1','G2','H1','H2'],
  
  hasQuesting: false,
  lightUp: false,
  finalQuestSolved: false,

  speakAbout: "",

  ...modalOff,
  /*
  hasSocrates: false,
  mapVisible: false,
  inventoryVisible: false,
  teamVisible: false,
  */
};


export const storyReducer = (state, {type, payload}) => {
  // console.log(type, payload, state)

  const {caveLookUp, position, level} = state;
  const area = caveLookUp[position];
  
  switch(type) {
    case DEBUG_RESET: return {...storyInitial};

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
      // After area solved, but prisoner didn't released.
      if (!area.solved) {
        const {intro, secretIntro} = areaData[position].data;
        console.log(intro, secretIntro);
        return {          
          ...state, 
          speakAbout: intro 
            ? area.secret 
              ? secretIntro(avatarNames(level)) 
              : intro(avatarNames(level)) 
            : `A -[${position}]- barlangban még hiányzik a bevezető szöveg!`, 
          hasSocrates: true, 
          hasQuesting: true,
          // caveLookUp: {...caveLookUp,  [position]:{...area, solved: true} }, // TODO
        };
      }

      // before solved  
      const prisoners = area.prisoners.filter(prisoner => prisoner !== payload);
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, prisoners} },
        saved: [...state.saved, payload]
      };
    
    case GET_ITEM: 
      const items = area.items.filter(item => item !== payload);
      
      const finalQuestSolved = 
        payload === 'E2'
        && caveLookUp.Y.secret 
        && caveLookUp.Y.solved
        && position === 'F';

      const sett = area.items.sort().join('');
      if(sett === 'D1E1G2H2' && position === 'K') {
        return {
          ...state,
          caveLookUp: {...caveLookUp,  [position]:{...area, items:[]} },  
          lightUp: true
        }
      };
            
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, items} },
        equipment: [...state.equipment, payload],
        finalQuestSolved
      };

    case PUT_DOWN_ITEM:
      if (state.equipment.indexOf(payload) === -1 || !area.solved) return state;      
      const equipment = state.equipment.filter(item => item !== payload);
      const itemsPlusPutted = [...area.items, payload];
      return {
        ...state,
        caveLookUp: {...caveLookUp, [position]:{...area, items: itemsPlusPutted}},
        equipment,
      };

    case QUEST_SOLVED:
      return {
        ...state, 
        caveLookUp: {...caveLookUp,  [position]:{...area, solved: true} },
      }

    case START_WALK: return {...state, underWalk: true};
    case STOP_WALK: return {...state, underWalk: false};
    case WALK_ON_MAP: return {...state, walk: payload };
    
    case BEGIN_QUEST: return {...state, hasQuesting: true};
    case OUT_OF_QUEST: return {
      ...state, 
      hasQuesting: false, 
      hasSocrates: false, 
      caveLookUp: {...caveLookUp,  [position]:{...area, readed: true} },
    };

    case ALTERNATE_QUEST: 
      return {
        ...state,   
        caveLookUp: {...caveLookUp,  [payload]:{...(caveLookUp[payload]), solved:false, secret: true} },
      }

    case SOCRATES_TALK: 
      const speakAbout = payload(avatarNames(level));
      return {...state, speakAbout, ...modalOff, hasSocrates: true};

    case CONTINUE_TALK: return {...state, ...modalOff, hasSocrates: true};
    case STOP_TALK: return {...state, hasSocrates: false };

    case SET_MODAL: 
      const {map, inventory, team, playerInfo} = payload;
      if (map !== undefined) return {...state, ...modalOff, mapVisible: map};
      if (inventory !== undefined) return {...state, ...modalOff, inventoryVisible: inventory};
      if (team !== undefined) return {...state, ...modalOff, teamVisible: team};
      if (playerInfo !== undefined) return {...state, ...modalOff, playerInfoVisible: playerInfo };

    default: return state;
  }
}
