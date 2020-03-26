// import { createSelector } from 'reselect';

import { GamesDashboardState } from './reducer';

export const getTodos = (state: GamesDashboardState) => state.data;
