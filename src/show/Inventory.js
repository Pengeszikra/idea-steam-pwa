import React, {useState, useEffect, useRef} from 'react';
import {mobs} from '../games/mobs';

const targetAreaStyle = {
  width: '30vmin',
  height: '30vmin',
  background: '#444',
  margin: '1em',
  display: 'inline-block',
}

const targetDragOverStyle = {...targetAreaStyle, border: '1px solid #777', boxSizing:'border-box' }
const targetDropStyle = {...targetAreaStyle, border: '2px solid #222', boxSizing:'border-box' }

const targetDragStyles = [
  targetAreaStyle,
  targetDragOverStyle,
  targetDropStyle
]

const cardStyle = {
  width: 'calc(25vmin)',
  height: 'calc(30vmin)',
  background: '#777',
  margin: '1em',
  display: 'inline-block',
  position: 'relative',
}

const contentStyle = {
  position: 'absolute',
  textAlign: 'center',
  padding: '.4em',
  width: 'calc(100% - .8em)',
  color: '#444',
}

const TargetArea = ({id}) => {
  const [dragState, setDragState] = useState(0);
  const [attached, setAttached] = useState(null);
  const handleDragOver = event => {
    event.preventDefault()
    // console.log('hoover',event.target.id);
    setDragState(1)
  };
  const handleDrop = event => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    console.log(data)
    setDragState(2)
  }
  const handleDragLeave = event => {
    event.preventDefault();
    setDragState(0)
  }
  return (
    <div 
      style={targetDragStyles[dragState]} 
      id={id} 
      onDrop={handleDrop} 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    />
  );
};
const Card = ({targets=[], mob}) => {
  const cardRef = useRef();  
  const {name='knight', attack=7, skill='3', life='13'} = mob;
  const id = name;
  const handleDragStart = event => {
    // console.log('-- dragstart ---', cardRef.current.id, event.target.id);
    event.dataTransfer.setData("text", event.target.id);
  };

  return (
    <div style={cardStyle} draggable={true} onDragStart={handleDragStart} id={id} ref={cardRef}>
      <div style={contentStyle}>{name}<br/>{attack} {skill} {life}</div>
    </div>
  );
};

export default () => (
  <section style={{margin: '2em'}}>
    <h1>Drag and Drop test page</h1>
    <p>Veri important feauture for any application is drag and drop</p>    
    <TargetArea id={1} />
    <TargetArea id={2} />
    <TargetArea id={3} />
    <TargetArea id={4} />
    <br/>
    <Card targets={[1,2]} mob={mobs.knight}/>
    <Card targets={[1,2]} mob={mobs.elf}/>
    <Card targets={[1,2]} mob={mobs.paladin}/>
    <Card targets={[1,2]} mob={mobs.lifestealer}/>
  </section>
)