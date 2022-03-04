<template>
  <ion-accordion class="day-outer">
    <ion-item slot="header" class="day-header">
      <ion-label>Day {{ componentIndex + 1 }}</ion-label>
      <ion-input placeholder="Day Name" :value="componentDay.name"></ion-input>
      <ion-icon @click="$emit('remove-day', componentIndex)" :icon="close" />
      <ion-icon :icon="settingsOutline" />
    </ion-item>
    <ion-list slot="content" class="day-exercises">
      <draggable
        handle=".handle"
        v-model="componentDay.exercises"
        item-key="name"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element, index }">
          <div class="exercise-outer">
            <div class="exercise-header">
              <ion-icon class="handle" :icon="repeatOutline" />
              <label>{{ index + 1 }}. {{ element.name }}</label>
              <ion-icon @click="removeExercise(index)" :icon="removeCircleOutline" />
            </div>
            <div class="exercise-workouts">
              <table>
                <tr>
                  <th class="remove-set"></th>
                  <th>#</th>
                  <th>Reps</th>
                  <th>Weight</th>
                  <th>AMRAP</th>
                </tr>
                <tr v-for="(set, index) in element.sets" v-bind:key="set.id">
                  <th class="remove-set"><ion-icon @click="removeSet(element, index)" :icon="removeCircleOutline" /></th>
                  <th>{{ index + 1 }}</th>
                  <th>{{ set.reps }}</th>
                  <th>{{ set.weight }}</th>
                  <th class="amrap">
                    <ion-checkbox
                      color="tertiary"
                      :modelValue="set.amrap"
                      @update:modelValue="set.amrap = $event"
                    ></ion-checkbox>
                  </th>
                </tr>
              </table>
            </div>
            <div class="exercise-footer">
                <a @click="addSet(element)">Add Set</a>
                <a>Clone Exercise</a>
            </div>
          </div>
        </template>
      </draggable>
      <div class="day-utilities">
        <a @click="addExercise()">Add Exercise</a>
        <a>Clone Day</a>
      </div>
    </ion-list>
  </ion-accordion>
</template>

<script scoped lang="ts">
import draggable from "vuedraggable";
import { Exercise } from '@/models/exercise';
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
  IonCheckbox,
  IonLabel,
  IonAccordion,
  IonItem,
  IonList,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonAccordion,
    draggable,
    IonCheckbox,
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
    };
  },
  methods: {
    addExercise() {
        const newExercise = new Exercise({ name: "Downward Dogs" })
        newExercise.addSet({ reps: 5, weight: 45, amrap: false });
        this.componentDay.exercises.push(newExercise)
    },
    removeExercise(index: number) {
        this.componentDay.exercises.splice(index, 1);
    },
    addSet(exercise: Exercise) {
        const prevSet = JSON.parse(JSON.stringify(exercise.sets[exercise.sets.length - 1]));
        exercise.sets.push(prevSet)
    },
    removeSet(exercise: Exercise, index: number) {
        exercise.sets.splice(index, 1)
    }
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
}
.day-header label {
  margin-right: 7px;
}
.day-header ion-icon {
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
  margin: 5px 0;
  color: #6a64ff !important;
}
.day-exercises {
  display: flex;
  flex-direction: column;
  background-color: black !important;
}
.exercise-outer {
  margin: 10px;
  padding: 10px;
  background-color: var(--theme-bg-1);
  border-radius: 5px;
}
.exercise-header {
  display: flex;
  align-items: center;
}
.exercise-header label {
    margin-left: 7px;
    flex: 1;
}
.exercise-header ion-icon {
  color: #6a64ff;
  padding: 2px;
  font-size: 150%;
}
.exercise-workouts {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
th {
  padding: 5px 15px;
  border: 2px solid black;
  min-width: 50px;
  font-weight: 400;
}
th.remove-set {
    border: 0;
    padding: 0 15px;
    color: red;
}
th.amrap {
  width: 20px;
}
ion-checkbox {
  --size: 30%;
}
</style>