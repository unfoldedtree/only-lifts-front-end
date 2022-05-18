<template>
  <ion-page>
    <ion-content scroll-y="false">
      <ion-tabs  v-if="isMounted">
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
<!--      <div v-else>Loading...</div>-->
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
  import {userStore} from "@/stores/user";
  import {defineComponent} from "vue";

  export default defineComponent({
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
    data() {
      return {
        isMounted: false
      }
    },
    methods: {},
    async mounted() {
      if (!userStore.state.sessionUser.userId) {
        const { data } = await axios.get("http://localhost:3000/profile")
        userStore.commit("setSessionUser", data)
        console.log("Session User: ", userStore.state.sessionUser)
      }

      if (userStore.state.sessionUser.currentProgramId) {
        workoutStore.commit("prepareWorkoutData", userStore.state.sessionUser)
      }

      this.isMounted = true
    },
  });
</script>

<style scoped>
  * {
    --color-selected: #6a64ff;
  }
</style>