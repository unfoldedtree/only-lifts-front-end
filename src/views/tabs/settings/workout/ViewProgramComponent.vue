<template>
  <div class="post-outer-div">
    <div class="header">
      <div>
        <ion-icon @click="closeModal()" :icon="close" />
        <ion-label>View Program</ion-label>
      </div>
      <a @click="redirectToEdit()">Edit</a>
    </div>

    <div class="post-content">
      <div class="program">
        <div class="program-name">{{ program.name }}</div>
        <div class="program-description">{{ program.about }}</div>
        <div class="program-tags">
          <div class="program-tag" v-for="tag in program.tags" v-bind:key="tag">{{ tag }}</div>
        </div>
      </div>
    </div>

    <div class="post-content">
      <day-component
          v-for="(day , index) in program.schedule"
          :key="day.name"
          :day="day"
          :index="index"
          :editable="false"
      >
      </day-component>
    </div>

  </div>
</template>

<script lang="ts">
import DayComponent from "./DayComponent.vue";

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
import { modalController, IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    // IonButton,
    DayComponent,
    IonLabel,
    IonIcon,
  },
  props: ['program'],
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
    redirectToEdit() {
      modalController.dismiss(this.program)
    }
  },
  data() {
    return {
      filterValue: "",
    };
  },
});
</script>

<style scoped>
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
.program {
  margin: 0 !important;
  padding: 15px 10px;
  background-color: transparent;
  border-bottom: var(--theme-bg-1) solid 1px;
}
.program-name {
  font-size: 110%;
}
.program-description {
  margin: 10px 0 12px 0;
}
.program-tags {
  display: flex;
  flex-direction: row;
}
.program-tag {
  padding: 3px 7px;
  margin-right: 7px;
  border-radius: 25px;
  background-color: var(--theme-purple);
}
</style>