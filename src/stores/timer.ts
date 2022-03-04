import { createStore } from 'vuex'

function formatTime(time: any) {
    let minutes: any = Math.floor(time / 60) % 60;
    let hours: any = Math.floor(time / 3600) % 60;
    let seconds: any = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }

    return `${hours}:${minutes}:${seconds}`;
}

export const timerStore = createStore({
  state () {
    return {
      workoutTimestamp: null,
      workoutInterval: null,
      workoutTimerCurrent: "00:00:00",
      restTimestamp: null,
      restInterval: null,
      restTimerCurrent: "00:00:00"
    }
  },
  mutations: {
    setWorkoutTimeStamp(state: any) {
        state.workoutTimestamp = new Date()
    },
    resetWorkoutTime(state: any) {
        state.workoutTimestamp = null
        clearInterval(state.workoutInterval)
        state.workoutInterval = null
        state.workoutTimerCurrent = "00:00:00"
    },
    setWorkoutInterval(state: any) {
        state.workoutInterval = setInterval(() => {
            const tempDate = new Date()
            const timeCalc = Math.floor((+tempDate - +state.workoutTimestamp) / 1000)
            state.workoutTimerCurrent = formatTime(+timeCalc)
        }, 1000)
    },
    setRestTimeStamp(state: any) {
        state.restTimestamp = new Date()
    },
    resetRestTime(state: any) {
        state.restTimestamp = null
        clearInterval(state.restInterval)
        state.restInterval = null
        state.restTimerCurrent = "00:00:00"
    },
    setRestInterval(state: any) {
        state.restInterval = setInterval(() => {
            const tempDate = new Date()
            const timeCalc = Math.floor((+tempDate - +state.restTimestamp) / 1000)
            state.restTimerCurrent = formatTime(+timeCalc)
        }, 1000)
    }
  }
})