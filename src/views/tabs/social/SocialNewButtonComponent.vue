<template>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openViewPostModal()">
            <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>

<script lang="ts">
  import { add } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import { IonIcon, modalController, IonFab, IonFabButton } from '@ionic/vue';
  import NewPostModalComponent from '@/views/tabs/social/posts/modals/new-post/NewPostModalComponent.vue';

  export default defineComponent({
    components: {
      IonIcon,
      IonFab,
      IonFabButton
    },
    methods: {
      async openViewPostModal():Promise<any> {
        const modal = await modalController
          .create({
            component: NewPostModalComponent,
            cssClass: 'fullscreen',
            swipeToClose: false
          })
        await modal.present()

        const { data } = await modal.onDidDismiss()
        if (data) {
          this.$emit("create-post", data)
        }
      },
    },
    setup() {
      return {
        add
      };
    },
  });
</script>