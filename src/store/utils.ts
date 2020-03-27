import { compose } from 'redux';
import { GameData } from '../features/GamesDashboard/types';

export const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

interface PlaceFormData {
  [key: string]: GameData[];
}

export const groupByPlatForm = (array: GameData[]) => {
    // Return the end result
    return array.reduce((result: PlaceFormData, currentValue: GameData) => {
      // This is how the above code in multiple line
      if (!result[currentValue.platform]) {
        result[currentValue.platform] = [];
      }
      result[currentValue.platform].push(currentValue);
      return result;
    }, {});
  };
