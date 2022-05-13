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
      // console.log("Active Program: ", activeProgram)
      const relevantWorkouts = Workout.getRelevantHistory(authUser, activeProgram);
      // console.log("Relevant History: ", relevantWorkouts)
      const relevantCycle = Workout.getRecentCycle(activeProgram, relevantWorkouts);
      // console.log("Relevant Cycle: ", relevantCycle);

      // let workoutHistory;
      // if (sessionStorage.workout_history) {
      //   workoutHistory = JSON.parse(sessionStorage.workout_history)
      // } else {
      //   workoutHistory = authUser.workoutHistory;
      //   sessionStorage.workout_history = JSON.stringify(authUser.workoutHistory);
      // }
      const workoutHistory = authUser.workoutHistory
      // let workoutData;
      // if (sessionStorage.workout_data) {
      //   workoutData = JSON.parse(sessionStorage.workout_data)
      // } else {
      //   workoutData = activeProgram
      //   sessionStorage.workout_data = JSON.stringify(activeProgram)
      // }
      const workoutData = activeProgram
      // let rollingSchedule;
      // if (sessionStorage.rolling_schedule) {
      //   rollingSchedule = JSON.parse(sessionStorage.rolling_schedule)
      // } else {
      //   rollingSchedule = workoutData.schedule;
      //   sessionStorage.rolling_schedule = JSON.stringify(workoutData.schedule);
      // }
      const rollingSchedule = workoutData.schedule
      // let recentCycle;
      // if (sessionStorage.recent_cycle) {
      //   recentCycle = JSON.parse(sessionStorage.recent_cycle)
      // } else {
      //   recentCycle = relevantCycle;
      //   sessionStorage.recent_cycle = JSON.stringify(relevantCycle);
      // }
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
      // sessionStorage.rolling_schedule = JSON.stringify(schedule);
    },
    setRecentCycle(state: any, cycle: any) {
      state.recentCycle = cycle
      // sessionStorage.recent_cycle = JSON.stringify(cycle);
    },
    setWorkoutHistory(state: any, workout: any) {
      state.workoutHistory.push(workout);
      // sessionStorage.workout_history = JSON.stringify(state.workoutHistory);
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