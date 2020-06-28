
export class GameVersion {
    public readonly name: string;
    public readonly priority: number;
    public enabled: boolean;

    constructor(gameJson: any) {
        this.name = gameJson.name;
        this.priority = gameJson.priority;
        this.enabled = gameJson.enabled;
    }
}