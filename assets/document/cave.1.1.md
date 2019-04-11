# 1.1 Játék leírása	
> Helyszín: a barlang bejárata 
A barlangba jutáshoz egy kódot kell megfejteni. A játékosnak geometriai alakzatokat kell egy mátrixban elhelyezni."																								
																									
### Bevezető szöveg	
Elindulsz hát az úton kedves **karakter**! Alattunk terül el a barlangrendszer, melyben a fogságban tartott emberek barlangéletet élnek. Ők, a vakságban tartottak várják azt a napot, mely a felszabadításuk napja lesz! **karakter** tanult ember vagy, ám erről bizonyságot kell tenned! Helyesen felelj és te leszel, aki megváltja a vakságban tartottakat!																								
### Megoldás utáni szöveg:	
Jól feleltél **karakter**! Indulj hát a fogságban tartottak felszabadítására.																								
### Feladat szöveg:	
Helyezd el a barlang bejáratán látható alakzatokat a megadott szempontok szerint.									
																									
### Működés	"
  játékos elhelyezi az alakzatokat a mátrixban. 
  1-es szint: csak 4 alakzat jelenik meg, így minden metszetbe 1-1 alakzat kerül
  2-es szint: 6 alakzat elhelyezése, 1 metszetbe több alakzat is elhelyezhető.
  Mintaként leírt feladatok: a számítógép a megadott alakzatokból véletlenszerűen választ 4-et, illetve 6-ot.

> Design: 
alakzatok az ajtón (mint egy kódolás), ha az alakzatokat megfelelően elhelyezte a játékos, akkor kitárul a barlang ajtaja.																						

# 1.1v

### Szöveg
Már nincs visszaút **karakter**! Lejöttél a barlangba és magadra vállaltad a fogva tartottak felszabadításának feladatát.
### Működés
Feljön a szöveg és ha elolvasta a játékos ki tud lépni belőle, vagy elrejteni.
### Design
A narrációs szöveget Szókratész alapja mondja.

### Szöveg
Utad során találkozni fogsz a tér ékköveivel, a szabályos testekkel!
"Szabályos sokszögekkel határolt 
Szabályos, vagy platóni testek.
A Demiurgosz úgy rendelte,
Hogy csak öten lettek. 
Platón az őselemekkel azonosította őket,
Kepler kozmikus szférákkal kötötte össze.

Szögeik megegyeznek,
S minden élnek egyenlő a hossza.
Tetra, oktaéder, ikoza, dodeka,
És a hexaéder, más néven a kocka."
### Működés
Megjelenő szöveg
### Design
Itt megjelenik egy rövid vers a szabályos testekről, illetve képként az 5 szabályos test.
Még megjelenik képként a testek kapcsolta (dualitás): 
  - 1. Kockában oktaéder
  - 2. tetraéderben tetraéder
  - 3. Dodekaéderben az ikozaéder
  - 4. Ikozaéderben a dodekaéder
  - 5. Oktaéderben a kocka

### Szöveg
Melyik úton indulsz tovább?
### Működés
A választás alapján a játékos a 2.1 vagy a 2.3 helyszínre jut.
### Design
Két sötét átjáró a választási lehetőség.
(Ha ez túl sok egy oldalra, akkor az útválasztás egy következő oldalon)
