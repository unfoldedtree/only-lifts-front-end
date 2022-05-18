<template>
  <div class="post-outer-div">
    <div class="post-upper-details">
      <div class="modal-back-button" @click="closeModal()">
        <ion-icon :icon="close" />
      </div>
      <ion-searchbar mode="ios" v-model="filterValue"></ion-searchbar>
      <a class="add-exercises" @click="addExercises()">Add</a>
    </div>

    <div class="post-content">
      <exercise-component
        @toggle-exercise="toggleExercise"
        v-for="(exercise, index) in filterExercises()"
        :key="exercise.id"
        v-bind:index="index"
        v-bind:exercise="exercise"
      ></exercise-component>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ellipsisHorizontal,
  chevronBackOutline,
  thumbsUp,
  mail,
  send,
  close,
} from "ionicons/icons";
import { IonIcon, modalController, IonSearchbar } from "@ionic/vue";
import { defineComponent } from "vue";
import ExerciseComponent from "../exercises/ExerciseComponent.vue";
import axios from "axios";

export default defineComponent({
  components: {
    IonIcon,
    IonSearchbar,
    ExerciseComponent,
  },
  setup() {
    return {
      thumbsUp,
      mail,
      ellipsisHorizontal,
      chevronBackOutline,
      send,
      close,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    addExercises() {
      modalController.dismiss(this.selectedExercises);
    },
    filterExercises() {
      const filteredExercises = this.exerciseJson.filter((it: any) => {
        const formattedName = it.name.toLowerCase().replace(/\s/g, "");
        const formattedSearch = this.filterValue.toLowerCase().replace(/\s/g, "");
        return formattedName.includes(formattedSearch);
      });

      return filteredExercises;
    },

    toggleExercise(name: string, toggled: boolean) {
      if (toggled) {
        if (this.selectedExercises.indexOf(name) === -1) {
          this.selectedExercises.push(name);
        }
      } else {
        if (this.selectedExercises.indexOf(name) !== -1) {
          this.selectedExercises.splice(
            this.selectedExercises.indexOf(name),
            1
          );
        }
      }
    }
  },
  data() {
    return {
      exerciseJson: [] as any[],
      filterValue: "",
      selectedExercises: [] as any,
    };
  },
  async mounted() {
    const { data } = await axios.get("http://localhost:3000/exercises/default")
    this.exerciseJson = data
  }
});
</script>

<style scoped>
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
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--card-background-flat);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.add-exercises {
  cursor: pointer;
  padding: 10px;
  color: var(--theme-purple);
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