// Factory functions for creating the moves
export const move = (name, type, power, acc) => {
  let state = { name, type, power, acc };
  return Object.assign(state);
};
// Creating the moves
// export const tackle = move('Tackle', 'Normal', 35, 95);
// export const vinewhip = move('Vine Whip', 'Grass', 35, 95);
// export const scratch = move('Scratch', 'Normal', 40, 100);
// export const ember = move('Ember', 'Fire', 40, 100);
// export const watergun = move('Water Gun', 'Water', 40, 100);

// export { tackle, vinewhip, scratch, ember, watergun };
