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
It is another story

# Form based application build with React-X
betaSelection depend on alphaSelecion and ctaButton eneabled when each fields are valid.
Maybe the reducer will be complex with tons of decupling, but the render section keep clear as possible.

So basic concept could be seems like this:

```jsx

// state 

selectors : {
  alpha : {
    options: alphaDefaultOptions
    value: alphaDefaultOptions[0]
  },
  beta : {
    options: betaDefaultOptions
    value: betaDefaultOptions[0]
  },  
}

// actions / reducers
// custom reducer parts with business logic
const selectorsChange = ({selectorId, option}, state) => {
  // special case, maybe sage give beeter solution
  if (selectorId === alphaSelectorId) {
    const alphaMod = selectorChanged(selectorId, option);
    const options = betaOptionsByAlpha(alphaMod);
    const value = options.hasContent(state.value) ? state.value : options[0];
    const betaMod = {[betaSelectorId]: {options, value} };
    return {...state, selectors : {...state.selectors, ...alphaMod, ...betaMod}}  
  }

  return {...state, selectors : {...state.selectors,...selectorChanged(selectoreId, option)}}
}

// reducer
(state, {type, payload}) => {
  switch(type) {
    case SELECT_CHANGE: return selectorsChange(payload, state);
    case INPUT_CHANGE: return inputsChange(payload, state);
    case BUTTON_CHANGE: return buttonChange(payload, state);
    default: return state;
  }
}

// view
export default FooForm ({formState, handlers}) {
  const {firstInput, alphaSelection, betaSelection, ctaButton} = formState;
  const {handleInput, handleSelection, handleButton} = handlers;

  return (
    <Form ref={fooForm} style={combinedStyles(formStyle, fooFormStyleState)}>
      <Input data={firstInput} handle={handleInput} />
      <Selection data={alphaSelection} handle={handleSelection} style={selectionStyle} />
      <Selection data={betaSelection} handle={handleSelection} />
      <Button data={ctaButton} handle={handleButton} style={ctaButtonStyle} />
    </Form>
  );
}

// call
<FooForm formState={fooFormState} handlers={{fooHandlers}} />
```