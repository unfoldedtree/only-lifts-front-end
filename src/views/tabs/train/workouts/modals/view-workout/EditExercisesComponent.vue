<template>
  <div class="outer">
    <div class="header">
      <div>
          <ion-icon @click="closeModal()" :icon="closeOutline" />
          <ion-label>Edit Exercises</ion-label>
      </div>
      <a @click="save()">Save</a>
    </div>
    <div class="content">
      <day-exercises-component v-bind:componentDay="editExercises" :editable="editable"></day-exercises-component>
      <div class="utilities">
        <a @click="openAddExercisesModal()">Add Exercise</a>
      </div> 
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
import { Exercise } from "@/models/exercise";
import DayExercisesComponent from '@/views/tabs/settings/workout/DayExercisesComponent.vue'
import AddExercisesComponent from "@/views/tabs/settings/workout/AddExercisesComponent.vue";

export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    DayExercisesComponent,
  },
  // props: ["day"],
  props: {
    day: {
      type: Object
    },
    index: Number,
    editable: {
      type: Boolean,
      default: true
    }
  },
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
    },
    save() {
      modalController.dismiss({ day: this.editExercises })  
    },
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
      this.editExercises.exercises.push(newExercise);
    },
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
.handle {
    padding: 7px;
}
.utilities {
  margin: 15px 0 25px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.utilities a {
  cursor: pointer;
  margin: 5px 0;
  color: #6a64ff !important;
}
</style>