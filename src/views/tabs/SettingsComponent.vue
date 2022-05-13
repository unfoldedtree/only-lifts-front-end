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
          <ion-item @click="signOut"><ion-label>Log Out</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Workout</ion-label></ion-item-divider>

          <ion-item @click="openModal('view-programs')"><ion-label>View Workout Programs</ion-label></ion-item>
          <ion-item><ion-label>Select Workout Program</ion-label></ion-item>
          <ion-item @click="openModal('build-program')"><ion-label>Build Workout Program</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Increment Scheme</ion-label></ion-item-divider>

          <ion-item><ion-label>View Increment Schemes</ion-label></ion-item>
          <ion-item><ion-label>Build Increment Scheme</ion-label></ion-item>
          <ion-item><ion-label>Edit Increment Scheme</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>Miscellaneous</ion-label></ion-item-divider>

          <ion-item @click="openModal('view-exercises')"><ion-label>View Exercises</ion-label></ion-item>
          <ion-item><ion-label>Add Exercise</ion-label></ion-item>

          <ion-item-divider sticky><ion-label>System</ion-label></ion-item-divider>

          <ion-item><ion-label>Settings</ion-label></ion-item>
          <ion-item><ion-label>History</ion-label></ion-item>

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
import {query} from "express";
import axios from "axios";

  export default defineComponent({
    methods: {
      async openModal(viewString: string, idString?: string):Promise<any> {
        const foundEl = this.settingsReference.filter((it: any) => {
          return it.hashString == viewString
        })
        this.componentName = foundEl[0].component
        this.componentCategory = foundEl[0].category

        const query = Object.assign({}, this.$route.query);
        query.view = viewString;
        if (idString) {
          query.id = idString
        }
        await this.$router.push({ query });

        const modal = await modalController
        .create({
          component: this.dynamicComponent,
          cssClass: 'fullscreen',
          swipeToClose: false
        })

        await modal.present()

        await modal.onDidDismiss()
        await this.$router.push(this.$route.path);
        this.componentName = ''
      },
      async signOut() {
        const { data } = await axios.post('http://localhost:3000/auth/logout')
        console.log(data)
        await this.$router.push({ name: 'login'})
      }
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
        componentCategory: '',
        settingsReference: [
          { hashString: 'view-exercises', category: 'exercises', component: 'ViewExercisesComponent' },
          { hashString: 'view-programs', category: 'workout', component: 'ViewProgramsListComponent' },
          { hashString: 'edit-program', category: 'workout', component: 'ViewProgramsListComponent' },
          { hashString: 'build-program', category: 'workout', component: 'BuildProgramComponent' }
        ],
      }
    },
    computed: {
      dynamicComponent(): any {
        if (this.componentName == "") {
          return null
        }
        return markRaw(defineAsyncComponent(() => import(`@/views/tabs/settings/${this.componentCategory}/${this.componentName}.vue`) ))
      }
    },
    mounted() {
      if (this.$route.query.view) {
        try {
          const view = this.$route.query.view.toString();
          const id = this.$route.query.id ? this.$route.query.id.toString() : ''
          const queryArr = this.settingsReference.map((it: any) => it.hashString)
          if (queryArr.indexOf(view) !== -1) {
            this.openModal(view, id)
            return
          }
        } catch (e) {
          console.log(e)
        }
      }
      this.$router.push(this.$route.path);
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