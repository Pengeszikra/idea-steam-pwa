```jsx
const Application =  () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  
  useEffect(applicationLoop, [dispatch]);
  
  return (
    <ApplicationFrame appState={state} />         
  );
}

const SinglePageFrame = () => {
  const [page, setPage] = useState(landingPage)

  const pagesLookUp = {

    [landingPage]    : <LandingPage />
    ,
    [levelSelection] : <levelSelection />
    ,
    [adventures]     : <Adventures />
    ,
    [errorPage]      : <ErrorPage />

  }

  return pagesLookUp[page || errorPage];
}

const SinglePageFrame = () => {
  const [page, linkTo] = useRouter(landingPage);

  return (
    <>
      <LandingPage    route={'/'} />
      <LevelSelection route={'/level-selection'} />
      <Adventures     route={'/adventure'} />
    </>
  )
}
```

# FooStory

```jsx

const FooStory = ({script, state}) => {

  // story hold the actual timelines for proper Actor

  return (
    <ShowMustGoOn>
      <StaticBackground />      
      <Actor.Foo story={script.foo} />
      <Actor.Boo story={script.boo}  />
      <Actor.Mentor story={script.mentor} />
      <PathToNextArea story={script.pathToNextArea} />
    </ShowMustGoOn>
  );

  const booStoryDescription = [
    {play: animSequence.BooBlink, when: frequency.BooEyeMoveFreq },    
    {sequence: [
      {play: animSequence.BooSlideIn_22},    
      {talk: speach.BooScript_22, until: pressNext},    
      {play: animSequence.BooAtentionToFoo_22 },      
    ]},
  ];

  const pathToNextArea = [
    {wait: chitChatOver},
    {reveal: PathToNextArea.reveal}
  ]

  booStory = actualStateOf(booStoryDescription, state);
  
  <Actor.Boo story={booStory} />
}
```

## maybe with callbag