// Factory function for the game
const prompt = require('prompt-sync')({ sigint: true });
const chalk = require('chalk');
import { greenChalk, redChalk, blueChalk } from './factories/chalk';
import { bulbasaur, charmander, squirtle } from './gameInit';

export function selectPlayer() {
  console.log('Choose your Pokemon!');
  let player = prompt(
    `Enter either ${greenChalk('Bulbasaur')}, ${redChalk(
      'Charmander'
    )} or ${blueChalk('Squirtle')}: `
  );
  switch (player) {
    case 'Bulbasaur':
      player = bulbasaur;
      break;
    case 'Charmander':
      player = charmander;
      break;
    case 'Squirtle':
      player = squirtle;
      break;
    // default:
    //   break;
  }
  player.currentHp = player.stats.hp;
  return player;
}
export function selectOpponent() {
  console.log('Choose the enemy Pokemon!');
  let opponent = prompt(
    `Enter either ${greenChalk('Bulbasaur')}, ${redChalk(
      'Charmander'
    )} or ${blueChalk('Squirtle')}: `
  );
  switch (opponent) {
    case 'Bulbasaur':
      opponent = bulbasaur;
      break;
    case 'Charmander':
      opponent = charmander;
      break;
    case 'Squirtle':
      opponent = squirtle;
      break;
    // default:
    //   break;
  }
  opponent.currentHp = opponent.stats.hp;
  return opponent;
}
const turnMechanics = game => ({
  // player choose an action
  playerMove: () => {
    console.log(`\n\nWhat should ${game.player.chalk(game.player.name)} do? `);
    let playerMove = Number(
      prompt(
        `Enter ${chalk.bold.dim(0)} for ${
          game.player.moveset[0].name
        } or ${chalk.bold.dim(1)} for ${game.player.moveset[1].name}: `
      )
    );
    return playerMove;
  },
  // ai chooses an action
  opponentMove: () => {
    let opponentMove = Math.round(Math.random()); // 0 or 1
    return opponentMove;
  },
  playerAttack: /*async*/ playerMove => {
    game.player.attack(game.player.moveset[playerMove], game.opponent);
    // await sleep(1500);
  },
  opponentAttack: /*async*/ opponentMove => {
    game.opponent.attack(game.opponent.moveset[opponentMove], game.player);
    // await sleep(1500);
  },
  // who goes first
  speedCheck: () => {
    let playerGoesFirst = true;
    if (game.player.stats.spd < game.opponent.stats.spd) {
      playerGoesFirst = false;
    }
    return playerGoesFirst;
  },
  turnResolve: /*async*/ (playerMove, opponentMove, playerGoesFirst) => {
    if (playerGoesFirst === true) {
      console.log(
        `\n${game.player.chalk(game.player.name)} uses ${
          game.player.moveset[playerMove].name
        } against enemy ${game.opponent.chalk(game.opponent.name)}!`
      );
      game.playerAttack(playerMove);
      // await sleep(2000);
      console.log(
        `\nEnemy ${game.opponent.chalk(game.opponent.name)} uses ${
          game.opponent.moveset[opponentMove].name
        } against ${game.player.chalk(game.player.name)}!`
      );
      game.opponentAttack(opponentMove);
    } else {
      console.log(
        `\nEnemy ${game.opponent.chalk(game.opponent.name)} uses ${
          game.opponent.moveset[opponentMove].name
        } against ${game.player.chalk(game.player.name)}!`
      );
      game.opponentAttack(opponentMove);
      // await sleep(2000);
      console.log(
        `\n${game.player.chalk(game.player.name)} uses ${
          game.player.moveset[playerMove].name
        } against enemy ${game.opponent.chalk(game.opponent.name)}!`
      );
      game.playerAttack(playerMove);
    }
  }
});
export const game = (player, opponent) => {
  let state = { player, opponent };
  return Object.assign(state, turnMechanics(state));
};
