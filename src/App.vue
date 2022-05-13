<template>
  <ion-app>
    <div class="rest-timer">
      <div class="timer">{{ restTimer }}</div>
      <div class="close-timer"><ion-icon :icon="closeOutline" /></div>
    </div>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { timerStore } from "@/stores/timer";
import { workoutStore } from "@/stores/workoutInfo";
import { closeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonIcon,
    IonRouterOutlet,
  },
  setup() {
    return {
      closeOutline,
    };
  },
  async mounted() {
    const userData = await axios.get("http://localhost:3000/user-data")
    workoutStore.commit("prepareWorkoutData", userData.data)
  },
  computed: {
    restTimer() {
      return timerStore.state.restTimerCurrent;
    },
  },
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
  --theme-purple: #6a64ff;
  --overflow: auto;
}
.rest-timer {
  /*display: flex;*/
  display: none;
  position: absolute;
  z-index: 500000;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  right: 10px;
  top: 12px;
  background-color: crimson;
  height: 30px;
  width: 110px;
  border-radius: 25px;
  padding: 5px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.timer {
  flex: 1;
  display: flex;
  justify-content: center;
}
.close-timer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>