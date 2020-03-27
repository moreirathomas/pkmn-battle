// Factory function for the moves
export const move = (name, type, power, acc) => {
  let state = { name, type, power, acc };
  return Object.assign(state);
};
