export class Set {
    public reps: number;
    public weight: number;
    public amrap: boolean;
    public completed: boolean;
    public success: boolean;

    constructor(set?: any) {    
        this.reps = set?.reps ?? 0;
        this.weight = set?.weight ?? 0;
        this.amrap = set?.amrap ?? false;
        this.completed = set?.completed ?? false;
        this.success = set?.success ?? false;
    }

}