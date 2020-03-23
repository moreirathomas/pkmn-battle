// FACTORY FUNCTIONS
// factory function for the attack method that will be assigned to a pokemon object
const canAttack = pokemon => ({
  attack: move => {
    console.log(`${pokemon.name} uses ${move.name}!`);
    let damage = 0;
    let hp = pokemon.stats.hp;
    // chance of hit
    if (Math.random() * 100 < move.acc) {
      let rand = Math.random() * (1.0 - 0.85) + 0.85;

      console.log('It hits!');
      // actual Pokemon damage formula minus some modifiers
      damage = Math.round(
        (((pokemon.stats.lvl / 5 + 2) *
          move.power *
          (pokemon.stats.atk / pokemon.stats.def)) /
          50 +
          2) *
          rand
      );
      // chance of critical hit, actual Pokemon formula
      if (Math.random * 100 < pokemon.stats.spd / 512) {
        damage = damage * 2;
        console.log('A critical hit!');
      }
    } else console.log('But it misses!');
    hp -= damage;

    console.log(`Hit for ${damage} hp!`);
    console.log(`${pokemon.name} has ${hp}hp left!`);
    pokemon.stats.hp = hp;
    pokemon.hasFainted();
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

//
//
//
//
//
//

// TEST AREA

charmander.attack(charmander.moveset[1]);

charmander.attack(charmander.moveset[0]);

// while (charmander.hasFainted() === false) {
//   charmander.attack(charmander.moveset[0]);
// }
// strangely hasFainted() is called within this loop => 2 times the "Charmander can continue to battle!"/"Charmander has fainted!"
// charmander.hasFainted();
