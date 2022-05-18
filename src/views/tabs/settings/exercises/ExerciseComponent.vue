<template>
  <div>
    <ion-item>
      <div slot="start" @click="toggleExercise()">
          <ion-checkbox color="tertiary"></ion-checkbox>
      </div>
      <ion-label>{{ exercise.name }}</ion-label>
      <ion-icon slot="end" @click="expanded = !expanded" :icon="chevronDownOutline" :class="expanded ? 'expanded' : ''" />
    </ion-item>

    <div class="exercise-info" :class="expanded ? 'expanded' : ''">
      <ion-item>
        <ion-label>Description: {{ exercise.description }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>URL: {{ exercise.link }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Type: {{ exercise.type }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-label>Target: {{ exercise.target }}</ion-label>
      </ion-item>
    </div>
  </div>
</template>

<script lang="ts">
import {
  IonLabel,
  IonItem,
  IonCheckbox,
  IonIcon
} from "@ionic/vue";
import {
  chevronDownOutline
} from "ionicons/icons"
import { defineComponent } from "vue";

export default defineComponent({
  props: ["exercise", "index"],
  components: {
    IonLabel,
    IonItem,
    IonCheckbox,
    IonIcon
  },
  setup() {
      return {
          chevronDownOutline
      }
  },
  data() {
    return {
      componentExercise: this.exercise,
      expanded: false,
      toggled: false
    };
  },
  methods: {
      toggleExercise() {
          this.toggled = !this.toggled;
          this.$emit('toggle-exercise', this.exercise.name, this.toggled)
      }
  }
});
</script>

<style scoped>
    .exercise-info {
        max-height: 0;
        overflow: hidden;
    }
    .exercise-info.expanded {
        max-height: max-content;
    }
    ion-icon {
        cursor: pointer;
    }
    ion-icon.expanded {
        transform: rotate(180deg);
    }
</style>