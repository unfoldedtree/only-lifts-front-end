<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Track</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col id="calender-col">
            <ion-datetime presentation="date" color="tertiary" value="2012-12-15T13:47:20.789"></ion-datetime>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonCol, IonRow, IonGrid } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonDatetime,
      IonCol,
      IonRow,
      IonGrid
    },
  });
</script>

<style scoped>
  #calender-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ion-datetime {
    width: 100%;
    max-width: 800px;
  }
</style>