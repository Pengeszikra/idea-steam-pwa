# IDEA - road to run

## main goals
  - [x] collect game types
  - [x] collect unique interaction / animation
  - [ ] exact game flow without correct games
    - [x] draw new cave routes
  - [ ] solve all game types
  - [ ] game flow
    - [ ] score system
    - [ ] collect items
    - [ ] release slaves
  - [ ] sparate document md show parts

## minor goals
  - [x] prevent IOS page over scrolling
  - [ ] fix fonts on IOS
  - [ ] preload images
  - [ ] folder structure refact
  - [x] automatic speak height
  - [x] extend avatar selection with text

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
  - [ ] open cave gate
  - [ ] show regular solids
  - [ ] minimap
  - [ ] caves selection system
  - [ ] items
  - [ ] slaves

## story flow 

- read history
- level selector
- listen socrates

- walk between caves

- solve problems ( 11 types of quest )
  - collect items
  - release prisoners
  - earn score // lost score

- check items / prisoners

- ask help

## organize 

```jsx
Frame() => {
  return (
    <main>
      <Scenes />
      <SocratesSpeaking />
      <BottomBar />
      <HeaderBar />
      <MapWithHero />
    </main>
  )
}

// Quest is a special scene with interaction

Quest({interaction, view, level, ...props}) => {
  const {walk, socrates, collect, release, earnScore} = interaction;
  const {Prisoner, Items, Paths, CaveBackgroundByQuest} = view;
    
  return (
    <CaveBackgroundByQuest>
      <Paths /> 
      <Items />
      <Prisoner />      
    </CaveBackgroundByQuest>
  )
}
```

```jsx 
```