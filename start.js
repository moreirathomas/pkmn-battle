import { game, selectPlayer, selectOpponent } from './src/gameMechanics';

// Starting the game
const player = selectPlayer();
const opponent = selectOpponent();
const battle = game(player, opponent);
// console.log(battle);

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
