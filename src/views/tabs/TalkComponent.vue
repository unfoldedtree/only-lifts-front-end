<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Talk</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      Talk Component
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
    },
  });
</script>

<style>
</style>