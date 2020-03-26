import { combineEpics } from 'redux-observable';

import * as todosEpics from '../features/GamesDashboard/epics';

export default combineEpics(...Object.values(todosEpics));
