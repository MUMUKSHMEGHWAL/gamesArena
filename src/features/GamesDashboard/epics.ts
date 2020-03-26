import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import { fetchGamesAsync } from './actions';

export const loadGamesEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _state$, { api }) =>
  action$.pipe(
    filter(isActionOf(fetchGamesAsync.request)),
    switchMap(() =>
      from(api.GamesService.fetchGames()).pipe(
        map(fetchGamesAsync.success),
        catchError((message: string) => of(fetchGamesAsync.failure(message)))
      )
    )
  );
