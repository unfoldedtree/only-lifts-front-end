<template>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openNewMessageModal()">
            <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>

<script lang="ts">
  import { add } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import { IonIcon, modalController, IonFab, IonFabButton } from '@ionic/vue';
  import ToMessageModalComponent from "@/views/tabs/talk/messages/modals/new-message/ToMessageModalComponent.vue";
  import NewMessageModalComponent from "@/views/tabs/talk/messages/modals/new-message/NewMessageModalComponent.vue";

  export default defineComponent({
    components: {
      IonIcon,
      IonFab,
      IonFabButton
    },
    props: ["users"],
    methods: {
      async openNewMessageModal():Promise<any> {
        const toModal = await modalController
          .create({
            component: ToMessageModalComponent,
            cssClass: 'fullscreen',
            swipeToClose: false,
            componentProps: {
              users: this.users
            }
          })
        await toModal.present()

        const toResponse = await toModal.onDidDismiss()

        if (!toResponse.data) {
          return;
        }

        const newModal = await modalController
            .create({
              component: NewMessageModalComponent,
              cssClass: 'fullscreen',
              swipeToClose: false,
              componentProps: {
                recipients: toResponse.data
              }
            })
        await newModal.present()

        const newResponse = await newModal.onDidDismiss()

        if (!newResponse.data) {
          return;
        }

        this.$emit("createRoom", newResponse.data)
      },
    },
    setup() {
      return {
        add
      };
    },
  });
</script>