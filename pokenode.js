// color for line output
const chalk = require('chalk');
const greenChalk = chalk.green;
const redChalk = chalk.red;
const blueChalk = chalk.cyan;
//

// CREATING FACTORY FUNCTIONS
// factory function for the attack method that will be assigned to a pokemon object
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

// factory function for checking if the pokemon has fainted
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
  return Object.assign(state, canAttack(state), canFaint(state));
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

// INITIALIZING THE GAME

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

const game = (player, opponent) => {
  let state = { player, opponent };
  return Object.assign(state, turnMechanics(state));
}; // ,gameMechanics(state)

//
// timer function
function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
//

const turnMechanics = game => ({
  // player choose an action
  playerMove: () => {
    let playerMove = Number(
      prompt(
        `Enter the number of the move ${game.player.chalk(
          game.player.name
        )} should use (0 for ${game.player.moveset[0].name} or 1 for ${
          game.player.moveset[1].name
        }): `
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
        `${game.player.chalk(game.player.name)} uses ${
          game.player.moveset[playerMove].name
        } against enemy ${game.opponent.chalk(game.opponent.name)}!`
      );
      game.playerAttack(playerMove);
      // await sleep(2000);
      console.log(
        `Enemy ${game.opponent.chalk(game.opponent.name)} uses ${
          game.opponent.moveset[opponentMove].name
        } against ${game.player.chalk(game.player.name)}!`
      );
      game.opponentAttack(opponentMove);
    } else {
      console.log(
        `Enemy ${game.opponent.chalk(game.opponent.name)} uses ${
          game.opponent.moveset[opponentMove].name
        } against ${game.player.chalk(game.player.name)}!`
      );
      game.opponentAttack(opponentMove);
      // await sleep(2000);
      console.log(
        `${game.player.chalk(game.player.name)} uses ${
          game.player.moveset[playerMove].name
        } against enemy ${game.opponent.chalk(game.opponent.name)}!`
      );
      game.playerAttack(playerMove);
    }
  }
});

// const gameMechanics = game => ({
//   play: (playerHp, opponentHp, counter) => {
//     let playerMove = game.playerMove();
//     let opponementMove = game.opponentMove();
//     let playerGoesFirst = game.speedCheck();
//     game.turnResolve(playerMove, opponementMove, playerGoesFirst);

//     counter++;
//     console.log(`turn #${counter}`);

//     if (playerHp > 0 && opponentHp > 0) {
//       setTimeout(() => game.play(), 1000);
//     }
//   }
// });

// STARTING THE GAME

chooseYourPokemon();
const battle = game(player, opponent);

while (player.currentHp > 0 && opponent.currentHp > 0) {
  let playerMove = battle.playerMove();
  let opponentMove = battle.opponentMove();
  let playerGoesFirst = battle.speedCheck();
  battle.turnResolve(playerMove, opponentMove, playerGoesFirst);
}

// battle.play(battle.player.currentHp, battle.opponent.currentHp, 0);

if (opponent.currentHp <= 0) {
  console.log('You won!');
} else if (player.currentHp <= 0) {
  console.log('You lose...');
}
// while(!opponent.hasFainted()) => hasFainted is called in the loop so 2 times the console.log()...
