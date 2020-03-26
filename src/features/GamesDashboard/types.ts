  export type Todo = {
    id: string;
    title: string;
  };

  export interface GameData {
    title: string;
    platform: string;
    editors_choice: string;
    genre: string;
    score: number;
  }

  export interface SortOption {
    value: string;
    label: React.ReactNode;
  }
