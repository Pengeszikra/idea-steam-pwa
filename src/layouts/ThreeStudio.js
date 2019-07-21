import React from 'react';
import ThreeArea from "./ThreeArea";
import showtime from "../utils/showtime";
import { play3dContent } from './Geometries';

const Studio = ({movie}) => <ThreeArea add3DContent={studio => play3dContent(studio)(movie)} />;

export default showtime(Studio);