import version from '../version';  console.log(`idea :: ${version}`);

import React from 'react';
import './styles/font.scss';
import './styles/global.scss';

import rootRender from './utils/rootRender';
import IdeaAdventuresBegin from './layouts/IdeaAdventuresBegin';
import RomanNumbersTask from './quest/RomanNumbersTask';
import FindCubeUv from './quest/FindCubeUv';
import OpenCodeQuestGame from './quest/OpenCodeQuestGame';
import SolidByPorjectionQuestGame from './quest/SolidByPorjectionQuestGame';
import PairProjectionQuestGame from './quest/PairProjectionQuestGame';
import PipeDrawGame from './_plan/PipeDrawGame';
import PointShadowGame from './quest/PointShadowGame';
import Victory from './story/Victory';
import PipeDraw2D from './quest/PipeDraw2D';
import IntersectionTest from './quest/test/IntersectionTest';
import { getMeshes } from './quest/blenderObjects';
import Minimal3DGame from './quest/test/Minimal3DGame';
import { cave_1_1 } from './engine/applicationData';
import SpeedPairs3DGame from './quest/SpeedPairs3DGame';
import { SimpleDarkBg } from './styles/divStore';
import ThreeGemGames from './quest/ThreeGemGames';
import PerfectShapesGame from './quest/PerfectShapesGame';
import SendToEntrance from './quest/SendToEntrance';
import Stem from './story/Stem';

getMeshes(); // preload blender files

// for single game development TODO remove
const mockGameCommunication = {
  questResultIs: result => console.log(`--------\ngame result is: ${result}`),
  instruction: cave_1_1.intro_2('Mr. Foo'),
  itemList: () => ['C1','C2','D1','D2','E1','E2','F1','F2','G1','G2','H1','H2'],
  handleRoute: path => e => console.log(`walk to ${path}`),
  setEscape: console.log,
  getEscape: console.table,
};

rootRender(<IdeaAdventuresBegin />);

//rootRender(<RomanNumbersTask level={2} />);
//rootRender(<FindCubeUv interaction={mockGameCommunication}/>);
//rootRender(<RomanNumbersTask level={2} interaction={mockGameCommunication}/>);
//rootRender(<OpenCodeQuestGame interaction={mockGameCommunication} />);

//rootRender(<PairProjectionQuestGame interaction={mockGameCommunication} />);

//rootRender(<PointShadowGame interaction={mockGameCommunication} />);

//rootRender(<IntersectionTest />);
//rootRender(<PipeDraw2D interaction={mockGameCommunication} />);

//rootRender(<SolidByPorjectionQuestGame interaction={mockGameCommunication} />);
//rootRender(<SpeedPairs3DGame interaction={mockGameCommunication} position={'G'} />);
//rootRender(<Minimal3DGame interaction={mockGameCommunication} />);
//rootRender(<SimpleDarkBg/>)
//rootRender(<ThreeGemGames interaction={mockGameCommunication} />);
//rootRender(<PerfectShapesGame interaction={mockGameCommunication}/>)
//rootRender(<SendToEntrance interaction={mockGameCommunication} />)
//rootRender(<Victory level={1} reset={() => console.log('again !')} escape={'F'} />);
//rootRender(<Stem />);
