export class Workout {
    public static calcRollingSchedule(schedule: any) {
        schedule = JSON.parse(JSON.stringify(schedule))
        const successfulLifts: any[] = []
        let length = schedule.length

        for (let i = 0; i < length; i++) {
            const day = JSON.parse(JSON.stringify(schedule[i]))
            if (day.status != "upcoming") {
                // schedule.splice(i, 1)
                const { lifts } = this.getSuccessfulLifts(day)
                successfulLifts.push(...lifts)
                day.status = 'upcoming'
                schedule.push(day)
                length--
            }
        }

        schedule = this.incrementLifts(schedule, successfulLifts)

        return schedule
    }

    private static incrementLifts(schedule: any, lifts: any) {
        schedule.forEach((day: any) => {
            if (day.status == 'upcoming') {
                day.exercises.forEach((exercise: any) => {
                    if (lifts.map((it: any) => it.name).includes(exercise.name)) {
                        const getLiftData = lifts.filter((it: any) => it.name == exercise.name)
                        exercise.sets.forEach((set: any) => {
                            set.weight = getLiftData[0].weight + (exercise.incrementScheme.weightIncrement)
                        })
                    }
                })
            }
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
        schedule = JSON.parse(JSON.stringify(schedule))
        const foundIndex = schedule.findIndex((it: any) => it.name == workout.name)
        schedule[foundIndex] = workout
        // schedule.splice(foundIndex, 1)
        const day = JSON.parse(JSON.stringify(workout))
        day.status = 'upcoming'
        const { lifts } = this.getSuccessfulLifts(workout)
        schedule.push(day)
        schedule = this.incrementLifts(schedule, lifts)

        return schedule
    }
}