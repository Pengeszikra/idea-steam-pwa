import React from 'react';
import { HistoryBackground, CenterFlex, IntroButton, TopRock, VertivalScroller, Platon } from '../styles/divStore';
import showtime from '../utils/showtime';
import { GEOMS } from '../layouts/Geometries';
import { TurnSmallGeom } from './../layouts/Geometries';

export default showtime(({toggleHistory}) => (
  <VertivalScroller>
    <HistoryBackground>
      <h1>Barlanghasonlat</h1>
      <CenterFlex><Platon/></CenterFlex>
      <p><strong>Platón</strong><i>- ókori görög filozófus -</i> barlanghasonlatában az emberek kikötözve csak a barlang falára vetülő árnyakat látják.
      Mivel egész életüket kikötözve élik a barlangban az árnyak világát tartják valóságosnak.</p>
      <p>Platón hasonlatában a barlang a látható valóságot jelképezi, a barlangból való felszabadítás pedig a lélek felemelkedését az ideák világába.</p>
      <p>Platón szerint nem elég a valóság megismerése, 
        hanem vissza kell térni a barlangba és a többi embernek is meg kell mutatni a helyes utat és ezt neveléssel lehet elérni, 
        A barlangból felszabadított ember a Nap sugárzásától először képtelen lenne látni, hogy minek az árnyékát látta. 
        Zavarban lenne és azt hinné, hogy amit a barlangban látott az sokkal valóságosabb. Előbb hozzá kellene edződnie, de legvégül megláthatná a valóságot. 
        Aki megismerte a valóságot az utána mindent inkább elszenved, csak ne kelljen újra úgy élni, mint a barlangban élőknek. 
        Ha visszatér a barlangba csak vakoskodik, míg a szeme újra meg nem szokja a sötétet és barlangban élő társai, akik még nem ismerik a valóságot azt gondolhatják, 
        hogy nem éri meg felmenni, hiszen elvesztette a szeme világát. </p>
        
      <p>Platón azt is leírja, hogy a nevelésre és ezáltal az emberek felszabadítására a filozófusok a legalkalmasabbak, akiknek jártasnak kell lenniük a zenében, 
        költészetben és testnevelésben (elemi képzés), matematikában, csillagászatban és harmóniatanban (tudományos képzés), valamint a filozófiában.</p>

      <h1>Platoni testek</h1>
      <p>Utad során találkozni fogsz a tér ékköveivel, a szabályos testekkel! "Szabályos sokszögekkel határolt Szabályos, vagy platóni testek. A Demiurgosz úgy rendelte, Hogy csak öten lettek. Platón az őselemekkel azonosította őket, Kepler kozmikus szférákkal kötötte össze.</p>
      <p>Szögeik megegyeznek, S minden élnek egyenlő a hossza. Tetra, oktaéder, ikoza, dodeka, És a hexaéder, más néven a kocka.</p>
      <h2>Tetraéder</h2>
      <TurnSmallGeom content={GEOMS.tetrahedron} />
      <h2>Dedokaéder</h2>
      <TurnSmallGeom content={GEOMS.dedocahedron} />
      <h2>Izokaéder</h2>
      <TurnSmallGeom content={GEOMS.icosahedron} />
            
      <ul>
        <li>Kockában oktaéder</li>
        <li>Tetraéderben tetraéder</li>
        <li>Dodekaéderben az ikozaéder</li>
        <li>Ikozaéderben a dodekaéder</li>
        <li>Oktaéderben a kocka</li>
      </ul>

      <CenterFlex>
        <IntroButton onClick={toggleHistory}>Tovább</IntroButton>
      </CenterFlex>
    </HistoryBackground>
  </VertivalScroller>
));