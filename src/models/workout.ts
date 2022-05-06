import user_data from "../../public/dev-data/user/user-data.json";
import workout_data from "../../public/dev-data/workouts/workout-data-starter.json";
import {workoutStore} from "@/stores/workoutInfo";
import {timerStore} from "@/stores/timer";

export class Workout {
    public static getUserData() {
        const user = user_data[0]
        return user;
    }

    public static getActiveProgram(user: any) {
        if (user.currentWorkoutProgramId) {
            return workout_data.filter((it: any) =>  it._id === user.currentWorkoutProgramId)[0];
        } else {
            return null;
        }
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
        const recentCycle = workoutStore.state.recentCycle;
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
        const recentCycle = workoutStore.state.recentCycle;
        recentCycle.push(workout);

        if (recentCycle.length > schedule.length) {
            recentCycle.shift();
        }

        const newSchedule = this.computeSchedule(schedule, [workout]);

        workoutStore.commit("setRecentCycle", recentCycle);
        workoutStore.commit("setWorkoutHistory", workout);

        console.log("New Rolling Schedule: ", newSchedule)

        return newSchedule;
    }
}