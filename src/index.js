import React from 'react';

import './styles/font.scss';
import './styles/global.scss';

import rootRender from './flow/rootRender';
import AppWithWichableDocument from './layouts/AppWithWichableDocument';
import { Minigame } from './show/Geometries';

rootRender(<AppWithWichableDocument />);