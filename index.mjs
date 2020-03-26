const chalk = require('chalk');
const prompt = require('prompt-sync')({ sigint: true });

// import { greenChalk, redChalk, blueChalk } from './scripts/chalk.js';
// import { tackle, vinewhip, scratch, ember, watergun } from './scripts/move.js';
// import { bulbasaur, charmander, squirtle } from './scripts/pokemon.mjs';

import {
  bulbasaur,
  charmander,
  squirtle,
  tackle,
  vinewhip,
  scratch,
  ember,
  watergun
} from './scripts/init.mjs';
import { chooseYourPokemon, player, opponent, game } from './scripts/game.mjs';

chooseYourPokemon();
const battle = game(player, opponent);

while (player.currentHp > 0 && opponent.currentHp > 0) {
  let playerMove = battle.playerMove();
  let opponentMove = battle.opponentMove();
  let playerGoesFirst = battle.speedCheck();
  battle.turnResolve(playerMove, opponentMove, playerGoesFirst);
}

if (opponent.currentHp <= 0) {
  console.log('You won!');
} else if (player.currentHp <= 0) {
  console.log('You lose...');
}
