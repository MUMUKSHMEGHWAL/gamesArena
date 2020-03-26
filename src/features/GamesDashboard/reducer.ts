import { GameData } from './types';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
// import mock from '../../mock-json';

import { fetchGamesAsync } from './actions';

export const isLoadingGames = createReducer(false as boolean)
  .handleAction([fetchGamesAsync.request], (_state, _action) => true)
  .handleAction(
    [fetchGamesAsync.success, fetchGamesAsync.failure],
    (_state, _action) => false
  );

export const data = createReducer([] as GameData[])
  .handleAction(
    fetchGamesAsync.success,
    (_state, action) => action.payload.filter((game: GameData) =>
    game.score && game.title && game.editors_choice && game.genre && game.platform ));

const GamesDashboardReducer = combineReducers({
  isLoadingGames,
  data,
});

export default GamesDashboardReducer;
export type GamesDashboardState = ReturnType<typeof GamesDashboardReducer>;
