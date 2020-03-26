import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import GamesDashboardReducer from '../features/GamesDashboard/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  games: GamesDashboardReducer,
});

export default rootReducer;
