const chalk = require('chalk');

import { greenChalk, redChalk, blueChalk } from './chalk.js';
import { tackle, vinewhip, scratch, ember, watergun } from './move.js';

// Factory functions for creating the pokemons
export const pokemon = (
  name,
  type,
  lvl,
  hp,
  atk,
  def,
  spd,
  currentHp,
  chalk,
  ...moveset
) => {
  let state = {
    name,
    type,
    stats: { lvl, hp, atk, def, spd },
    currentHp,
    chalk,
    moveset
  };
  return Object.assign(state, canAttack(state), canFaint(state));
};

const canAttack = pokemon => ({
  target: enemy => {
    return enemy;
  },
  // could not find a way to extract the target from the attack method, if so i would have had the target method as the method created by the factory function canTarget()
  attack: (move, target) => {
    let enemy = pokemon.target(target);
    let damage = 0;
    // chance of hit
    if (Math.random() * 100 < move.acc) {
      let rand = Math.random() * (1.0 - 0.85) + 0.85;
      // actual damage formula minus some modifiers
      damage = Math.round(
        (((pokemon.stats.lvl / 5 + 2) *
          move.power *
          (enemy.stats.atk / enemy.stats.def)) /
          50 +
          2) *
          rand
      );
      // chance of critical hit, actual formula
      if (Math.random * 100 < pokemon.stats.spd / 512) {
        damage = damage * 2;
        console.log('A critical hit!');
      }
    } else console.log('But it misses!');

    console.log('It hits for ' + chalk.bold.dim(`${damage}`) + ' hp!');
    enemy.currentHp -= damage;
    console.log(`${enemy.chalk(enemy.name)} has ${enemy.currentHp} hp left.`);
    enemy.hasFainted();
  }
});

const canFaint = pokemon => ({
  hasFainted: () => {
    if (pokemon.currentHp <= 0) {
      console.log(`${pokemon.chalk(pokemon.name)} has fainted!`);
      return true;
    } else {
      return false;
    }
  }
});

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

// export { bulbasaur, charmander, squirtle };
