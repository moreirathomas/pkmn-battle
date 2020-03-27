import { greenChalk, redChalk, blueChalk } from './factories/chalk';
import { move } from './factories/move';
import { pokemon } from './factories/pokemon';

// Creating the moves and the pokemons
export const tackle = move('Tackle', 'Normal', 35, 95);
export const vinewhip = move('Vine Whip', 'Grass', 35, 95);
export const scratch = move('Scratch', 'Normal', 40, 100);
export const ember = move('Ember', 'Fire', 40, 100);
export const watergun = move('Water Gun', 'Water', 40, 100);

export const bulbasaur = pokemon(
  'Bulbasaur',
  'Grass',
  5,
  45,
  49,
  49,
  45,
  undefined,
  greenChalk,
  tackle,
  vinewhip
);
export const charmander = pokemon(
  'Charmander',
  'Fire',
  5,
  39,
  52,
  43,
  65,
  undefined,
  redChalk,
  scratch,
  ember
);
export const squirtle = pokemon(
  'Squirtle',
  'Water',
  5,
  44,
  48,
  65,
  43,
  undefined,
  blueChalk,
  tackle,
  watergun
);
