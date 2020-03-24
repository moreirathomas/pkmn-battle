// CREATING FACTORY FUNCTIONS
// factory function for the attack method that will be assigned to a pokemon object
const canAttack = pokemon => ({
  target: opponent => {
    console.log(`${pokemon.name} is targeting ${opponent.name}.`);
    return opponent;
  },
  // could not find a way to extract the target from the attack method, if so i would have had the target method as the method created by the factory function canTarget()
  attack: (move, target) => {
    let opponent = pokemon.target(target);
    console.log(
      `${pokemon.name} uses ${move.name} against enemy ${opponent.name}!`
    );
    let damage = 0;
    let hp = opponent.stats.hp;
    // chance of hit
    if (Math.random() * 100 < move.acc) {
      let rand = Math.random() * (1.0 - 0.85) + 0.85;
      // actual damage formula minus some modifiers
      damage = Math.round(
        (((pokemon.stats.lvl / 5 + 2) *
          move.power *
          (opponent.stats.atk / opponent.stats.def)) /
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
    hp -= damage;

    console.log(`It hits for ${damage} hp!`);
    console.log(`${opponent.name} has ${hp}hp left.`);
    opponent.stats.hp = hp;
    opponent.hasFainted();
    // should it return something ?
  }
});

// factory function for checking if the pokemon has fainted
const canFaint = pokemon => ({
  hasFainted: () => {
    if (pokemon.stats.hp <= 0) {
      console.log(`${pokemon.name} has fainted!`);
      return true;
    } else {
      console.log(`${pokemon.name} can continue to battle!`);
      return false;
    }
  }
});

// // factory function for targeting an opponent
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
const pokemon = (name, type, lvl, hp, atk, def, spd, ...moveset) => {
  let state = {
    name,
    type,
    stats: { lvl, hp, atk, def, spd },
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
  tackle,
  watergun
);

// GETTING USER INPUT
const prompt = require('prompt-sync')({ sigint: true });
// initializing the variables to be accessed globaly
let promptedPokemon = '';
let promptedOpponent = '';
let promptedMove = '';
// getting the pokemons that will battle
function chooseYourPokemon() {
  promptedPokemon = prompt(
    'Enter the name of your Pokemon, either Bulbasaur, Charmander or Squirtle: '
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
    'Enter the name of the enemy Pokemon, either Bulbasaur, Charmander or Squirtle :'
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
  return promptedPokemon, promptedOpponent;
}
// choosing a move
function chooseYourMove() {
  promptedMove = Number(
    prompt(
      `Enter the number of the move ${promptedPokemon} should use (0 or 1): `
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

// starting the game
chooseYourPokemon();

while (promptedOpponent.stats.hp > 0) {
  takeTurn();
}

// TEST AREA

// charmander.target(bulbasaur);

// charmander.attack(charmander.moveset[1], bulbasaur);

// charmander.attack(charmander.moveset[0], bulbasaur);

// while (charmander.hasFainted() === false) {
//   charmander.attack(charmander.moveset[0]);
// }
// strangely hasFainted() is called within this loop => 2 times the "Charmander can continue to battle!"/"Charmander has fainted!"
// charmander.hasFainted();
