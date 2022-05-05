<template>
  <div
    v-for="(day, index) in newSchedule"
    :key="day.name"
    class="workout-outer-div"
    @click="openModal(day)"
  >
    <div class="workout-upper-header">
      <div class="workout-upper-label">
        <span>{{
          day.status == "completed" ? "Completed Workout" : "Upcoming Workout"
        }}</span>
      </div>
      <div v-if="day.status == 'completed'">
        <ion-icon :icon="checkmarkCircleOutline" />
      </div>
    </div>
    <div class="workout-name-label">
      <span>Day {{ index + 1 }} - {{ day.name }}</span>
    </div>
    <div class="workout-details-outer">
      <div class="workout-row-header">
        <div class="workout-exercise">Exercise</div>
        <div class="workout-reps">Reps</div>
        <div class="workout-weight">Weight</div>
      </div>
      <div
        class="workout-row"
        v-for="exercise in day.exercises"
        :key="exercise.name"
      >
        <div class="workout-exercise">{{ exercise.name }}</div>
        <div class="workout-reps">{{ returnWorkoutReps(exercise.sets) }}</div>
        <div class="workout-weight">
          {{ returnWorkoutWeights(exercise.sets) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { modalController, IonIcon } from "@ionic/vue";
import ViewWorkoutModalComponent from "./modals/view-workout/ViewWorkoutModalComponent.vue";
import { workoutStore } from "@/stores/workoutInfo";
import { Workout } from "@/models/workout";
import { checkmarkCircleOutline } from "ionicons/icons";
import {timerStore} from "@/stores/timer";

export default defineComponent({
  components: {
    IonIcon,
  },
  data() {
    return {
      newSchedule: this.getNewSchedule(),
      checkmarkCircleOutline,
    };
  },
  methods: {
    async openModal(workout: any): Promise<any> {
      if (!workoutStore.state.currentWorkout) {
        workoutStore.commit("setCurrentWorkout", workout);
      }

      const modal = await modalController.create({
        component: ViewWorkoutModalComponent,
        cssClass: "fullscreen",
        swipeToClose: false,
      });

      this.$router.replace({
        query: { name: workoutStore.state.currentWorkout.name },
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();

      this.$router.push(this.$route.path);

      location.hash = "";

      if (data == "success") {
        workoutStore.state.currentWorkout.finishedTimestamp = Date.now();
        workoutStore.state.currentWorkout.startTimestamp = +timerStore.state.workoutTimestamp;
        this.newSchedule = Workout.completeWorkout(
          this.newSchedule,
          workoutStore.state.currentWorkout
        );
        timerStore.commit("resetWorkoutTime");
        timerStore.commit("resetRestTime");
        workoutStore.commit("setRollingSchedule", this.newSchedule);
        workoutStore.commit("clearWorkouts");
      }
    },
    getNewSchedule() {
      const schedule = Workout.calcRollingSchedule(
        workoutStore.state.initialSchedule
      );
      workoutStore.commit("setRollingSchedule", schedule);
      return schedule;
    },
    returnWorkoutReps(sets: any) {
      const reps = sets.map((it: any) =>
        it.amrap ? `${it.reps}+` : `${it.reps}`
      );
      return reps.join("/");
    },
    returnWorkoutWeights(sets: any) {
      const avgWeight =
        sets
          .map((it: any) => it.weight * it.reps)
          .reduce((a: any, b: any) => a + b) /
        sets.map((it: any) => it.reps).reduce((a: any, b: any) => a + b);
      return Number.isInteger(avgWeight) ? avgWeight : avgWeight.toFixed(1);
    },
  },
  mounted() {
    if (this.$route.query.name) {
        const foundDay = this.newSchedule.filter((it: any) => {
            return it.name === this.$route.query.name
        })

        if (foundDay.length > 0) {
            this.openModal(foundDay[0])
        } else {
            this.$router.push(this.$route.path);
        }
    }
  },
});
</script>

<style scoped>
ion-icon {
  color: var(--theme-purple);
}
.workout-upper-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.workout-upper-label {
  color: #6a64ff;
  font-weight: 900;
  font-size: 110%;
}
.workout-outer-div {
  cursor: pointer;
  width: 100%;
  padding: 10px 15px 10px 15px;
  background-color: var(--theme-bg-1);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  margin-bottom: 10px;
}
.workout-row-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
  font-weight: 900;
  border-bottom: 2px solid #fff;
}
.workout-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 2px solid #fff;
}
.workout-row:last-of-type {
  border: none;
  padding-bottom: 0;
}
.workout-exercise {
  width: 45%;
}
.workout-reps {
  width: 30%;
}
.workout-weight {
  width: 25%;
  display: flex;
  justify-content: flex-end;
}
</style>
