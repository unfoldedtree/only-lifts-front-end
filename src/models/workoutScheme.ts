import { Day } from "./day";

export class WorkoutScheme {
    public id: string;
    public index: number;
    public guid: string;
    public isActive: boolean;
    public name: string;
    public description: string;
    public created: string;
    public tags: Array<string>;
    public schedule: Array<Day>;

    constructor(workoutScheme: any) {
        // this._id = workoutScheme?.id ?? Date.now().toString();
        this.id = workoutScheme?.id;
        this.index = workoutScheme?.index ?? 0;
        this.guid = workoutScheme?.guid ?? Date.now().toString();
        this.isActive = workoutScheme?.isActive ?? false;
        this.name = workoutScheme?.name ?? "";
        this.description = workoutScheme?.description ?? "";
        this.created = workoutScheme?.created ?? Date().toString();
        this.tags = workoutScheme?.tags ?? [];
        this.schedule = workoutScheme?.schedule ?? [];
    }

    public static empty() {
        return new WorkoutScheme({})
    }
}