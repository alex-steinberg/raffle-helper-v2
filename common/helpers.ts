export interface Entry {
  entry_id: number;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export const drawWinners = (list: Entry[], quantity: number) => {
  const result = [];
  const clone = [...list];
  const drawRaffle = (entrants: Entry[]) => {
    const index = Math.floor(Math.random() * entrants.length);
    return {
      entrant: entrants[index],
      index,
    };
  };

  while (quantity > 0) {
    const { entrant: winner, index } = drawRaffle([...clone]);
    result.push(winner);
    quantity--;
    clone.splice(index, 1);
  }

  return result;
};
