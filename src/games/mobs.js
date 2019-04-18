const mobsData = {
  knight       : {attack:8, skill:3, life:20, level:10 },
  spearman     : {attack:8, skill:0, life:20, level:10 },
  elf          : {attack:8, skill:0, life:15, level:10 },
  lifestealer  : {attack:7, skill:5, life:14, level:10 },
  paladin      : {attack:7, skill:7, life:18, level:10 },
}

export const mobs = Object.keys(mobsData)
  .map(key => [key, ({...mobsData[key], name:key })])
  .reduce((object, [key, value]) => ({...object, [key]:value}), {});
