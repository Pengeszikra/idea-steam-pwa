import version from '../version';  console.log(`idea :: ${version}`);

import React from 'react';
import './styles/font.scss';
import './styles/global.scss';

import rootRender from './utils/rootRender';
import IdeaAdventuresBegin from './layouts/IdeaAdventuresBegin';

rootRender(<IdeaAdventuresBegin />);