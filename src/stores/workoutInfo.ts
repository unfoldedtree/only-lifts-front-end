import { createStore } from 'vuex';
import { Workout } from "@/models/workout";
// import workout_data from '../../public/dev-data/workouts/workout-data-starter.json';
// import user_data from '../../public/dev-data/user/user-data.json';

export const workoutStore = createStore({
  state() {
    return {
      workouts: [],
      initialSchedule: [],
      rollingSchedule: [],
      recentCycle: [],
      currentWorkout: null,
      sessionWorkout: null
    }
  },
  mutations: {
    prepareWorkoutData(state: any) {
      const authUser = Workout.getUserData();
      const activeProgram: any = Workout.getActiveProgram(authUser);
      // console.log("Active Program: ", activeProgram);
      const relevantWorkouts = Workout.getRelevantHistory(authUser, activeProgram);
      // console.log("Relevant Workout History: ", relevantWorkouts);
      const recentCycle = Workout.getRecentCycle(activeProgram, relevantWorkouts);
      // console.log("Recent Cycle: ", recentCycle);

      // let workoutData;
      // if (sessionStorage.workout_data) {
      //   workoutData = JSON.parse(sessionStorage.workout_data)
      // } else {
      //   workoutData = workout_data
      //   sessionStorage.workout_data = JSON.stringify(workout_data)
      // }
      //
      // state.workouts = workoutData
      // state.initialSchedule = workoutData[0].schedule
      // state.rollingSchedule = workoutData[0].schedule

      state.workouts = activeProgram;
      state.initialSchedule = activeProgram.schedule;
      state.rollingSchedule = state.initialSchedule;
      state.recentCycle = recentCycle;
    },
    setRollingSchedule(state: any, schedule: any) {
      state.rollingSchedule = schedule
    },
    setCurrentWorkout(state: any, workout: any) {
      state.currentWorkout = workout;
      state.sessionWorkout = JSON.parse(JSON.stringify(workout));
    },
    submitWorkout(state: any) {
      state.currentWorkout = state.sessionWorkout;
      state.sessionWorkout = null;
    },
    clearWorkouts(state: any) {
      state.currentWorkout = null;
      state.sessionWorkout = null;
    }
  }
})