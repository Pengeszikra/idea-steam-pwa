const figures = {
  paralelogramma : "paralelogramma",
  circle : "circle",
  box : "box",
  brick : "brick",
  fineTrinagle : "fine-trinagle",
  rombusz : "rombusz",
  conerTrinagle : "corner-trinagle",
  twoTrinagle : "2-trinagle",
  fourCorner : "4-corner",
  deltoid : "deltoid",
  fineRombusz : "fine-rombusz",
}

export const taskSetups = [
  [ // level 0
    {
      labels   : [], 
      shapes   : [],
      solution : [],
    } 
  ], 
  [   // level 1
    {
      labels   : ['Csúcsok száma: III.', 'Csúcsok száma: IV.', 
                  'Van derékszöge', 'Nincs derékszöge'],
      shapes   : [figures.box, figures.conerTrinagle, figures.fineTrinagle, figures.paralelogramma],
      solution : [figures.conerTrinagle, figures.box, figures.fineTrinagle, figures.paralelogramma],
    },
    {
      labels   : ['Minden oldala egyenlő', 'Nem minden oldala egyenlő', 
                  'Minden szöge egyenlő', 'Nem minden szöge egyenlő'],
      shapes   : [figures.box, figures.paralelogramma, figures.brick, figures.rombusz],
      solution : [figures.box, figures.brick, figures.paralelogramma, figures.rombusz],
    },
    {
      labels   : ['Van párhuzamos oldala', 'Nincs párhuzamos oldala', 
                  'Van derékszöge', 'Nincs derékszöge'],
      shapes   : [figures.rombusz, figures.fineTrinagle, figures.conerTrinagle, figures.brick],
      solution : [figures.brick, figures.conerTrinagle, figures.rombusz, figures.fineTrinagle],
    },
  ]
  ,
  [   // level 2
    {
      labels   : ['Minden oldala egyenlő', 'Nem minden oldala egyenlő', 
                  'Minden szöge egyenlő', 'Nem minden szöge egyenlő'],
      shapes   : [figures.fineTrinagle, figures.paralelogramma, figures, figures],
      solution : [figures, figures, figures, figures],
    },
    {
      labels   : ['Van II. egyenlő oldala', 'Nincs II. egyenlő oldala', 
                  'Minden szöge egyenlő', 'Nem minden szöge egyenlő'],
      shapes   : [figures, figures, figures, figures],
      solution : [figures, figures, figures, figures],
    },
    {
      labels   : ['Van II. egyenlő szöge', 'Nincs II. egyenlő szöge', 
                  'Van II. párhuzamos oldala', 'Nincs II. párhuzamos oldala'],
      shapes   : [figures, figures, figures, figures],
      solution : [figures, figures, figures, figures],
    },
  ]
]