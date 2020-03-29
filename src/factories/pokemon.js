// Factory function for the pokemons
const chalk = require('chalk');
import { hasWeakness } from './typeCheck';

const canAttack = pokemon => ({
  target: enemy => {
    return enemy;
  },
  attack: (move, target) => {
    let enemy = pokemon.target(target);
    let damage = 0;
    // chance of hit
    if (Math.random() * 100 < move.acc) {
      let rand = Math.random() * (1.0 - 0.85) + 0.85;
      let typeModifier = enemy.isWeakTo(move);
      // actual damage formula minus some modifiers
      damage = Math.round(
        (((pokemon.stats.lvl / 5 + 2) *
          move.power *
          (enemy.stats.atk / enemy.stats.def)) /
          50 +
          2) *
          rand *
          typeModifier
      );
      // chance of critical hit, actual formula
      if (Math.random * 100 < pokemon.stats.spd / 512) {
        damage = damage * 2;
        console.log('A critical hit!');
      }
    } else console.log('But it misses!');

    console.log('It hits for ' + chalk.bold.dim(`${damage}`) + ' hp!');
    enemy.currentHp -= damage;
    console.log(
      `${enemy.chalk(enemy.name)} has ${chalk.bold.dim(
        enemy.currentHp
      )} hp left.`
    );
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
  return Object.assign(
    state,
    canAttack(state),
    canFaint(state),
    hasWeakness(state)
  );
};
