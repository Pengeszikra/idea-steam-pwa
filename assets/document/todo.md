# IDEA - road to run

## minimal stepps to finalize
  - [x] avatar selection reworked
  - [x] games positions
    - [x] Q : Open Door, Run away from water
    - [x] Y : Welcome / Run Away from Water
    - [x] A : Found perfect bodies
    - [x] B : Pair shadow to solid
    - [x] C : Pair solid to shadow
    - [x] D : Cube Uv
    - [x] X : just crossroad - no game
    - [x] E : Pair shadow to solid for time
    - [x] F : Pair solid to shadow for time
    - [x] G : Cube uv for time
    - [x] H : Fallen Pairs
    - [x] I : Three Gems
    - [x] J : Roman Numbers
    - [x] K : Link Path
    - [x] L : Quest of Items, Walk to door 
  - [x] game for caves
  - [x] PerfectShapeGame
  - [ ] games versions
  - [ ] monologs
  - [ ] redraw items
  - [x] rework multiRounds game framework each quest repeat twice at level 2
  - [x] create branch to keep old stuff : oldest

## rapid way to finish

Tenyleg ossze kellene szednem, hogy mi kellene az igazan gyors befejezeshez,

  - [ ] signs on map for water escape
  - [ ] Middle game information
  - [ ] figure out all game type cave bye cave
  - [ ] fix setTimeOut of OpenDoor game
  - [ ] 3D open door animation - maybe
  - [ ] fix item list with description
  - [x] fix modal displays, prevent more than one revealed same time.
  - [ ] maybe blocked way on map.
  - [ ] fix on cave hints
  - [ ] fix score system
  - [ ] under time quests fixing
  - [ ] redraw items
  - [x] redraw prisoners
  - [ ] redraw caves
  - [ ] improve history reader
  - [x] improve avatar selection
  - [ ] write mail to Imo about final of game
  - [ ] maybe better method instead reset game 2x , 3x 
  - [ ] score modal with button space
  - [ ] ortho responsive scale settings
  - [ ] remove avatar click reset game ( or not so direct )

  - [ ] clear unwantaed parts

  // egy kicsit tul sok felesleges kod van a proramba, nem beszelve arrol, hogy  ugyanazt a dolgot 
  // tobbfele technikaval is megoldom
  
## main goals
  - [x] create 3D solids
    - [x] combine perfect solids by THREE.js with blender bodies
  - [x] collect game types
  - [x] collect unique interaction / animation
  - [x] exact game flow without correct games
    - [x] draw new cave routes
    - [x] walk between caves and corssroads
    - [x] mock game types
  - [x] solve all game types
  - [x] story flow
    - [x] story reducer
    - [ ] score system
    - [x] collect items
    - [x] release prisoners
  - [x] sparate document md show parts
  - [..] responsive ortho 3D view
    - [x] size depend on root Group!

## minor goals
  - [x] prevent IOS page over scrolling
  - [ ] fix fonts on IOS
  - [x] preload images // maybe found a better way!
  - [x] folder structure refact // too much folder names
  - [x] separate _plan
  - [x] automatic speak height
  - [x] extend avatar selection with text
  - [x] prisoners in caves
  - [x] items in caves
  - [x] version info on intro page

## game types:
  - [x] open cave system : drag and drop correct shape by matrix
  - [x] 3D - find regular solids projection in matrix
  - [x] 3D - find solid for 2 projection
  - [x] 2D - select matrix wich hold solid UV map ( cube, tetrahedron )
  - [x] 3D - 3 Gem
  - [ ] 3D - turn tile of uv map ... near
  - [ ] 3D - show uv and select correct fallen solid, time quest
  - [ ] 3D - select projection from point for showed solid 2.9 - no way!
      <https://threejs.org/examples/#webgl_lights_hemisphere> - work on my mobil
      <https://threejs.org/examples/#webgl_lights_physical>
      <https://threejs.org/examples/#webgl_lights_spotlights>
      <https://threejs.org/examples/#webgl_shadowmap_pointlight>
  - [x] roman number order game :: 2.10
      <http://www.ngkszki.hu/~trembe/primek/prim01.htm>
      <http://www.betonopus.hu/notesz/mertekegyseg/romaiszam.htm>
  - [..] quest of items :: 2.11
  - [ ] link of routes :: 2.12
  - [..] rain of caves :: 3  

## unique interaction / animation  
  - [x] level selector
  - [x] open cave gate
  - [x] show regular solids
  - [x] minimap
  - [x] caves selection system
  - [x] items
  - [x] prisoners

## story flow 

- [x] read history
- [x] level selector
- [x] listen socrates
- [x] walk between caves
- [ ] solve problems ( 11 types of quest )
  - [x] collect items
  - [x] release prisoners
  - [ ] earn score // lost score
  - [ ] solve quest under time frame

- [x] check items 
- [x] check prisoners
- [ ] ask help

## organize story flow

```jsx
const ({level, position}) = props;

<Story>
  <Speach monolog={monolog_1} />
  <WaitCloseSpeach />
  <Speach monolog={monolog_2} />
  <WaitCloseSpeach />
  <Speach monolog={monolog_3} />
  <WaitCloseSpeach />
  <PathRevealed />
</Story>

<Story>
  <Stage actor={avatar(level)} anim={anim.avatarFirstReveal} />
    <WaitStageOn />
  <Speach monolog={monolog.welcomeHero} />
    <WaitCloseSpeach />
  <Play quest={Enter} />
    <WaitQuestOver />
  <Walk to={area.Y} />
    <WaitArraiving />
  <Speach monolog={monolog.intro_2} />
    <WaitCloseSpeach />
  <Speach monolog={monologWithImage.duality} />
    <WaitCloseSpeach />
  <Speach monolog={monolog.wichRoad} />
    <WaitCloseSpeach />        
  <RoadRevealed />
    <WaitForNormalActions />
</Story>

<Story flow={story.goingToCaveSystem}>
  <Paralell>
    <Stage actor={avatar(level)} anim={anim.avatarFirstReveal} />
    <Stage actor={TopHeader} anim={anim.topHeaderReveal} />
  </Paralell>
  <Speach monolog={monolog.welcomeHero} />
  <Play quest={Enter} />
  <Walk to={area.Y} />
  <Speach monolog={monolog.intro_2} />
  <Speach monolog={monologWithImage.duality} />
  <Speach monolog={monolog.wichRoad} />
  <RoadRevealed />
  <ActivateNormalInteractions />
</Story>
```

### Story
```jsx
export default ({children, flow}) => {
  const [index, next] = useState(0);
  const Phase = children[index];
  return <Phase next={flow(next, index)} />;
}
```

>> enter
talk something
>> close talk
talk another
>> close talk
path revealed
>> take map
minimap functionality on
>> enter again 
>> take map // if forget


## preload images 

```jsx
img.match(/\/img\/[^\.]*\..../g).map(pic => `<link rel="preload" href="${pic}" as="image" >`).join('\n')
```

## timer 
```jsx
const {timer, pauseTimer, playTimer, itsOver, setPeriod} = useTimer();
```

## ramada solution for 3 gems game 
<https://ramdajs.com/repl/?v=0.26.1#?filter%28%28%7Blength%7D%29%20%3D%3Elength%20%3E%202%2C%0AgroupWith%28%28a%2Cb%29%20%3D%3E%20a%20%3D%3D%20b-1%2C%20%5B0%2C0%2C0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C8%2C9%2C10%2C10%2C11%2C12%5D%29%0A%29%0A%0A%0A%0A>
```jsx
  console.table(
    R.filter(
      ({length}) =>length > 2, 
      R.groupWith((a,b) => a == b-1, [0,0,0,1,2,3,5,6,7,8,8,9,10,10,11,12])
    )
  );
```