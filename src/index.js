import React from 'react';
import {render} from 'react-dom';
import ThreeDimensionTest from './show/ThreeDimensionTest';
import './styles/global.scss';
import Cave from './caves/Cave';
import AppFrame from './layouts/AppFrame';
const rootRender = content => render(content, document.getElementById('root'));

rootRender(<AppFrame/>);