const game = (playername, playerspeed, opponentname, opponentspeed) => {
  let state = {
    player: { playername, playerspeed },
    opponent: { opponentname, opponentspeed }
  };
  return Object.assign(state, canTakeTurn(state));
};

const canTakeTurn = game => ({
  whogoesfirst: () => {
    let first = game.player;
    console.log(first);
    let second = game.opponent;
    if (game.player.playerspeed < game.opponent.opponentspeed) {
      first = game.opponent.opponentname;
      second = game.player.playername;
    }
    console.log(`first to go is ${first} and second to go is ${second}`);
    return { first, second };
  },
  turn: () => {
    let first = game.whogoesfirst().first;
    let second = game.whogoesfirst().second;
    console.log(`${first} goes`);
    console.log(`then ${second} goes`);
  }
});

const thisbattle = game('charmander', 1, 'squirtle', 2);
console.log(thisbattle);
thisbattle.whogoesfirst();
thisbattle.turn();

const chooseAtTheStart = () => {
  // des prompt
  // return player et opponenent
};
const turn = (player, opponent) => {
  // choose an action
  // ai chooses an action
  // speed check
  // player.attack => hasfainted inside
  // ai.attack => hasfainted inside
}; // rinse and repeat

// eventuellement :
const gameee = () => {
  // call once chooseatthestart
  // call turn while no winner
};
