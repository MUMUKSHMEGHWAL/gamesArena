import { compose } from 'redux';
// import { GameData } from '../features/GamesDashboard/types';

export const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// export const groupBy = (array: GameData[], key: string) => {
//     // Return the end result
//     return array.reduce((result, currentValue) => {
//       // This is how the above code in multiple line
//       if (!result[currentValue[key]]) {
//         result[currentValue[key]] = [];
//       }
//       result[currentValue[key]].push(currentValue);
//       return result;
//     }, {});
//   };
