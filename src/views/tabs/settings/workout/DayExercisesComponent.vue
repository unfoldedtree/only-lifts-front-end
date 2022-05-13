<template>
  <draggable
    handle=".handle"
    v-model="day.exercises"
    item-key="name"
    @start="dragging = true"
    @end="dragging = false"
  >
    <template #item="{ element, index }">
      <div class="exercise-outer">
        <div class="exercise-header">
          <ion-icon class="handle" v-if="editable" :icon="repeatOutline" />
          <label>{{ index + 1 }}. {{ element.name }}</label>
          <ion-icon
            v-if="editable"
            @click="removeExercise(index)"
            :icon="removeCircleOutline"
          />
        </div>
        <div class="exercise-workouts">
          <table>
            <tr>
              <th class="remove-set" v-if="editable"></th>
              <th>#</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>AMRAP</th>
            </tr>
            <tr v-for="(set, setIndex) in element.sets" v-bind:key="set.id">
              <th class="remove-set" v-if="editable">
                <ion-icon
                  @click="removeSet(element, index, setIndex)"
                  :icon="removeCircleOutline"
                />
              </th>
              <th>{{ setIndex + 1 }}</th>
              <th>{{ set.reps }}</th>
              <th>{{ set.weight }}</th>
              <th class="amrap">
                <ion-checkbox
                  color="tertiary"
                  :modelValue="set.amrap"
                  :disabled="!editable"
                  @update:modelValue="set.amrap = $event"
                ></ion-checkbox>
              </th>
            </tr>
          </table>
        </div>
        <div class="exercise-footer" v-if="editable">
          <a @click="addSet(element)">Add Set</a>
          <a @click="cloneExercise(index)">Clone Exercise</a>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { defineComponent } from "vue";
import { Exercise } from '@/models/exercise'
import { IonCheckbox, IonIcon } from '@ionic/vue'
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
export default defineComponent({
  components: {
      IonIcon,
      IonCheckbox,
      draggable
  },
  setup() {
      return {
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
      }
  },
  props: ["componentDay", "editable"],
  data() {
      return {
          day: this.componentDay
      }
  },  
  methods: {
    cloneExercise(index: number) {
      const selectedExercise = JSON.parse(
        JSON.stringify(this.day.exercises[index])
      );
      this.day.exercises.splice(index, 0, selectedExercise);
    },
    removeExercise(index: number) {
      this.day.exercises.splice(index, 1);
    },
    addSet(exercise: Exercise) {
      const prevSet = JSON.parse(
        JSON.stringify(exercise.sets[exercise.sets.length - 1])
      );
      exercise.sets.push(prevSet);
    },
    removeSet(exercise: Exercise, index: number, setIndex: number) {
      exercise.sets.splice(setIndex, 1);

      if (exercise.sets.length == 0) {
        this.day.exercises.splice(index, 1);
      }
    },
  },
});
</script>

<style scoped>
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
  cursor: pointer;
  color: #6a64ff;
  padding: 2px;
  font-size: 150%;
}
.expand-btn.expanded {
    transform: rotate(180deg);
}
.exercise-workouts {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exercise-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.exercise-footer a {
  cursor: pointer;
  color: #6a64ff;
  margin: 7px;
}
th {
  padding: 5px 15px;
  border: 2px solid black;
  min-width: 50px;
  font-weight: 400;
}
th.remove-set {
  cursor: pointer;
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