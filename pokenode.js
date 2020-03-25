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
    //   `${pokemon.colorChalk(pokemon.name)} is targeting ${enemy.name}.`
    // );
    return enemy;
  },
  // could not find a way to extract the target from the attack method, if so i would have had the target method as the method created by the factory function canTarget()
  attack: (move, target) => {
    let enemy = pokemon.target(target);
    console.log(
      `${pokemon.colorChalk(pokemon.name)} uses ${
        move.name
      } against enemy ${enemy.colorChalk(enemy.name)}!`
    );
    let damage = 0;
    let currentHp = enemy.stats.hp;
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
    currentHp -= damage;

    console.log(`It hits for ${damage} hp!`);
    console.log(`${enemy.colorChalk(enemy.name)} has ${currentHp}hp left.`);
    enemy.currentHp = currentHp;
    enemy.hasFainted();
    // should it return something ?
  }
});

// factory function for checking if the pokemon has fainted
const canFaint = pokemon => ({
  hasFainted: () => {
    if (pokemon.currentHp <= 0) {
      console.log(`${pokemon.colorChalk(pokemon.name)} has fainted!`);
      return true;
    } else {
      // console.log(
      //   `${pokemon.colorChalk(pokemon.name)} can continue to battle!`
      // );
      return false;
    }
  }
});

// // factory function for targeting an enemy
// const canTarget = pokemon => ({});

// factory function for the move objects that will be passed as args to the attack method
const move = (name, type, power, acc) => {
  let state = {
    name,
    type,
    power,
    acc
  };
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
  colorChalk,
  ...moveset
) => {
  let state = {
    name,
    type,
    stats: { lvl, hp, atk, def, spd },
    currentHp,
    colorChalk,
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
let promptedPokemon = '';
let promptedOpponent = '';
let promptedMove = '';
// getting the pokemons that will battle
function chooseYourPokemon() {
  promptedPokemon = prompt(
    `Enter the name of your Pokemon, either ${greenChalk(
      'Bulbasaur'
    )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
  );
  switch (promptedPokemon) {
    case 'Bulbasaur':
      promptedPokemon = bulbasaur;
      break;
    case 'Charmander':
      promptedPokemon = charmander;
      break;
    case 'Squirtle':
      promptedPokemon = squirtle;
      break;
    // default:
    //   break;
  }
  promptedOpponent = prompt(
    `Enter the name of the enemy Pokemon, either ${greenChalk(
      'Bulbasaur'
    )}, ${redChalk('Charmander')} or ${blueChalk('Squirtle')}: `
  );
  switch (promptedOpponent) {
    case 'Bulbasaur':
      promptedOpponent = bulbasaur;
      break;
    case 'Charmander':
      promptedOpponent = charmander;
      break;
    case 'Squirtle':
      promptedOpponent = squirtle;
      break;
    // default:
    //   break;
  }
  promptedPokemon.currentHp = promptedPokemon.stats.hp;
  promptedOpponent.currentHp = promptedOpponent.stats.hp;
  return promptedPokemon, promptedOpponent;
}
// choosing a move
function chooseYourMove() {
  promptedMove = Number(
    prompt(
      `Enter the number of the move ${promptedPokemon.colorChalk(
        promptedPokemon.name
      )} should use (0 or 1): `
    )
  );
  return promptedMove;
}
// taking a turn
function takeTurn() {
  chooseYourMove();

  promptedPokemon.attack(
    promptedPokemon.moveset[promptedMove],
    promptedOpponent
  );
}

// export everything
// module.exports = {
//   pokemon: pokemon(),
//   chooseYourPokemon: chooseYourPokemon(),
//   chooseYourMove: chooseYourMove(),
//   takeTurn: takeTurn(),
//   promptedPokemon,
//   promptedOpponent,
//   promptedMove,
//   bulbasaur,
//   charmander,
//   squirtle,
//   tackle,
//   vinewhip,
//   scratch,
//   ember,
//   watergun
// };

// // starting the game
chooseYourPokemon();

// while (promptedOpponent.currentHp > 0) {
//   takeTurn();
// }
// => currentHp set to undefined to start, so wont enter the loop at 1st => dowhile
do {
  takeTurn();
} while (promptedOpponent.currentHp > 0);
console.log('You won!');
// while(!promptedOpponent.hasFainted()) => hasFainted is called in the loop so 2 times the console.log()...

// TEST AREA
