import { createStore } from 'vuex';
import workout_data from '../../public/dev-data/workouts/workout-data.json';

export const workoutStore = createStore({
  state() {
    return {
      workouts: [],
      initialSchedule: [],
      rollingSchedule: [],
      currentWorkout: null,
      sessionWorkout: null
    }
  },
  mutations: {
    prepareWorkoutData(state: any) {
      let workoutData;

      if (sessionStorage.workout_data) {
        workoutData = JSON.parse(sessionStorage.workout_data)
      } else {
        workoutData = workout_data
        sessionStorage.workout_data = JSON.stringify(workout_data)
      }

      state.workouts = workoutData
      state.initialSchedule = workoutData[0].schedule
      state.rollingSchedule = workoutData[0].schedule
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