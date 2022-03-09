<template>
  <div class="day-outer">
    <div class="day-header">
      <ion-label>{{ componentIndex + 1 }}. </ion-label>
      <ion-input placeholder="Day Name" :value="componentDay.name"></ion-input>
      <ion-icon @click="$emit('remove-day', componentIndex)" :icon="close" />
      <ion-icon :icon="settingsOutline" />
      <ion-icon class="expand-btn" :class="expanded ? 'expanded' : ''" @click="expanded = !expanded" :icon="chevronDownOutline" />
    </div>
    <div class="day-exercises" :class="expanded ? 'expanded' : ''">
      <day-exercises-component v-bind:componentDay="componentDay"></day-exercises-component>
      <div class="day-utilities">
        <a @click="openAddExercisesModal()">Add Exercise</a>
        <a @click="$emit('clone-day', componentIndex)">Clone Day</a>
      </div>
    </div>
  </div>
</template>

<script scoped lang="ts">
import { Exercise } from "@/models/exercise";
import AddExercisesComponent from "./AddExercisesComponent.vue";
import DayExercisesComponent from "./DayExercisesComponent.vue";
import {
  ellipsisHorizontal,
  chevronBackOutline,
  thumbsUp,
  mail,
  send,
  close,
  pizza,
  settingsOutline,
  chevronDownOutline,
  repeatOutline,
  removeCircleOutline,
} from "ionicons/icons";
import {
  IonIcon,
  IonInput,
  IonLabel,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonIcon,
    IonInput,
    IonLabel,
    DayExercisesComponent
  },
  props: ["day", "index"],
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
      chevronDownOutline,
      repeatOutline,
      removeCircleOutline
    };
  },
  data() {
    return {
      componentDay: this.day,
      componentIndex: this.index,
      expanded: false
    };
  },
  methods: {
    async openAddExercisesModal(): Promise<any> {
      const modal = await modalController.create({
        component: AddExercisesComponent,
        cssClass: "fullscreen",
        swipeToClose: false,
      });

      await modal.present()

      const { data } = await modal.onDidDismiss()

      if (data) {
        data.forEach((name: any) => {
            this.addExercise(name)
        })
      }
    },
    addExercise(name: string) {
      const newExercise = new Exercise({ name: name });
      newExercise.addSet({ reps: 5, weight: 45, amrap: false });
      this.componentDay.exercises.push(newExercise);
    },
  },
});
</script>

<style scoped>
.day-outer {
  display: flex;
  flex-direction: column;
}
.day-header {
  margin: 0;
  background-color: var(--theme-bg-1);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
}
/* .day-header ion-label {
  color: var(--bs-text-muted);
} */
.day-header ion-icon {
  color: var(--bs-text-muted);
  font-size: 150%;
  cursor: pointer;
  margin-left: 7px;
}
.day-utilities {
  margin: 15px 0 25px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.day-utilities a {
  cursor: pointer;
  margin: 5px 0;
  color: #6a64ff !important;
}
.day-exercises {
  transition: all 0.15s;
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: black !important;
}
.day-exercises.expanded {
    max-height: max-content;
}
</style>