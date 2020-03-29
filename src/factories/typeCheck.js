const chalk = require('chalk');
export const hasWeakness = pokemon => ({
  isWeakTo: move => {
    const types = [
      {
        type: 'Grass',
        weakness: 'Fire',
        effectiveness: 'Water'
      },
      {
        type: 'Fire',
        weakness: 'Water',
        effectiveness: 'Grass'
      },
      {
        type: 'Water',
        weakness: 'Grass',
        effectiveness: 'Fire'
      }
    ];
    let modifier = 1;
    for (let i = 0; i < types.length; i++) {
      if (
        move.type === types[i].type &&
        pokemon.type === types[i].effectiveness
      ) {
        console.log(chalk.bold.dim("It's super effective!"));
        modifier = 2;
      } else if (
        move.type === types[i].type &&
        pokemon.type === types[i].weakness
      ) {
        console.log(chalk.bold.dim("It's not very effective..."));
        modifier = 0.5;
      }
    }
    return modifier;
  }
});
// Could be done more elegantly...
