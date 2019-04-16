import React, {useState, useEffect, useRef} from 'react';

const targetAreaStyle = {
  width: 200,
  height: 200,
  background: '#444',
  margin: '1em',
  display: 'inline-block',
}

const cardStyle = {
  width: 150,
  height: 200,
  background: '#777',
  margin: '1em',
  display: 'inline-block',
}

const TargetArea = ({id}) => {
  const handleDragOver = event => event.preventDefault;
  const handleDrop = event => {
    event.preventDefault;
    console.log(event);
    const data = event.dataTransfer.getData("text");
    console.log(data)
  }
  return <div style={targetAreaStyle} id={id} onDrop={handleDrop} onDragOver={handleDragOver}></div>;
};
const Card = ({id, targets=[]}) => {
  const cardRef = useRef();  
  // const [hasDragging, setDragging] = useState(false);
  
  const handleDragStart = event => {
    console.log('-- dragstart ---', cardRef.current.id, event.target.id);
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