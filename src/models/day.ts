import { Exercise } from "./exercise";

export class Day {
    public exercises: Array<Exercise>;
    public name: string;
    public status: string;

    constructor(day: any) {
        this.exercises = day?.exercises ?? [];
        this.name = day?.name ?? "defaultDayName";
        this.status = day?.status ?? "upcoming";
    }
}