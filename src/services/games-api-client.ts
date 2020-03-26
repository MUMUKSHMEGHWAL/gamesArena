import { GameData } from '../features/GamesDashboard/types';
import urls, {baseUrl} from './apiEndPoints';

export function fetchGames(): Promise<GameData[]> {
  return fetch(`${baseUrl}${urls.gamesDashboard.fetch}`).then(res => res.json());
}
