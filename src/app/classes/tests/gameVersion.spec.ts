import { Character } from '../character';
import charJson from '../../../assets/settings/characters.json';
import gameJson from '../../../assets/settings/gameVersions.json';
import { GameVersion } from '../gameVersion';

describe('GameVersion', () => {
    const gameVersions: GameVersion[] = gameJson.games.map(game => new GameVersion(game));
    const characters: Character[] = charJson.characters.map(char => new Character(char));

    gameVersions.forEach(game => {
        it(`Game Version '${game.name}' should be present for at least one Character`, () => {
            expect(characters.map(char => char.gameName)).toContain(game.name, `'${game.name}' not not present in any character`);
        });
    });

    characters.forEach(char => {
        it(`Character '${char.name}' should have a valid game type`, () => {
            expect(gameVersions.map(game => game.name)).toContain(char.gameName, `'${char.name}' does not have a valid game type.`);
        });
    });
});