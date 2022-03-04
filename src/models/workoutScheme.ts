import { Day } from "./day";

export class WorkoutScheme {
    public _id: string;
    public index: number;
    public guid: string;
    public isActive: boolean;
    public name: string;
    public about: string;
    public created: string;
    public tags: Array<string>;
    public schedule: Array<Day>;

    constructor(workoutScheme: any) {
        this._id = workoutScheme?.id ?? Date.now().toString();
        this.index = workoutScheme?.index ?? 0;
        this.guid = workoutScheme?.guid ?? Date.now().toString();
        this.isActive = workoutScheme?.isActive ?? false;
        this.name = workoutScheme?.name ?? "defaultName";
        this.about = workoutScheme?.about ?? "No description...";
        this.created = workoutScheme?.created ?? Date().toString();
        this.tags = workoutScheme?.tags ?? [];
        this.schedule = workoutScheme?.schedule ?? [];
    }
}