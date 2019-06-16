export const avatarNames = level => level == 2 ? 'Adeimantosz' : 'Glaukón';

export const historicalBackground = `Platón - ókori görög filozófus - barlanghasonlatában az emberek kikötözve csak a barlang falára vetülő árnyakat látják. Mivel egész életüket kikötözve élik a barlangban az árnyak világát tartják valóságosnak. Platón hasonlatában a barlang a látható valóságot jelképezi, a barlangból való felszabadítás pedig a lélek felemelkedését az ideák világába. Platón szerint nem elég a valóság megismerése, hanem vissza kell térni a barlangba és a többi embernek is meg kell mutatni a helyes utat és ezt neveléssel lehet elérni, A barlangból felszabadított ember a Nap sugárzásától először képtelen lenne látni, hogy minek az árnyékát látta. Zavarban lenne és azt hinné, hogy amit a barlangban látott az sokkal valóságosabb. Előbb hozzá kellene edződnie, de legvégül megláthatná a valóságot. Aki megismerte a valóságot az utána mindent inkább elszenved, csak ne kelljen újra úgy élni, mint a barlangban élőknek. Ha visszatér a barlangba csak vakoskodik, míg a szeme újra meg nem szokja a sötétet és barlangban élő társai, akik még nem ismerik a valóságot azt gondolhatják, hogy nem éri meg felmenni, hiszen elvesztette a szeme világát. Platón azt is leírja, hogy a nevelésre és ezáltal az emberek felszabadítására a filozófusok a legalkalmasabbak, akiknek jártasnak kell lenniük a zenében, költészetben és testnevelésben (elemi képzés), matematikában, csillagászatban és harmóniatanban (tudományos képzés), valamint a filozófiában.`;

export const whoIsTheHero = `Igaz lenne? Sokan elbeszélték már nekem Thébától Mükénéig, Hérodotosztól Thuküdidészig, hogy lesz majd ki kész a kalandokra, 
  ki jártas a tudományokban, ki felszabadítja a fogságban tartottakat.`;

export const avatarDescripts = [
  `Platón fivére vagyok. Eszemnél vagyok, de nem szeretem a túl nehéz feladványokat. 1-es szint feladatok`,
  `Én vagyok a legidősebb testvér, bármilyen nehéz feladvánnyal megbirkózom. 2-es szint feladatok`,
] 
export const entrance = {
  intro: karakter => `Elindulsz hát az úton kedves ${karakter}! Alattunk terül el a barlangrendszer, melyben a fogságban tartott emberek barlangéletet élnek. Ők, a vakságban tartottak várják azt a napot, mely a felszabadításuk napja lesz! karakter tanult ember vagy, ám erről bizonyságot kell tenned! Helyesen felelj és te leszel, aki megváltja a vakságban tartottakat!`
  ,
  mission: _ => `Helyezd el a barlang bejáratán látható alakzatokat a megadott szempontok szerint.`
  ,
  gratulation: karakter => `Jól feleltél ${karakter}! Indulj hát a fogságban tartottak felszabadítására.`
};  

export const cave_1_1 = {
  intro: karakter => `Már nincs visszaút ${karakter}! Lejöttél a barlangba és magadra vállaltad a fogva tartottak felszabadításának feladatát.`
  ,
  intro_2: _ => `Utad során találkozni fogsz a tér ékköveivel, a szabályos testekkel! "Szabályos sokszögekkel határolt Szabályos, vagy platóni testek. A Demiurgosz úgy rendelte, Hogy csak öten lettek. Platón az őselemekkel azonosította őket, Kepler kozmikus szférákkal kötötte össze.

  Szögeik megegyeznek, S minden élnek egyenlő a hossza. Tetra, oktaéder, ikoza, dodeka, És a hexaéder, más néven a kocka."`
  ,
  duality: _ => `
  1. Kockában oktaéder
  2. tetraéderben tetraéder
  3. Dodekaéderben az ikozaéder
  4. Ikozaéderben a dodekaéder
  5. Oktaéderben a kocka`
  ,
  mission: _ => `Melyik úton indulsz tovább?`
}

export const cave_2_1 = {
  intro: karakter => `A barlangban tűz ég és a fogva tartottak csak a testek árnyait látják a barlang falazatán. Jól beszélsz ${karakter}, de hogy a barlangban élőkkel is szót érts szükségképpen tudnod kell az árnyak nyelvén! Tudnod kell melyik tárgy milyen árnyat vet, ezt fogják csak látni a vakságban tartottak.`
  ,
  mission: _ => `
  Ami a térben van, árnya falra vetül.

  Távoli fény hátulról megvilágítja, a test a sugarak útjába kerül. Létjele így a fényhiány A falra fröcskölt árny.

  Ami a térben van, árnya falra vetül.

  Az árnyékát látod, de őt magát kell megtalálnod. De ha őt magát látod, Az árnyékát kell megtalálnod.
  `
  ,
  extraInfo: _ => `12 test és megoldásként szereplő vetületei.` // ???
}

export const cave_2_2 = {
  intro: karakter => `Jó ${karakter}! Itt van hát a barlangban két fogva tartott, kik összekötözve élik az életüket és csak a tűz lángja által a barlang falára vetett árnyakat látják. Te már jártas vagy az árnyak nyelvezetében, segíts nekik!`
  ,
  mission: _ => `A barlangban két ember ül, akik a barlang falának különböző részét látják. A barlangban található testet ők nem érzékelik, csak különböző irányú megvilágításával keltett árnyékokat. Mutasd meg nekik milyen test található a barlangban!`
  ,
  info: _ => `Ami a térben van, árnya falra vetül.

  Távoli fény hátulról megvilágítja, a test a sugarak útjába kerül. Létjele így a fényhiány A falra fröcskölt árny.
  
  Ami a térben van, árnya falra vetül.
  
  Az árnyékát látod, de őt magát kell megtalálnod. De ha őt magát látod, Az árnyékát kell megtalálnod.` 
  ,
  extraInfo: _ => `12 test és megoldásként szereplő vetületei.` // ???
}

export const cave_2_3 = {
  intro: ``
  ,
  mission: _ => `Jelöld ki azokat az egymás melletti mezőket, melyek a test hálóját adják!`
  ,
  info: _ => `Így már nem határol testet: Fala síkba kiterítve Szétnyílt élekben őrződik A térbeliség emléke.

  Fala síkba kilapítva Alig felismerhető, De a lapot meghajlítva Egy térrész körülkeríthető.
  
  Ha a hálóját látod, Őt magát kell megtalálnod. Ha őt magát látod, Hálóját kell megtalálnod.` 
  ,
  extraInfo: _ => `Ábraként a kocka és a 11 hálója, tetraéder és a 2 hálója`
  ,
  routes: [
    {path:[3,2,0], x:2, y:60, direction:90},
    {path:[3,4,3], x:55, y:20, direction:180},
  ]
}

export const cave_2_4 = {
  intro: ``
  ,
  mission: _ => `Forgasd el a mezőket úgy, hogy a test hóját adják!`
  ,
  info: _ => `Így már nem határol testet: Fala síkba kiterítve Szétnyílt élekben őrződik A térbeliség emléke.

  Fala síkba kilapítva Alig felismerhető, De a lapot meghajlítva Egy térrész körülkeríthető.
  
  Ha a hálóját látod, Őt magát kell megtalálnod. Ha őt magát látod, Hálóját kell megtalálnod.` 
  ,
  extraInfo: _ => `Ábraként a kocka és a 11 hálója, tetraéder és a 2 hálója`
}

export const cave_2_5 = {
  intro: karakter => `Zeuszra ${karakter}, te mindent ismersz a geometria világában! Ha így áll a helyzet mutasd meg a barlangban élőknek az igazságot, hogy mi is az valójában, amit ők látnak.`
  ,
  mission: ``
  ,
  info: `` 
  ,
  time: 2 * 60 * 1000
}

export const cave_2_6 = {
  intro: ``
  ,
  mission: ``
  ,
  info: ``  
}

export const cave_2_7 = {
  intro: ``
  ,
  mission: ``
  ,
  info: `` 
}

export const cave_2_8 = {
  intro: ``
  ,
  mission: ``
  ,
  info: `` 
  ,
  gratulation: karakter => `${karakter}! Emberek felszabadítója! Sikeresen felszabadítottad a fogságból az embereket! Most menj, a te vezetéseddel lehet esély, hogy mindenki épségben kijusson a barlangrendszerből!`
}

export const cave_2_9 = {
  intro: _ => `Ismét bizonyítottad tudásodat az árnyak nyelvének ismeretéről. A felszabadítottak is ámuldozva hallgatják az elbeszéléseidet.

  Még van előttetek akadály, vezesd el a felszabadított embereket a barlangrendszer kijáratához!`
  ,
  mission: _ =>  `Ismerd fel a pontszerű forrásból érkező fény által vetett árnyakat`
  ,
  info: _ => `Ha az izzó fénye, egy pontból kivetül, a keret körülötte padlóra vetül.

  4 kép (illusztrációk, melyek segítenek megérteni, hogy vetnek árnyékot a testek)` 
}

export const cave_2_10 = {
  intro: karakter => `Minden cselekedeteddel a jóra törekedtél ${karakter}. Azonban a figyelmedet elkerülte, hogy a felszabadítottak között egy szabotőr bújuk meg. Látta tudományos képességeidet a geometria területén, de fogságba kerülése előtt ő csak a római számok ismeretét sajátotta el. Elvesztetted hiteledet a szemében, így a felszabadítás szabotálásán mesterkedik. Meggyőzheted őt rátermettségedről, ha bizonyítod neki jártasságodat a következő feladványokban.`
  ,
  mission: ``
  ,
  info: `` 
}

export const cave_2_11 = {
  intro: karakter => `Meg kell lelned a barlangrendszerből a kiutat, ne késlekedj karakter!`
  ,
  mission: [
    karakter => `${karakter}! Válassz ki a zsákodból négy tárgyat, melyek használatával világosság lesz a barlangban.`
    ,
    _ => `Zeuszra mondom, ezt a ládát kulcs nélkül felnyitni lehetetlen!`
    ,
    _ =>  `Zeuszra mondom, itt ez az átjáró beomlott!`
  ]
  ,
  info: `` 
}

export const cave_2_12 = {
  intro: karakter => `Közelinek tűnik, de messze már a nap mikor útnak indultál ${karakter}. Barlangról barlangra, a sötétséggel dacolva haladtál, soha el nem tévesztve a célt: hogy egy napon újra a felszínen érjen a napsugár. Itt vagy hát, és itt vannak mind kiket felszabadítottál. Az utolsó barlangban vagytok, azonban a felszínre csak a legelső bralangból lehet kijutni!`
  ,
  mission: _ => `A pontok barlangokat jelölnek: Rajzolj be a barlangok között folyamatos utat úgy, hogy a kiinduló pontba érkezz vissza és minden barlangon csak egyszer menj keresztül!`
  ,
  info: `` 
}

export const cave_2_1_again = {
  intro: karakter => `Jól figyelj a szavaimra ${karakter}! Sokáig időztél a fogságba esettek kiszabadításával a barlangrendszerben és az égiek most nem kegyesek hozzád! Zápor zúdul a fellegekből és a beömlő víz biztosan elárasztja a barlangokat. Felelj hát helyesen, hogy végleg kijuss a felszabadítottakkal a vakság béklyójából.`
  ,
  mission: [
    _ => `Kezdetben csak egy barlangnyi víz zúdul be. Melyik barlangba helyezkednél az alábbiak közül, hogy a víz biztosan ne érjen téged és a felszabadítottakat?`
    ,
    _ => `Melyik barlang telik meg először vízzel?`
    ,
    _ => `Hány barlangnyi vízre lenne szükség, hogy a felhajtóerő segítségével kijuss a barlangrends?`
  ]
  ,
  info: ``  
}

export const finale = {
  intro: karakter => `${karakter}, teljesítetted a vállalásod, felszabadítottad a rabságban élőket, reményt adtál a reményt vesztetteknek. Küldetésed sikerrel járt, felfedheted a valódi neved, melyet messze visz az elbeszélés Hellász minden zugába, a démosz minden tagjának.`
  ,
  PlatonMerit: karakter => `${karakter} discső felszabadító (pecsét)`
}

export const prisoners = {
  A: [1],
  B: [1,1],
  C: [1],
  D: [1],
  E: [1,1],
  F: [1,1],
  G: [1],
  H: [1],
  I: [1],
}

export const items = {
  C: ['tűzpattintó', 'amfóra'],
  D: ['szárított taplógomba', 'kovakő'],
  E: ['kulcs', 'érme'],
  F: ['tóga', 'saru'],
  G: ['hárfa', 'fáklya test'],
  H: ['körző', 'stílus'],
}

export const routes = {
  QY: {path:'Q-Y', x: 45, y: 53, direction:   0 },

  YA: {path:'Y-A', x:  2, y: 55, direction:  45 },  
  YB: {path:'Y-B', x: 55, y: 55, direction: -25 },

  AY: {path:'A-Y', x: 51, y:  98, direction: -154 },
  AX: {path:'A-X', x: 68, y: 132, direction:  -81 },
  AC: {path:'A-C', x:  7, y: 127, direction:    0 },

  BY: {path:'B-Y', x: 35, y:  34, direction:  115 },
  BX: {path:'B-X', x:  3, y:  96, direction:   72 },
  BD: {path:'B-D', x: 49, y: 120, direction:  -51 },

  CA: {path:'C-A', x:  2, y: 50, direction:  30 },
  CX: {path:'C-X', x: 70, y: 50, direction: -30 },

  DB: {path:'D-B', x: 15, y:  78, direction: 210 },
  DX: {path:'D-X', x:  5, y: 127, direction:  90 },

  XA: {path:'X-A', x:  2, y:  30, direction:  120 },
  XB: {path:'X-B', x: 70, y:  30, direction: -120 },
  XC: {path:'X-C', x:  2, y:  90, direction:   30 },
  XD: {path:'X-D', x: 70, y:  90, direction:  -30 },
  XE: {path:'X-E', x: 36, y: 126, direction:    0 },

  EX: {path:'E-X', x: 32, y:  72, direction: 180 },
  EG: {path:'E-G', x: 70, y: 110, direction: -30 }, 
  EF: {path:'E-F', x:  2, y: 110, direction:  69 },

  FE: {path:'F-E', x: 65, y:  67, direction: 239 },
  FH: {path:'F-H', x: 40, y: 113, direction: -63 },

  GE: {path:'G-E', x: 35, y:  80, direction: 96 },
  GH: {path:'G-H', x:  5, y: 123, direction: 72 },

  HI: {path:'H-I', x: 47, y: 108, direction:  45 },
  HG: {path:'H-G', x: 70, y: 50, direction: -120 },
  HF: {path:'H-F', x:  2, y: 50, direction:  120 },

  IH: {path:'I-H', x: 40, y:  74, direction: 200 },
  IJ: {path:'I-J', x: 30, y: 113, direction: -78 },

  JI: {path:'J-I', x: 18, y: 122, direction:  90 },
  JK: {path:'J-K', x: 61, y: 122, direction: -90 },

  KJ: {path:'K-J', x:  2, y: 122, direction:   62 },
  KL: {path:'K-L', x: 50, y:  75, direction: -170 },

  LK: {path:'L-K', x: 11, y: 62, direction: 114 },
}

export const area = {
  Q: {exits:[routes.QY], walk:[ 14, 49], data:entrance },
  Y: {exits:[routes.YA, routes.YB], walk:[ 28, 49], data:cave_1_1 },
  A: {exits:[routes.AC, routes.AX, routes.AY], walk:[ 34, 27], data:cave_2_1 },
  B: {exits:[routes.BD, routes.BX, routes.BY], walk:[ 32, 72], data:cave_2_2 },
  C: {exits:[routes.CA, routes.CX], walk:[ 55, 24], data:cave_2_3 },
  D: {exits:[routes.DB, routes.DX], walk:[ 58, 69], data:cave_2_4 },
  X: {exits:[routes.XA, routes.XB, routes.XC, routes.XD, routes.XE], walk:[ 45, 49], data:{} },
  E: {exits:[routes.EF, routes.EG, routes.EX], walk:[ 76, 46], data:cave_2_5 },
  F: {exits:[routes.FE, routes.FH], walk:[ 84, 16], data:cave_2_6 },
  G: {exits:[routes.GE, routes.GH], walk:[ 88, 73], data:cave_2_7 },
  H: {exits:[routes.HI, routes.HG, routes.HF], walk:[ 99, 49], data:cave_2_8 },
  I: {exits:[routes.IH, routes.IJ], walk:[121, 25], data:cave_2_9 },
  J: {exits:[routes.JI, routes.JK], walk:[141, 30], data:cave_2_10 },
  K: {exits:[routes.KJ, routes.KL], walk:[116, 56], data:cave_2_11 },
  L: {exits:[routes.LK], walk:[142, 67], data:cave_2_12 },
}