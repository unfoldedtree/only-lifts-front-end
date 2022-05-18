<template>
  <div class="post-outer-div">
    <div class="header">
      <div>
        <ion-icon @click="closeModal()" :icon="close" />
        <ion-label>Create Program</ion-label>
      </div>
      <a>Save</a>
    </div>

    <div class="post-content">
      <div class="program">
        <ion-item class="program-name-item">
          <ion-label position="stacked">Name</ion-label>
          <ion-input :value="exercise.name" placeholder="Enter program name..."></ion-input>
        </ion-item>
        <ion-item class="program-description-item">
          <ion-label position="stacked">Description</ion-label>
          <ion-input :value="exercise.description" placeholder="Enter program description..."></ion-input>
        </ion-item>
        <div class="program-tags-div">
          <ion-item class="program-tags-item">
            <ion-label position="stacked">Tags</ion-label>
            <ion-input v-model="tagInput" placeholder="Enter program tag..."></ion-input>
          </ion-item>
          <ion-icon :icon="add" @click="addTag()" />
        </div>

        <div class="program-tags">
          <div class="program-tag"
               v-for="(tag, index) in exercise.tags"
               v-bind:key="index"
          >{{ tag }}
            <ion-icon @click="removeTag(index)" :icon="close" />
          </div>
        </div>
      </div>
    </div>

    <div class="post-content">
      <day-component
          v-for="(day , index) in exerciseSchedule" :key="day.name"
          @remove-day="removeDay"
          @clone-day="cloneDay"
          :day="day"
          :index="index"
          :editable="true"
      >
      </day-component>
    </div>

    <div class="program-utilities">
      <a @click="addDay()">Add Day</a>
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
  add,
  settingsOutline,
} from "ionicons/icons";
import { modalController, IonLabel, IonIcon, IonItem, IonInput } from "@ionic/vue";
import { defineComponent } from "vue";
import {WorkoutScheme} from "@/models/workoutScheme";

export default defineComponent({
  components: {
    DayComponent,
    IonIcon,
    IonLabel,
    IonItem,
    IonInput
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
      add,
      settingsOutline,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    addTag() {
      this.exercise.tags.push(this.tagInput);
      this.tagInput = ''
    },
    removeTag(index: number) {
      this.exercise.tags.splice(index, 1)
    },
    addDay() {
      this.exerciseSchedule.push(new Day({}))
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
      tagInput: "",
      exercise: WorkoutScheme.empty(),
      exerciseSchedule: [] as any[],
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
  margin: 15px 0 25px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.program-utilities a {
  cursor: pointer;
  margin: 5px 0;
  color: #6a64ff !important;
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
.program {
  margin-bottom: 0 !important;
  padding: 5px 10px 5px 10px;
  background-color: transparent;
  border-bottom: none;
}
.program-name-item,
.program-description-item {
  --padding-start: 0;
  margin-bottom: 10px;
}
.program-tags-item {
  --padding-start: 0;
  margin-bottom: 15px;
  flex: 1;
}
.program-tags-div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
}
.program-tags-div ion-icon {
  padding: 0 10px;
  color: var(--theme-purple);
  font-size: 175%;
}
.program-tags {
  overflow: auto;
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
}
.program-tag {
  white-space: nowrap;
  padding: 3px 7px;
  margin-right: 7px;
  border-radius: 25px;
  background-color: var(--theme-purple);
  display: flex;
  align-items: center;
  justify-content: center;
}
.program-tag ion-icon {
  padding-left: 3px;
}
.header {
  padding: 12px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--theme-bg-1);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.header div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.header div ion-icon {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
  margin-right: 7px;
}
.header a {
  cursor: pointer;
  color: var(--theme-purple);
  padding: 7px;
  margin-right: 5px;
}
</style>