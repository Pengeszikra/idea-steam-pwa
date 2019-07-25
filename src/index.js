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
import PipeDrawGame from './quest/PipeDrawGame';
import PointShadowGame from './quest/PointShadowGame';
import Victory from './story/Victory';
import PipeDraw2D from './quest/PipeDraw2D';

// for single game development TODO remove
const mockGameCommunication = {questResultIs: result => console.log(`--------\ngame result is: ${result}`)};

rootRender(<IdeaAdventuresBegin />);

//rootRender(<RomanNumbersTask level={2} />);
//rootRender(<FindCubeUv interaction={mockGameCommunication}/>);
//rootRender(<RomanNumbersTask level={2} interaction={mockGameCommunication}/>);
//rootRender(<OpenCodeQuestGame interaction={mockGameCommunication} />);
//rootRender(<SolidByPorjectionQuestGame interaction={mockGameCommunication} />);
//rootRender(<PairProjectionQuestGame interaction={mockGameCommunication} />);

//rootRender(<PointShadowGame interaction={mockGameCommunication} />);
//rootRender(<Victory level={1} />);
//rootRender(<PipeDraw2D interaction={mockGameCommunication} />);