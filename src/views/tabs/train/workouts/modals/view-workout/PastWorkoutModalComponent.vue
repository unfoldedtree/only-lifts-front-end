<template>
  <div class="workout-modal-container">
    <div class="workout-outer-div">
      <div class="workout-upper-details">
        <div class="modal-back-button" @click="closeModal()">
          <ion-icon :icon="chevronBackOutline" />
        </div>
        <div class="workout-name">
          <div>{{ sessionWorkout.name }}</div>
        </div>
        <div class="workout-options">
          <div class="workout-options-button">
            <ion-icon :icon="ellipsisHorizontal" />
          </div>
        </div>
      </div>

      <div class="duration-div">
        <div class="lifted">
          <div class="lifted-amount">0</div>
          <div class="lifted-label">LB LIFTED</div>
        </div>
        <div class="duration">
          <div class="duration-amount">{{ formattedTimer }}</div>
          <div class="duration-label">DURATION</div>
        </div>
      </div>

      <div
          class="workout-exercise-div"
          v-for="(exercise) in sessionWorkout.exercises"
          :key="exercise.id"
      >
        <div class="exercise-header">
          <div class="exercise-name">
            {{ exercise.name }}
            <ion-icon
                :icon="checkmarkOutline"
            />
          </div>
          <div class="weight-change-div">
            <ion-icon :icon="ellipsisVertical" />
          </div>
        </div>
        <div class="exercise-rep-count-container">
          <div
              class="exercise-rep-div"
              v-for="(set) in exercise.sets"
              :key="set.id"
          >
            <div
                class="exercise-rep-count"
                :class="set.completed ? 'selected' : ''"
            >
              {{ set.reps }}
            </div>
            <div>{{ set.weight }}</div>
          </div>
        </div>
      </div>

      <div class="workout-lower-details">
        <div class="body-weight">
          <div class="body-weight-label">Body Weight</div>
          <div class="body-weight-stat">160 lb</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, markRaw, defineAsyncComponent } from "vue";
import {
  ellipsisHorizontal,
  chevronBackOutline,
  checkmarkOutline,
  ellipsisVertical
} from "ionicons/icons";
import { modalController, IonIcon } from "@ionic/vue";
import { timerStore } from "@/stores/timer";
import { workoutStore } from "@/stores/workoutInfo";

export default defineComponent({
  components: {
    IonIcon,
  },
  props: ["pastWorkout"],
  methods: {
    closeModal() {
      modalController.dismiss();
    }
  },
  data() {
    return {
      sessionWorkout: this.pastWorkout,
      chevronBackOutline,
      ellipsisHorizontal,
      ellipsisVertical,
      checkmarkOutline
    };
  }
});
</script>

<style>
* {
  --bs-gray-base: #a7a7a7;
  --primary-text: #e4e6eb;
  --card-background-flat: #323436;
  --bs-text-muted: #777;
  --comment-background: #3a3b3c;
  --card-background: #242526;
  --theme-bg-1: #18191a;
  --theme-dark: #0e0e10;
  --theme-post: #1c1e21;
  --theme-medium: #1c1c1e;
}
.fullscreen {
  --height: 100%;
  --width: 100%;
}
.fullscreen .ion-page {
  height: 100%;
}
.workout-modal-container {
  padding: 0 0 0 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  height: 100%;
}
.workout-outer-div {
  width: 100%;
  background-color: var(--theme-bg-1);
  padding: 5px 15px 0px 15px;
  max-width: 800px;
}
.modal-back-button {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
}
.workout-name {
  font-size: 110%;
  color: #6a64ff;
  font-weight: 900;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.workout-upper-details {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.workout-options-button {
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
  color: var(--bs-gray-base);
}
.duration-div {
  display: flex;
  width: 100%;
  margin: 35px auto;
  justify-content: space-evenly;
}
.lifted,
.duration {
  display: flex;
  flex-direction: column;
}
.lifted-amount,
.lifted-label,
.duration-amount,
.duration-label {
  text-align: center;
}
.lifted-amount,
.duration-amount {
  margin-bottom: 5px;
  font-weight: 900;
}
.workout-exercise-div {
  margin: 10px 0;
  padding: 10px;
  background-color: var(--card-background-flat);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.exercise-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
/* .weight-change-div {
        width: 45px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    } */
.exercise-name {
  display: flex;
  align-items: center;
}
.exercise-name ion-icon {
  display: none;
  margin-left: 5px;
  color: #6a64ff;
}
.exercise-name ion-icon.show {
  display: block;
}
.exercise-rep-count-container {
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0;
}
.exercise-rep-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 7px;
}
.exercise-rep-count {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--bs-text-muted);
  margin-bottom: 5px;
}
.exercise-rep-count.selected {
  background-color: #6a64ff;
}
.workout-lower-details {
  width: 100%;
  padding-bottom: 20px;
}
.body-weight {
  margin: 25px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.body-weight-stat {
  color: #6a64ff;
}
.workout-finish-button {
  cursor: pointer;
  width: 100%;
  height: 40px;
  margin: 20px auto;
  background-color: #6a64ff;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 95%;
  font-weight: 500;
}
.workout-modifications {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.workout-modifications div {
  cursor: pointer;
}
</style>