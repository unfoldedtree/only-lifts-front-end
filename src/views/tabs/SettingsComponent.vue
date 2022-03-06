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
          <ion-item @click="openViewPostModal('build-program')"><ion-label>Build Your Own Program</ion-label></ion-item>
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

          <ion-item @click="openViewPostModal('view-exercises')"><ion-label>View Exercises</ion-label></ion-item>
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

  export default defineComponent({
    methods: {
      async openViewPostModal(hashString: string):Promise<any> {
        const foundEl = this.settingsReference.filter((it: any) => {
          return it.hashString == hashString
        })
        this.componentName = foundEl[0].component

        location.hash = hashString
        const modal = await modalController
        .create({
          component: this.dynamicComponent,
          cssClass: 'fullscreen',
          swipeToClose: false
        })

        await modal.present()

        await modal.onDidDismiss()
        location.hash = ''
        this.componentName = ''
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
        componentName: '',
        settingsReference: [
          { hashString: 'view-exercises', component: 'ViewExercisesComponent' },
          { hashString: 'build-program', component: 'BuildProgramComponent' }
        ],
      }
    },
    computed: {
      dynamicComponent(): any {
        if (this.componentName == "") {
          return null
        }
        return markRaw(defineAsyncComponent(() => import(`@/views/tabs/settings/exercises/${this.componentName}.vue`) ))
      }
    },
    mounted() {
      if (!(location.hash.substr(1) == '')) {
        try {
          const hash = location.hash.substr(1);
          const hashArr = this.settingsReference.map((it: any) => it.hashString)
          console.log()
          if (hashArr.indexOf(hash) !== -1) {
            this.openViewPostModal(hash)
            return
          } else {
            location.hash = ''
            this.componentName = ''
          }
        } catch (err) {
          location.hash = ''
          this.componentName = ''
        }
      } else {
        location.hash = ''
        this.componentName = ''
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