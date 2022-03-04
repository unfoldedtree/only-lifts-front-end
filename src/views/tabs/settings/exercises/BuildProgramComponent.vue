<template>
  <div class="post-outer-div">
    <div class="post-upper-details">
      <div class="modal-back-button" @click="closeModal()">
        <ion-icon :icon="close" />
        Build Program
      </div>
    </div>

    <div class="program-utilities">
      <ion-button @click="addDay()" color="light" expand="block">Add Day</ion-button>
      <ion-button color="tertiary" expand="block">Save Program</ion-button>
    </div>

    <div class="post-content">
      <day-component @remove-day="removeDay" @clone-day="cloneDay" v-for="(day , index) in exerciseSchedule" v-bind:key="day.name" v-bind:day="day" v-bind:index="index"></day-component>
    </div>
  </div>
</template>

<script lang="ts">
import DayComponent from "./DayComponent.vue";
import { workoutStore } from '@/stores/workoutInfo'
import { Day } from '@/models/day'

import {
  ellipsisHorizontal,
  chevronBackOutline,
  thumbsUp,
  mail,
  send,
  close,
  pizza,
  settingsOutline,
} from "ionicons/icons";
import { modalController, IonButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonButton,
    DayComponent,
    IonIcon,
  },
  setup() {
    return {
      thumbsUp,
      mail,
      ellipsisHorizontal,
      chevronBackOutline,
      send,
      close,
      pizza,
      settingsOutline,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    addDay() {
      console.log("add day")
      this.exerciseSchedule.push(new Day({}))
      console.log(this.exerciseSchedule[ this.exerciseSchedule.length - 1 ])
    },
    cloneDay(index: number) {
      const selectedExercise = JSON.parse(JSON.stringify(this.exerciseSchedule[index]))
      this.exerciseSchedule.splice(index, 0, selectedExercise)
    },
    removeDay(index: number) {
      this.exerciseSchedule.splice(index, 1);
    }
  },
  data() {
    return {
      exerciseSchedule: workoutStore.state.initialSchedule,
      filterValue: "",
    };
  },
});
</script>

<style>
.fullscreen {
  --height: 100%;
  --width: 100%;
}
.fullscreen .ion-page {
  height: 100%;
}
.program-utilities {
  margin: 15px 0;
}
.post-outer-div {
  margin: 0 auto;
  padding: 0 0 0 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: #000000;
}
.modal-back-button {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
}
.post-upper-details {
  padding: 12px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-background-flat);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.create-post-submit {
  font-size: 120%;
  color: red;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-options-button {
  cursor: pointer;
}
.post-content-header {
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.post-profile-pic {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}
.post-profile-image {
  border-radius: 50%;
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: whitesmoke;
}
.post-profile-user-info {
  color: var(--primary-text);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  margin: 7px 14px 7px 7px;
}
.post-options {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
  color: var(--bs-gray-base);
}
</style>