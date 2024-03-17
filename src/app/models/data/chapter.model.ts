import { Game } from './game.model';

export interface Chapter {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  offset: number;
  duration: number;
  game: Game;
}
