import React from 'react';
import { SimpleDarkBg, CenterFlex, StemWelcome, IntroButton } from '../styles/divStore';

export default ({reset}) => {
  return (
    <SimpleDarkBg>
      <CenterFlex style={{height: '100vh'}}>
        <StemWelcome>
          <p><strong>Kedves Játékos!</strong></p>
          <p>Reméljük tetszett ez az app és kipróbálod a többi játékunkat is.</p>
          <p>Okosnak lenni és sok mindenről sokat tudni jó dolog. Azért is jó, mert így megérthető és jobban élvezhető a Világban szinte minden.</p>
          <p>Mindezen képességek kifejlesztéséhez érdemes az Matematikai, Természettudományi, Műszaki, vagy Informatikai, röviden <strong>MTMI</strong> (vagy angolul: Science Technology Engineering Mathematics, azaz <strong>STEM</strong>) egyetemi szakok egyikét választanod.</p>
          <p>Bármilyen kérdéseddel kapcsolatban keress minket az <a href="http://www.uni-obuda.hu/" target="_blank">Óbudai Egytemen</a></p>
          <CenterFlex>
            <IntroButton onClick={reset}>Ismétlés</IntroButton>
          </CenterFlex>
        </StemWelcome>
      </CenterFlex>
    </SimpleDarkBg>
  );
};