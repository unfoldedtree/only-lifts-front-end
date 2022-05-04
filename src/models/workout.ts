import user_data from "../../public/dev-data/user/user-data.json";
import workout_data from "../../public/dev-data/workouts/workout-data-starter.json";

export class Workout {
    public static getUserData() {
        const user = user_data.filter((it: any) => it._id === "61f9f4ca6fa95c5a635dc017")[0]
        return user;
    }

    public static getActiveProgram(user: any) {
        const activeProgram = workout_data.filter((it: any) =>  it._id === user.currentWorkoutProgramId)[0];
        return activeProgram;
    }

    public static getRelevantHistory(user: any, activeProgram: any) {
        const activeProgramWorkoutIds = activeProgram.schedule.map((it: any) => it._id);
        return user.workoutHistory
            .filter((it: any) => activeProgramWorkoutIds
                .includes(it._id))
            .sort((a: any, b:any) => a.finishedTimestamp > b.finishedTimestamp ? 1 : -1);
    }

    public static getRecentCycle(activeProgram: any, relevantHistory: any) {
        return relevantHistory.slice(0 - activeProgram.length)
    }

    public static calcRollingSchedule(schedule: any) {
        const authUser = Workout.getUserData();
        const activeProgram: any = Workout.getActiveProgram(authUser);
        const relevantWorkouts = Workout.getRelevantHistory(authUser, activeProgram);
        const recentCycle = Workout.getRecentCycle(activeProgram, relevantWorkouts);
        console.log("Recent Cycle: ", recentCycle);

        const newSchedule = this.computeSchedule(schedule, recentCycle);

        console.log("Rolling Schedule: ", newSchedule)

        return newSchedule
    }

    private static computeSchedule(schedule: any, recentCycle: any) {
        const recentCycleIds = recentCycle.map((it: any) => it._id);
        const filteredSchedule = schedule.filter((it: any) => recentCycleIds.includes(it._id));
        let newSchedule = schedule.filter((it: any) => !recentCycleIds.includes(it._id));
        const successfulLifts: any[] = [];

        recentCycle.forEach((day: any) => {
            const { lifts } = this.getSuccessfulLifts(day)
            successfulLifts.push(...lifts);
        })

        newSchedule = this.incrementLifts([ ...newSchedule, ...filteredSchedule], successfulLifts)

        return newSchedule
    }

    private static incrementLifts(schedule: any, lifts: any) {
        schedule.forEach((day: any) => {
            day.exercises.forEach((exercise: any) => {
                if (lifts.map((it: any) => it.name).includes(exercise.name)) {
                    const getLiftData = lifts.filter((it: any) => it.name == exercise.name)
                    exercise.sets.forEach((set: any) => {
                        set.weight = getLiftData[0].weight + (exercise.incrementScheme.weightIncrement)
                    })
                }
            })
        })

        return schedule
    }

    private static getSuccessfulLifts(day: any) {
        const successfulLifts: any[] = []

        day.exercises.forEach((exercise: any) => {
            if (exercise.success == true) {
                const liftObj = {
                    name: exercise.name,
                    weight: Math.max(...(exercise.sets.map((it: any) => it.weight)))
                }
                successfulLifts.push(liftObj)
            }
        });

        return { lifts: successfulLifts }
    }

    public static completeWorkout(schedule: any, workout: any) {
        workout.finishedTimestamp = Date.now();

        // Manipulations on recent cycle should be app global
        // const authUser = Workout.getUserData();
        // const activeProgram: any = Workout.getActiveProgram(authUser);
        // const relevantWorkouts = Workout.getRelevantHistory(authUser, activeProgram);
        // const recentCycle = Workout.getRecentCycle(activeProgram, relevantWorkouts);
        // recentCycle.push(workout);
        //
        // if (recentCycle.length > activeProgram.schedule.length) {
        //     recentCycle.shift();
        // }

        const newSchedule = this.computeSchedule(schedule, [workout]);

        console.log("New Rolling Schedule: ", newSchedule)

        return newSchedule;
    }

    // public static calcRollingSchedule(schedule: any) {
    //     schedule = JSON.parse(JSON.stringify(schedule))
    //     const successfulLifts: any[] = []
    //     let length = schedule.length
    //
    //     for (let i = 0; i < length; i++) {
    //         const day = JSON.parse(JSON.stringify(schedule[i]))
    //         if (day.status != "upcoming") {
    //             // schedule.splice(i, 1)
    //             const { lifts } = this.getSuccessfulLifts(day)
    //             successfulLifts.push(...lifts)
    //             day.status = 'upcoming'
    //             schedule.push(day)
    //             length--
    //         }
    //     }
    //
    //     schedule = this.incrementLifts(schedule, successfulLifts)
    //
    //     console.log("Rolling Schedule: ", schedule)
    //
    //     return schedule
    // }
    //
    // private static incrementLifts(schedule: any, lifts: any) {
    //     schedule.forEach((day: any) => {
    //         if (day.status == 'upcoming') {
    //             day.exercises.forEach((exercise: any) => {
    //                 if (lifts.map((it: any) => it.name).includes(exercise.name)) {
    //                     const getLiftData = lifts.filter((it: any) => it.name == exercise.name)
    //                     exercise.sets.forEach((set: any) => {
    //                         set.weight = getLiftData[0].weight + (exercise.incrementScheme.weightIncrement)
    //                     })
    //                 }
    //             })
    //         }
    //     })
    //
    //     return schedule
    // }
    //
    // private static getSuccessfulLifts(day: any) {
    //     const successfulLifts: any[] = []
    //
    //     day.exercises.forEach((exercise: any) => {
    //         if (exercise.success == true) {
    //             const liftObj = {
    //                 name: exercise.name,
    //                 weight: Math.max(...(exercise.sets.map((it: any) => it.weight)))
    //             }
    //             successfulLifts.push(liftObj)
    //         }
    //     });
    //
    //     return { lifts: successfulLifts }
    // }
    //
    // public static completeWorkout(schedule: any, workout: any) {
    //     schedule = JSON.parse(JSON.stringify(schedule))
    //     const foundIndex = schedule.findIndex((it: any) => it.name == workout.name)
    //     schedule[foundIndex] = workout
    //     // schedule.splice(foundIndex, 1)
    //     const day = JSON.parse(JSON.stringify(workout))
    //     day.status = 'upcoming'
    //     const { lifts } = this.getSuccessfulLifts(workout)
    //     schedule.push(day)
    //     schedule = this.incrementLifts(schedule, lifts)
    //
    //     return schedule
    // }
}