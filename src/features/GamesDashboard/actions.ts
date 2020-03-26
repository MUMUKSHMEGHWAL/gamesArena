import { GameData } from './types';
import { createAsyncAction } from 'typesafe-actions';

export const fetchGamesAsync = createAsyncAction(
  'FETCH_GAMES_REQUEST',
  'FETCH_GAMES_SUCCESS',
  'FETCH_GAMES_FAILURE'
)<undefined, GameData[], string>();
