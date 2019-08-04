import divFactory, {showFactory} from '../utils/divFactory';

export const [HeaderBarSection, LevelOneAvatar, LevelTwoAvatar] = divFactory("header-bar", "lvl-1-char", "lvl-2-char");
export const [AvatarOneOnMap, AvatarTwoOnMap] = divFactory("lvl-1-char avatar-on-map", "lvl-2-char avatar-on-map");

export const [BottomBarSection, HistoryIcon] = divFactory("bottom-bar", "bottom-history");
export const [InventoryIcon, SavedIcon, MapIcon] = showFactory("bottom-inventory", "bottom-saved", "bottom-map");

export const [PlayCity, SmallLogo, HistorycalPapper]= divFactory("play-city", "small-logo", "history-papper");
export const [Socrates, SocratesAvatar, SpeakText, SocratesHolder]= divFactory("socrates-speaking", "socrates-avatar", "speak-text no-sel", "socrates-holder");

export const [BlueCave, RedCave, EntranceCave, LongCave] = divFactory("play-blue-cave", "play-red-cave", "entrance-cave", "long-cave");
export const [WaterFallCave, LightCave, FangCave] = divFactory("waterfall-cave", "light-cave", "fang-cave");
export const [StairCaseCave, NeedleCave] = divFactory("staircase-cave", "needle-cave");
export const [ChainCave, BuildingCave] = divFactory("chain-cave", "building-cave");
export const [WheelCave, EnginerCave] = divFactory("wheel-cave", "enginer-cave");
export const [RoadCave, BehindTheDoor] = divFactory("road-cave", "door-closed");

export const [InteractiveMap, MapCloseButton] = divFactory("interactive-map", "interactive-map-close");

export const [ActualScore, SavedPrisoner] = divFactory("actual-score", "saved-prisoner");

export const [Game1] = divFactory("game-1");

export const [Circle] = divFactory("circle");
export const [PrisonerOne] = divFactory("prisoner-1");
export const [ItemOne] = divFactory("item-1");
export const [SimpleDarkBg, Island] = divFactory("simple-dark-bg", "island");

export const [DarkGold, IntroButton, IntroHeader] = divFactory("dark-gold", "intro-button nosel", "intro-header no-sel");
export const [Adeimantosz, Glaukon] = divFactory("adeimantosz", "glaukon");

export const [GameHolder, OpenGameHolder] = divFactory("game-holder", "open-game-holder");

export const [
  PrisonerOnScene, 
  PrisonerCave, 
  PrisonerCaveRoute1, 
  PrisonerCaveRoute2
] = divFactory('prisoner-unsolved', 'prisoner-cave', 'prisoner-cave-r1', 'prisoner-cave-r2');

export const [RouteArrow] = divFactory('route-arrow');

export const [Version, IntroButtonHolder] = divFactory('version', 'intro-button-holder');

export const [Prisoner, Item] = divFactory('prisoner', 'item');

export const [
  QuestSketch,
  FoundCubeUvQuest,
  OpenCodeQuest,
  FoundAllProjectionQuest,
  SolidByProjectionQuest,
  FoundTetraederUvQuest,
  PointProjectionQuest,
  EquipmentQuest,
  RomanNumbers,
  ContinuosPathQuest,
  PipelineQuest,
  PairSolidToProjectionQuest,
  PairProjectionToSolidQuest,
] = divFactory('quest-sketch no-scroll', 'quest-found-cube-uv', 'open-code no-scroll', 'found-all-projection', 'solid-by-projectio',
'found-tetraeder-uv', 'point-projection', 'equipment-quest', 'roman-numbers', 'continuos-path', 'pipeline-quest',
'pair-solid-to-projection','pair-project-to-solid');

export const [GreekCity] = divFactory('greek-city no-scroll');

export const [CubeUv, CubeUvArea] = divFactory('cube-uv','cube-uv-area');

export const [GeomItem, TaskLabel, DropArea, ItemHolder, LabelHolder] = divFactory('geom-item', 'task-label', 'drop-target', 'item-holder', 'label-holder');

export const [ModalHolder, SmallTable, SmallButton] = divFactory('modal-holder no-scroll', 'small-table no-sel', 'small-button no-sel');

export const [RnHolder] = divFactory('rn-holder'); 

export const [InventoryBg, TeamsBg, SmallTableTalker ] = divFactory('inventory-bg', 'teams-bg', 'small-table-talker');

export const [PlayerInfoBackground, IngameHistory, RockFormation, TopRock] = showFactory('player-info-bg', 'ingame-history', 'rock-formation', 'top-rock-formation');

