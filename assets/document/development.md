# iDea development

### Drag and Drop problem

Maybe some handmade solution will be usefull

- DragAndDropProvider
- draggable
- target

Jó kérdés, hogy miként lehet ezt optimálisan megoldani:

> react-dnd
over complicated, no hooks example

```jsx
// <DragAndDropProvider>

// <Draggable><SomeItem></Draggable>
export default DragSource(({dragProps, ...props}) => ());

export default DropTarget(({drag, ...props}) => {
  const dragState = useDragTarget();
  switch (dragState) {
    case isHover: return <TargetHoover {...props} />;
    case isDropped:  return <TargetDropped {...props} />;
    default return <Target {...props} />
  }  
});

// How connect to engine ?

export default DragSource(({drag, ...props}) => {
  const dragState = useDragSource();

  switch (dragState) {
    case isDragging: return <SourceDragging {...props} />;
    case isDropped:  return <SourceDropped {...props} />;
    default return <Source {...props} />
  }  
});
```

```jsx
// declarative example T1, T2, S1, S2, S3

rules (
  match(T1, oneOf(S1, S2)),
  match(T2, oneOf(S2, S3)),
  noneHoldSame(T1, T2),
  nonEmpty(T1, T2),
  solveUnder(50) // sec
)

// direct calculation
solveUnder(50)
  && isContain(T1, S1) || isContain(T1, S2)
  && isContain(T2, S2) || isContain(T2, S3)
  && contain(T1) !== contain(T2)
  && !contain(T1)
  && !contain(T2)
```

```jsx
// callbag stile
export default DropTarget(({drag, ...props}) => {
  // const dragState = useDragTarget();
  pipe (
    useDragState,
    forIf (isDragging) (<SourceDraqgging {...props}/>)
    forIf (isDragging) (<SourceDropped {...props}/>)
    forEach (<SourceIdle />)
  )     
});

```

<https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API>

|Event|	On Event Handler | Description  |
|-----|------------------|--------------|
|drag |	ondrag |	Fired when an element or text selection is being dragged. |
| dragend	| ondragend	| Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key). (See Finishing a Drag.) |
| dragenter	| ondragenter	| Fired when a dragged element or text selection enters a valid drop target. (See Specifying Drop Targets.) |
|dragexit	|ondragexit	|Fired when an element is no longer the drag operation's immediate selection target.|
|dragleave	|ondragleave	|Fired when a dragged element or text selection leaves a valid drop target.|
|dragover	|ondragover	|Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).|
|dragstart|ondragstart|	Fired when the user starts dragging an element or text selection. (See Starting a Drag Operation.)|
|drop	|ondrop|	Fired when an element or text selection is dropped on a valid drop target. (See Performing a Drop.)|

> Will be watch: [Fun-Fun-Function with Dan Abranow](https://www.youtube.com/watch?v=G-aO5hzo1aw&list=PL0zVEGEvSaeEh5lzJx9f5B7RVs1FrHgNf)

> [bestOfJavascript](https://bestofjs.org/)

> [react+three](https://github.com/drcmda/react-three-fiber)


### drag and drop system with reducer

jo kerdes hogy van-e ertelme reduceresre venni a figurat

```jsx
switch(state, {type, payload}) {
  case START_DRAG: return {...state, dragged: payload};
  case DROP: return {...state, hasValid: payload.target };
  default return state;
}

startDrag (item) |> store.dragged = item
hoverTarget (target, item) |> isValidTarget
drop (target, item) |> changeView(drop)
```