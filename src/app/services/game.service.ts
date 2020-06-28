import { Injectable } from '@angular/core';
import gamesJson from '../../assets/settings/gameVersions.json';
import { GameVersion } from '../classes/gameVersion';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public games = new Map<string, GameVersion>();

  constructor() {
    const tempGames = new Map<string, GameVersion>();
    gamesJson.games.forEach(game => {
      console.log(game);
      tempGames.set(game.name, new GameVersion(game));
    });
    this.games = tempGames;
    console.log(this.games);
  }
}
