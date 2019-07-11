# IDEA - road to run

## main goals
  - [x] collect game types
  - [x] collect unique interaction / animation
  - [ ] exact game flow without correct games
    - [x] draw new cave routes
    - [x] walk between caves and corssroads
    - [ ] mock game types
  - [ ] solve all game types
  - [ ] story flow
    - [x] story reducer
    - [ ] score system
    - [x] collect items
    - [x] release prisoners
  - [x] sparate document md show parts

## minor goals
  - [x] prevent IOS page over scrolling
  - [ ] fix fonts on IOS
  - [ ] preload images
  - [x] folder structure refact // too much folder names
  - [x] separate _plan
  - [x] automatic speak height
  - [x] extend avatar selection with text
  - [x] prisoners in caves
  - [x] items in caves
  - [x] version info on intro page

## game types:
  - [ ] open cave system : drag and drop correct shape by matrix
  - [ ] 3D - find regular solids projection in matrix
  - [ ] 3D - find solid for 2 projection
  - [ ] 3D/2D - select matrix wich hold solid UV map ( cube, tetrahedron )
  - [ ] 3D - turn tile of uv map
  - [ ] 3D - show uv and select correct fallen solid, time quest
  - [ ] 3D - select projection from point for showed solid 2.9
  - [ ] roman number order game :: 2.10
      <http://www.ngkszki.hu/~trembe/primek/prim01.htm>
      <http://www.betonopus.hu/notesz/mertekegyseg/romaiszam.htm>
  - [ ] quest of items :: 2.11
  - [ ] link of routes :: 2.12
  - [ ] rain of caves :: 3

## unique interaction / animation
  - [ ] history reader
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