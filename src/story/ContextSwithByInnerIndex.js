import React, {useState, useEffect} from 'react';
import { 
  SimpleDarkBg, FoundCubeUvQuest, 
  QuestSketch, OpenCodeQuest, FoundAllProjectionQuest, SolidByProjectionQuest, 
  FoundTetraederUvQuest, PointProjectionQuest,
  EquipmentQuest, RomanNumbers,
  ContinuosPathQuest, PipelineQuest,
  PairSolidToProjectionQuest, PairProjectionToSolidQuest
} from '../styles/divStore';

export default () => {
  const [index, setIndex] = useState(0);
  const [Content, render] = useState(QuestSketch);
  const handleNext = e => setIndex(prev => prev + 1);

  const contents = [
    OpenCodeQuest,
    QuestSketch,
    FoundAllProjectionQuest,
    SolidByProjectionQuest,
    FoundTetraederUvQuest,
    PointProjectionQuest,
    FoundCubeUvQuest,
    EquipmentQuest,
    ContinuosPathQuest,
    PipelineQuest,
    PairSolidToProjectionQuest,
    PairProjectionToSolidQuest,
    RomanNumbers,
    SimpleDarkBg,
  ];

  useEffect(() => {
    const NewContent = contents[index % contents.length];
    NewContent && render(<NewContent onClick={handleNext} />);
  }, [index]);
  
  return Content;
}