export class IncrementScheme {
    public weightIncrement: number;
    public firstRest: number;
    public secondRest: number;
    public failRest: number;
    public doubleReps: DoubleReps;

    constructor (scheme?: any) {
        this.weightIncrement = scheme?.weightIncrement ?? 5;
        this.firstRest = scheme?.firstRest ?? 60;
        this.secondRest = scheme?.secondRest ?? 90;
        this.failRest = scheme?.failRest ?? 180;
        this.doubleReps = new DoubleReps(scheme?.flag ?? false, scheme?.amount ?? this.weightIncrement * 2) 
    }
}

class DoubleReps {
    public flag: boolean;
    public amount: number;

    constructor (flag: boolean, amount: number) {
        this.flag = flag ?? false;
        this.amount = amount ?? 0;
    }
}