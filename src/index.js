import React from 'react';
import {render} from 'react-dom';
import ThreeDimensionTest from './show/ThreeDimensionTest';
import IdeaDocument from './show/IdeaDocument';
import './styles/global.scss';
import Cave from './caves/Cave';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const rootRender = content => render(content, document.getElementById('root'));
import Header from './layouts/Header'
import ButtonLine from './layouts/ButtonLine'

rootRender(
  <main>
    <Cave url="/document/idea.md" />
    <Header />
    <ButtonLine />
  </main>  
);