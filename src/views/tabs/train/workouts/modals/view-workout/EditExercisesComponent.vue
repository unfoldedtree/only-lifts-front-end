<template>
  <div class="outer">
    <div class="header">
      <div>
          <ion-icon @click="closeModal()" :icon="closeOutline" />
          <ion-label>Edit Exercises</ion-label>
      </div>
      <a>Save</a>
    </div>
    <div class="content">
      <day-exercises-component v-bind:componentDay="day"></day-exercises-component> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonIcon,
  modalController,
  IonLabel
} from "@ionic/vue";
import { closeOutline, reorderThreeOutline } from "ionicons/icons";
import DayExercisesComponent from '@/views/tabs/settings/exercises/DayExercisesComponent.vue'

export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    DayExercisesComponent,
  },
  props: ["day"],
  setup() {
    return {
      closeOutline,
      modalController,
      reorderThreeOutline,
    };
  },
  data() {
    return {
      editExercises: JSON.parse(JSON.stringify(this.day)),
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    }
  },
});
</script>

<style scoped>
.outer {
  margin: 0 auto;
  padding: 0 0 0 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: #000000;
}
.header {
  padding: 12px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-background-flat);
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
    color: var(--theme-purple);
    padding: 7px;
    margin-right: 5px;
}
.handle {
    padding: 7px;
}
</style>