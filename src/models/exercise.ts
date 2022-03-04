import { Set } from "@/models/set";
import { IncrementScheme } from "./incrementScheme";

export class Exercise {
    public name: string;
    public success: boolean;
    public sets: Set[];
    public incrementScheme: IncrementScheme;


    constructor(exercise: any) {
        this.name = exercise?.name ?? "defaultName";
        this.success = exercise?.success ?? false;
        this.sets = [];
        this.incrementScheme = new IncrementScheme();

        if (exercise.sets) {
            exercise.set.forEach((set: any) => {
                exercise.addSet(set);
            })
        }
    }

    public addSet(set: any) {
        this.sets.push(new Set(set));
    }

    public addIncrementScheme(scheme: any) {
        this.incrementScheme = new IncrementScheme(scheme);
    }
}