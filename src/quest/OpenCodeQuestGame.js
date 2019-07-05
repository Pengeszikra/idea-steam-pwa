import React from 'react';

default export ({interaction:{questResultIs}}) => {
  const [attached, setAttached] = useState(["", "", "", ""]);
  const [solution, setSolution] = useState("Megoldás");
  const t1 = useRef(null);
  const t2 = useRef(null);
  const t3 = useRef(null);
  const t4 = useRef(null);

  // useEffect(()=>console.log(t1, t2, t3, t4), []);
  
  const targets = [t1, t2, t3, t4];
  const [h1, h2, h3, h4] = attached;

  const holdFactory = (shape) => [
      () => {
        const hold = [...attached];
        setAttached(hold.map(e => e == shape ? null : e));  
      } 
      ,
      (dropZone) => {
        const hold = [...attached];
        const index = targets.indexOf(dropZone);
        if (index > -1) {
          hold.map(prev => prev === shape ? null : prev );
          hold[index] = shape;
          setAttached(hold);
        }
      } 
    ]
    
  return (    
    <SimpleDarkBg>
      <div style={{marginTop:"40vmin"}}>{attached.join(" - ")}</div>
      <GameHolder>
          
        <GeomTarget fref={t1}><p>Csúcsok száma: 3</p><p>Van derékszöge</p><p>{h1}</p></GeomTarget>  
        <GeomTarget fref={t2}><p>Csúcsok száma: 4</p><p>Van derékszöge</p><p>{h2}</p></GeomTarget>
        <GeomTarget fref={t3}><p>Csúcsok száma: 3</p><p>Nincs derékszöge</p><p>{h3}</p></GeomTarget>
        <GeomTarget fref={t4}><p>Csúcsok száma: 4</p><p>Nincs derékszöge</p><p>{h4}</p></GeomTarget>
        <IntroButton onClick={() => {
          const isSolved = attached.join("-") === "alfa-beta--";
          setTimeout(()=>questResultIs(isSolved),1000);
          setSolution( isSolved ? "Jó!" : "Rossz!" );
        }}>{solution}</IntroButton>
        
      </GameHolder>      
    </SimpleDarkBg>          
  );
}

/*

      <Drag3D add3DContent={showContent(GEOMS.box, 250, 250, 250)} top={15} left={0} targets={targets} setHold={holdFactory("alfa")} />
      <Drag3D add3DContent={showContent(GEOMS.dedocahedron, 200)} top={15} left={25} targets={targets} setHold={holdFactory("beta")} />
      <Drag3D add3DContent={showContent(GEOMS.icosahedron, 200)} top={15} left={50} targets={targets} setHold={holdFactory("gamma")} />
      <Drag3D add3DContent={showContent(GEOMS.box, 5, 250, 250)} top={15} left={75} targets={targets} setHold={holdFactory("delta")} />

*/