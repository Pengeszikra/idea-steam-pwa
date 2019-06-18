import React from 'react';

import './styles/font.scss';
import './styles/global.scss';

import rootRender from './utils/rootRender';
import IdeaWithWichableDocument from './layouts/IdeaWithWichableDocument';

import version from '../version'; console.log(`idea :: ${version}`);

rootRender(<IdeaWithWichableDocument />);