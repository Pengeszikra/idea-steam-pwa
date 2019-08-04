export const rnd = amount => Math.random() * amount;
export const irnd = amount => rnd(amount) | 0;
export const shuffle = (a, b) => Math.random() > .5 ? -1 : 1;
