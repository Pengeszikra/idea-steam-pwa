import React, {useState, useEffect, useRef} from 'react';

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

const TargetArea = ({id, drag, setDrag, match}) => {
  const [dragState, setDragState] = useState(0);
  const [attached, setAttached] = useState(null);

  const handleDragOver = event => {
    event.preventDefault()    
    setDragState(1)
  };
  const handleDrop = event => {
    event.preventDefault();    
    setDragState(2)
    const isMatch = match(id, drag);
    console.log(`drop is match: ${isMatch}`);
    if (isMatch) {
      console.log(drag.cardRef.current)      
    }
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
const Card = ({id, drag, setDrag}) => {
  const cardRef = useRef();  
  const handleDragStart = event => {
    console.log(`'-- dragstart ---`);    
    setDrag({start:id, cardRef})
  };

  return (
    <div style={cardStyle} draggable={true} onDragStart={handleDragStart} id={id} ref={cardRef}>
    </div>
  );
};

const match = (targetId, drag) => {
  const {start} = drag;
  const posibbleDrops = {
    1: [11],
    2: [11,13],
    3: [11,12,13],
    4: [14], 
  }[targetId]
  return posibbleDrops && posibbleDrops.indexOf(start) >= 0;
}

export default () => {
  const [drag, setDrag] = useState({});
  return (
    <section style={{margin: '2em'}}>
      <h1>Drag and Drop test page</h1>
      <p>Veri important feauture for any application is drag and drop</p>    
      <TargetArea id={1} drag={drag} setDrag={setDrag} match={match}/>
      <TargetArea id={2} drag={drag} setDrag={setDrag} match={match}/>
      <TargetArea id={3} drag={drag} setDrag={setDrag} match={match}/>
      <TargetArea id={4} drag={drag} setDrag={setDrag} match={match}/>
      <br/>
      <Card id={11} drag={drag} setDrag={setDrag}/>
      <Card id={12} drag={drag} setDrag={setDrag}/>
      <Card id={13} drag={drag} setDrag={setDrag}/>
      <Card id={14} drag={drag} setDrag={setDrag}/>
    </section>
  )
}
