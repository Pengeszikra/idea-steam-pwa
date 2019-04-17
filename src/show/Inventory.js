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
  width: '25vmin',
  height: '30vmin',
  background: '#777',
  margin: '1em',
  display: 'inline-block',
}

const TargetArea = ({id}) => {
  const [dragState, setDragState] = useState(0);
  const handleDragOver = event => {
    event.preventDefault()
    // console.log('hoover',event.target.id);
    setDragState(1)
  };
  const handleDrop = event => {
    event.preventDefault();
    // console.log(event);
    const data = event.dataTransfer.getData("text");
    // console.log(data)
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
const Card = ({id, targets=[]}) => {
  const cardRef = useRef();  
  // const [hasDragging, setDragging] = useState(false);
  
  const handleDragStart = event => {
    // console.log('-- dragstart ---', cardRef.current.id, event.target.id);
    event.dataTransfer.setData("text", event.target.id);
  };

  return <div style={cardStyle} draggable={true} onDragStart={handleDragStart} id={id} ref={cardRef}></div>;
};

export default () => (
  <section style={{margin: '2em'}}>
    <h1>Drag and Drop test page</h1>
    <p>Veri important feauture for any application is drag and drop</p>    
    <TargetArea id={1} />
    <TargetArea id={2} />
    <Card id={3} targets={[1,2]}/>
    <Card id={4} targets={[1,2]}/>
  </section>
)