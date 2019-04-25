import React from 'react';
import divFactory from '../layouts/divFactory';

export const [HeaderBarSection, LevelOneAvatar] = divFactory(["header-bar", "lvl-1-char"]);

export const [
  BottomBarSection, 
  MapIcon, 
  InventoryIcon, 
  SavedIcon, 
  HistoryIcon
] = divFactory(["bottom-bar", "bottom-map", "bottom-inventory", "bottom-saved", "bottom-history"]);

export const [PlayCity, Socrates, SmallLogo]= divFactory(["play-city", "socrates", "small-logo"]);