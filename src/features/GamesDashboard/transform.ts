import { GameData } from './types';

export const sortData = (sortFilter: string, data: GameData[]) => {
  const gameData = data.slice();
  switch (sortFilter) {
    case 'score_low_to_high':
      return gameData.sort((game1: GameData , game2: GameData) => game1.score - game2.score);
    case 'score_high_to_low':
      return gameData.sort((game1: GameData , game2: GameData) => game2.score - game1.score);
    default:
      return gameData;
  }
};

export const filterData = (filterText: string, data: GameData[]) => {
  const gameData = data.slice();

  return gameData.filter((game: GameData) => game.title.toLocaleLowerCase().includes(filterText));
};
