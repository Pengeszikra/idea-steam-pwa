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

export const areaData = {
  Q: {exits:['Q-Y'], walk:[ 14, 49], data:entrance },
  Y: {exits:['Y-A', 'Y-B'], walk:[ 28, 49], data:cave_1_1 },
  A: {exits:['A-C', 'A-X', 'A-Y'], walk:[ 34, 27], data:cave_2_1 },
  B: {exits:['B-D', 'B-X', 'B-Y'], walk:[ 32, 72], data:cave_2_2 },
  C: {exits:['C-A', 'C-X'], walk:[ 55, 24], data:cave_2_3 },
  D: {exits:['D-B', 'D-X'], walk:[ 58, 69], data:cave_2_4 },
  X: {exits:['X-A', 'X-B', 'X-C', 'X-D', 'X-E'], walk:[ 45, 49], data:{} },
  E: {exits:['E-F', 'E-G', 'E-X'], walk:[ 76, 46], data:cave_2_5 },
  F: {exits:['F-E', 'F-H'], walk:[ 84, 16], data:cave_2_6 },
  G: {exits:['G-E', 'G-H'], walk:[ 88, 73], data:cave_2_7 },
  H: {exits:['H-I', 'H-G', 'H-F'], walk:[ 99, 49], data:cave_2_8 },
  I: {exits:['I-H', 'I-J'], walk:[121, 25], data:cave_2_9 },
  J: {exits:['J-I', 'J-K'], walk:[141, 30], data:cave_2_10 },
  K: {exits:['K-J', 'K-L'], walk:[116, 56], data:cave_2_11 },
  L: {exits:['L-K'], walk:[142, 67], data:cave_2_12 },
}