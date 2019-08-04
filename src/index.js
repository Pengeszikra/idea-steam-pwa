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

getMeshes(); // preload blender files

// for single game development TODO remove
const mockGameCommunication = {
  questResultIs: result => console.log(`--------\ngame result is: ${result}`),
  instruction: cave_1_1.intro_2('Mr. Foo')
};

rootRender(<IdeaAdventuresBegin />);

//rootRender(<RomanNumbersTask level={2} />);
//rootRender(<FindCubeUv interaction={mockGameCommunication}/>);
//rootRender(<RomanNumbersTask level={2} interaction={mockGameCommunication}/>);
//rootRender(<OpenCodeQuestGame interaction={mockGameCommunication} />);

//rootRender(<PairProjectionQuestGame interaction={mockGameCommunication} />);

//rootRender(<PointShadowGame interaction={mockGameCommunication} />);
//rootRender(<Victory level={1} />);
//rootRender(<IntersectionTest />);
//rootRender(<PipeDraw2D interaction={mockGameCommunication} />);

//rootRender(<SolidByPorjectionQuestGame interaction={mockGameCommunication} />);
//rootRender(<SpeedPairs3DGame interaction={mockGameCommunication} position={'E'} />);
//rootRender(<Minimal3DGame interaction={mockGameCommunication} />);

