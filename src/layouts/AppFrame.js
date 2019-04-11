import React, {useState, useEffect} from 'react';
import Header from './Header';
import ButtonLine from './ButtonLine';
import Content from './Content';

export default () => {
  const [route, setRoute] = useState(2.1);

  return (
    <main className="appFrame">
      <Header />
      <Content route={route} />
      <ButtonLine setRoute = {setRoute} />
    </main>  
  );
}
