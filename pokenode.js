// color for line output
const chalk = require('chalk');
const greenChalk = chalk.green;
const redChalk = chalk.red;
const blueChalk = chalk.blue;
//

// CREATING FACTORY FUNCTIONS
// factory function for the attack method that will be assigned to a pokemon object
const canAttack = pokemon => ({
  target: enemy => {
    // console.log(
    //   `${pokemon.chalk(pokemon.name)} is targeting ${enemy.name}.`
    // );
    return enemy;
  },
  // could not find a way to extract the target from the attack method, if so i would have had the target method as the method created by the factory function canTarget()
  attack: (move, target) => {
    let enemy = pokemon.target(target);
    console.log(
      `${pokemon.chalk(pokemon.name)} uses ${
        move.name
      } against enemy ${enemy.chalk(enemy.name)}!`
    );
    let damage = 0;
    // let currentHp = enemy.stats.hp;
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

    console.log(`It hits for ${damage} hp!`);
    enemy.currentHp -= damage;
    console.log(`${enemy.chalk(enemy.name)} has ${enemy.currentHp}hp left.`);
    // enemy.currentHp = currentHp;
    enemy.hasFainted();
    // should it return something ?
  }
});

// factory function for checking if the pokemon has fainted
const canFaint = pokemon => ({
  hasFainted: () => {
    if (pokemon.currentHp <= 0) {
      console.log(`${pokemon.chalk(pokemon.name)} has fainted!`);
      return true;
    } else {
      // console.log(
      //   `${pokemon.chalk(pokemon.name)} can continue to battle!`
      // );
      return false;
    }
  }
});

// // factory function for targeting an enemy
// const canTarget = pokemon => ({});

// factory function for the move objects that will be passed as args to the attack method
const move = (name, type, power, acc) => {
  let state = { name, type, power, acc };
  return Object.assign(state);
};

// factory function for the pokemon objects that are assigned several methods
const pokemon = (
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
    canFaint(state)
    // canTarget(state)
  );
};

// DEFINING THE OBJECTS USED
// difining the moves
const tackle = move('Tackle', 'Normal', 35, 95);
const vinewhip = move('Vine Whip', 'Grass', 35, 95);
const scratch = move('Scratch', 'Normal', 40, 100);
const ember = move('Ember', 'Fire', 40, 100);
const watergun = move('Water Gun', 'Water', 40, 100);

// defining the pokemons
const bulbasaur = pokemon(
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
const charmander = pokemon(
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
const squirtle = pokemon(
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
//

//

// GETTING USER INPUT
const prompt = require('prompt-sync')({ sigint: true });
// initializing the variables to be accessed globaly
let player = '';
let opponent = '';
// getting the pokemons that will battle
function chooseYourPokemon() {
  player = prompt(
    `Enter the name of your Pokemon, either ${greenChalk(
      'Bulbasaur'
    )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
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
  opponent = prompt(
    `Enter the name of the enemy Pokemon, either ${greenChalk(
      'Bulbasaur'
    )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
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
  player.currentHp = player.stats.hp;
  opponent.currentHp = opponent.stats.hp;
  return player, opponent;
}

// choosing a move
// function selectMove() {
//   promptedMove = Number(
//     prompt(
//       `Enter the number of the move ${player.chalk(
//         player.name
//       )} should use (0 or 1): `
//     )
//   );
//   return promptedMove;
// }

// taking a turn
// function takeTurn() {
//   selectMove();

//   player.attack(player.moveset[promptedMove], opponent);
// }

// INITIALIZING THE GAME
const game = (player, opponent) => {
  let state = { player, opponent };
  return Object.assign(state, turnMechanics(state));
};

// const chooseYourPokemon = () => ({
//   player: () => {
//     let player = undefined;
//     prompt(
//       `Enter the name of your Pokemon, either ${greenChalk(
//         'Bulbasaur'
//       )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
//     );
//     switch (player) {
//       case 'Bulbasaur':
//         player = bulbasaur;
//         break;
//       case 'Charmander':
//         player = charmander;
//         break;
//       case 'Squirtle':
//         player = squirtle;
//         break;
//       // default:
//       //   break;
//     }
//     player.currentHp = player.stats.hp;
//     return player;
//   },
//   opponent: () => {
//     let opponent = undefined;
//     prompt(
//       `Enter the name of the enemy Pokemon, either ${greenChalk(
//         'Bulbasaur'
//       )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
//     );
//     switch (opponent) {
//       case 'Bulbasaur':
//         opponent = bulbasaur;
//         break;
//       case 'Charmander':
//         opponent = charmander;
//         break;
//       case 'Squirtle':
//         opponent = squirtle;
//         break;
//       // default:
//       //   break;
//     }
//     opponent.currentHp = opponent.stats.hp;
//     return opponent;
//   }
// });

const turnMechanics = game => ({
  // player choose an action
  playerMove: () => {
    let playerMove = Number(
      prompt(
        `Enter the number of the move ${game.player.chalk(
          game.player.name
        )} should use (0 or 1): `
      )
    );
    return playerMove;
  },
  // ai chooses an action
  opponentMove: () => {
    let opponentMove = Math.round(Math.random()); // 0 or 1
    return opponentMove;
  },
  playerAttack: playerMove => {
    game.player.attack(game.player.moveset[playerMove], game.opponent);
  },
  opponentAttack: opponentMove => {
    game.opponent.attack(game.opponent.moveset[opponentMove], game.player);
  },
  // who goes first
  speedCheck: () => {
    let playerGoesFirst = true;
    if (game.player.stats.spd < game.opponent.stats.spd) {
      playerGoesFirst = false;
    }
    return playerGoesFirst;
    // let order = [
    //   { pokemon: undefined, move: undefined },
    //   { pokemon: undefined, move: undefined }
    // ];
    // if (game.player.stats.spd > game.opponent.stats.spd) {
    //   order[0].pokemon = game.player;
    //   order[0].move = game.playerMove;
    //   order[1].pokemon = game.opponent;
    //   order[1].move = game.opponentMove;
    // }
    // return order;
  },
  turnResolve: (playerMove, opponementMove, playerGoesFirst) => {
    // game.order[0].pokemon.attack(
    //   game.order[0].pokemon.moveset[game.order[0].move],
    //   game.order[1].pokemon
    // );
    // game.order[1].pokemon.attack(
    //   game.order[1].pokemon.moveset[game.order[1].move],
    //   game.order[0].pokemon
    // );
    if (playerGoesFirst === true) {
      game.playerAttack(playerMove);
      game.opponentAttack(opponementMove);
    } else {
      game.opponentAttack(opponementMove);
      game.playerAttack(playerMove);
    }
  }
});

// STARTING THE GAME
chooseYourPokemon();
const thishopefullyworkinggame = game(player, opponent);
console.log(thishopefullyworkinggame);

// while (opponent.currentHp > 0) {
//   takeTurn();
// }
// => currentHp set to undefined to start, so wont enter the loop at 1st => dowhile
do {
  let playerMove = thishopefullyworkinggame.playerMove();
  console.log(playerMove);
  let opponementMove = thishopefullyworkinggame.opponentMove();
  console.log(opponementMove);

  let playerGoesFirst = thishopefullyworkinggame.speedCheck();
  console.log(playerGoesFirst);

  thishopefullyworkinggame.turnResolve(
    playerMove,
    opponementMove,
    playerGoesFirst
  );
} while (opponent.currentHp > 0);
console.log('You won!');
// while(!opponent.hasFainted()) => hasFainted is called in the loop so 2 times the console.log()...
