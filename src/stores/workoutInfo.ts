import { createStore } from 'vuex';
import { Workout } from "@/models/workout";

export const workoutStore = createStore({
  state() {
    return {
      workouts: [],
      initialSchedule: [],
      rollingSchedule: [],
      recentCycle: [],
      workoutHistory: [],
      currentWorkout: null,
      sessionWorkout: null
    }
  },
  mutations: {
    async prepareWorkoutData(state: any, authUser: any) {
      const activeProgram = await Workout.getActiveProgram(authUser);
      console.log("Active Program: ", activeProgram)
      const relevantWorkouts = Workout.getRelevantHistory(authUser, activeProgram);
      console.log("Relevant History: ", relevantWorkouts)
      const relevantCycle = Workout.getRecentCycle(activeProgram, relevantWorkouts);
      console.log("Relevant Cycle: ", relevantCycle);

      const workoutHistory = authUser.workoutHistory
      const workoutData = activeProgram
      const rollingSchedule = workoutData.schedule
      const recentCycle = relevantCycle

      console.log("Rolling Schedule: ", rollingSchedule)

      state.workouts = workoutData;
      state.initialSchedule = workoutData.schedule;
      state.rollingSchedule = rollingSchedule;
      state.recentCycle = recentCycle;
      state.workoutHistory = workoutHistory;
    },
    setRollingSchedule(state: any, schedule: any) {
      state.rollingSchedule = schedule
    },
    setRecentCycle(state: any, cycle: any) {
      state.recentCycle = cycle
    },
    setWorkoutHistory(state: any, workout: any) {
      state.workoutHistory.push(workout);
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