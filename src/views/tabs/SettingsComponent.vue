<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="settings-outer-container">
        <ion-list mode="md" lines="full">
          <ion-item-divider sticky><ion-label>Profile</ion-label></ion-item-divider>

          <ion-item><ion-label>User Account</ion-label></ion-item>
          <ion-item><ion-label>Payment Methods</ion-label></ion-item>
          <ion-item><ion-label>Manage Subscriptions</ion-label></ion-item>
          <ion-item><ion-label>Personal Preferences</ion-label></ion-item>
          <ion-item><ion-label>Privacy and Visibility</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Workout</ion-label></ion-item-divider>

          <ion-item><ion-label>Select Workout Program</ion-label></ion-item>
          <ion-item><ion-label>Load Additional Workouts</ion-label></ion-item>
          <ion-item><ion-label>Edit Additional Programs</ion-label></ion-item>
          <ion-item @click="openViewPostModal(BuildProgramComponent)"><ion-label>Build Your Own Program</ion-label></ion-item>
          <ion-item><ion-label>Edit Workout Program</ion-label></ion-item>
          <ion-item><ion-label>Save Current Workout to Program</ion-label></ion-item>
          <ion-item><ion-label>Export Workout</ion-label></ion-item>
          <ion-item><ion-label>Import Workout</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Warm-up</ion-label></ion-item-divider>

          <ion-item><ion-label>Select Warm-up Method</ion-label></ion-item>
          <ion-item><ion-label>Build Your Own Warm-up</ion-label></ion-item>
          <ion-item><ion-label>Edit Warm-up</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Increment Scheme</ion-label></ion-item-divider>

          <ion-item><ion-label>Build Your Own Increment Scheme</ion-label></ion-item>
          <ion-item><ion-label>Edit Increment Scheme</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Miscellaneous</ion-label></ion-item-divider>

          <ion-item @click="openViewPostModal(ViewExercisesComponent)"><ion-label>View Exercises</ion-label></ion-item>
          <ion-item><ion-label>Add Exercise</ion-label></ion-item>
          <ion-item><ion-label>View Body-Weights</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>System</ion-label></ion-item-divider>

          <ion-item><ion-label>Settings</ion-label></ion-item>
          <ion-item><ion-label>Backup</ion-label></ion-item>
          <ion-item><ion-label>Restore</ion-label></ion-item>
          <ion-item><ion-label>History</ion-label></ion-item>
          <ion-item><ion-label>Exports</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>About</ion-label></ion-item-divider>

          <ion-item><ion-label>Feedback</ion-label></ion-item>
          <ion-item><ion-label>Change Log</ion-label></ion-item>
          <ion-item><ion-label>Rate App</ion-label></ion-item>
          <ion-item><ion-label>Legal Notices</ion-label></ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonItemDivider, IonLabel, IonList, modalController } from '@ionic/vue';
  import { defineComponent, markRaw, defineAsyncComponent } from 'vue';
  // import ViewExercisesComponent from '@/views/tabs/settings/exercises/ViewExercisesComponent.vue';

  export default defineComponent({
    methods: {
      async openViewPostModal(modalComponent: any):Promise<any> {
        const modal = await modalController
        .create({
          component: modalComponent,
          cssClass: 'fullscreen',
          swipeToClose: false
        })
        return modal.present()
      },
    },
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonItem,
      IonItemDivider,
      IonLabel,
      IonList
    },
    data() {
      return {
        ViewExercisesComponent: markRaw(defineAsyncComponent(() => import('@/views/tabs/settings/exercises/ViewExercisesComponent.vue') )),
        BuildProgramComponent: markRaw(defineAsyncComponent(() => import('@/views/tabs/settings/exercises/BuildProgramComponent.vue') ))
      }
    }
  });
</script>

<style>
  .settings-outer-container {
    margin: 0 auto;
    max-width: 800px;
  }
  .settings-outer-container > ion-list {
    padding: 0 !important;
  }
</style>