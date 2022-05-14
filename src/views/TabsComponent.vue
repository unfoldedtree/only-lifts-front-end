<template>
  <ion-page>
    <ion-content scroll-y="false">
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="social" href="/social">
            <ion-icon :icon="people" />
            <ion-label>Social</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="talk" href="/talk">
            <ion-icon :icon="chatbubbles" />
            <ion-label>Talk</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="train" href="/train">
            <ion-icon :icon="watch" />
            <ion-label>Train</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="track" href="/track">
            <ion-icon :icon="calendar" />
            <ion-label>Track</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="settings" href="/settings">
            <ion-icon :icon="settings" />
            <ion-label>Settings</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonContent,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  } from '@ionic/vue';
  import { people, calendar, watch, settings, chatbubbles } from 'ionicons/icons';
  import axios from "axios";
  import {workoutStore} from "@/stores/workoutInfo";

  export default {
    name: 'TabsComponent',
    components: {
      IonContent,
      IonLabel,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonPage,
      IonRouterOutlet,
    },
    setup() {
      return {
        people,
        calendar,
        watch,
        settings,
        chatbubbles,
      };
    },
    async mounted() {
      const { data } = await axios.get("http://localhost:3000/profile")
      if (data.currentProgramId) {
        workoutStore.commit("prepareWorkoutData", data)
      }
    },
  };
</script>

<style scoped>
  * {
    --color-selected: #6a64ff;
  }
</style>