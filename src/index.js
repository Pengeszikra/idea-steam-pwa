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

const mockGameCommunication = {questResultIs: result => console.log(`--------\ngame result is: ${result}`)};

rootRender(<IdeaAdventuresBegin />);
//rootRender(<RomanNumbersTask level={2} />);
//rootRender(<FindCubeUv interaction={mockGameCommunication}/>);
//rootRender(<OpenCodeQuestGame interaction={mockGameCommunication} />);
//rootRender(<SolidByPorjectionQuestGame interaction={mockGameCommunication} />);
