import { 
  entrance, 
  cave_1_1, 
  cave_2_1, 
  cave_2_2, 
  cave_2_3, 
  cave_2_4, 
  cave_2_5, 
  cave_2_8, 
  cave_2_9, 
  cave_2_10, 
  cave_2_11,
  cave_2_12,
  cave_2_1_again, 
  finale 
} from "./applicationData";

export default [
  entrance.intro,
  entrance.mission,
  entrance.gratulation,
  
  cave_1_1.intro,
  cave_1_1.intro_2,
  cave_1_1.duality,
  cave_1_1.mission,

  cave_2_1.intro,
  cave_2_1.mission,
  cave_2_1.extraInfo,

  cave_2_2.intro,
  cave_2_2.mission,
  cave_2_2.info,
  cave_2_2.extraInfo,  

  cave_2_3.mission,
  cave_2_3.info,
  cave_2_3.extraInfo,  

  cave_2_4.mission,
  cave_2_4.info,
  cave_2_4.extraInfo,    

  cave_2_5.intro,

  cave_2_8.gratulation,

  cave_2_9.intro,
  cave_2_9.mission,
  cave_2_9.info,

  cave_2_10.intro,
  
  cave_2_11.intro,
  cave_2_11.mission[0],
  cave_2_11.mission[1],
  cave_2_11.mission[2],

  cave_2_12.intro,
  cave_2_12.mission,

  cave_2_1_again.intro,
  cave_2_1_again.mission[0],
  cave_2_1_again.mission[1],
  cave_2_1_again.mission[2],

  finale.intro,
  finale.PlatonMerit,
]