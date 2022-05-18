<template>
      <div class="post-outer-div">
        <div class="header">
          <div>
            <ion-icon @click="closeModal()" :icon="close" />
            <ion-label>User Account</ion-label>
          </div>
        </div>

        <div class="post-content">
          <div class="program">
            <div class="program-name">Name: {{ user.getUserName() }}</div>
            <div class="program-name">Email: {{ user.email }}</div>
            <div class="program-name">Registered: {{ (new Date(+user.registeredAt)).toLocaleString() }}</div>
          </div>
        </div>

        <div class="post-content">
          <ion-list mode="md" lines="full">
            <ion-item @click="changePassword"><ion-label>Change Password</ion-label></ion-item>
            <ion-item @click="signOut"><ion-label>Log Out</ion-label></ion-item>
          </ion-list>
        </div>

      </div>
</template>

<script lang="ts">
import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
import { IonList, IonLabel, IonItem, IonIcon, modalController, IonPage, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from "axios";
import {userStore} from "@/stores/user";
import {User} from "@/models/user";

export default defineComponent({
  components: {
    IonIcon,
    IonList,
    IonLabel,
    IonItem
  },
  setup() {
    return {
      thumbsUp,
      mail,
      ellipsisHorizontal,
      chevronBackOutline,
      send,
      close
    };
  },
  data() {
    return {
      user: userStore.state.sessionUser
    }
  },
  methods: {
    closeModal() {
      modalController.dismiss()
    },
    async signOut() {
      const { data } = await axios.post('http://localhost:3000/auth/logout')
      await modalController.dismiss()
      console.log(data)
      await this.$router.push({ name: 'login'})
    },
    async changePassword() {
      console.log("clicked change password")
    }
  }
});
</script>

<style scoped>
* {
  --bs-gray-base: #a7a7a7;
  --primary-text: #E4E6EB;
  --card-background-flat: #323436;
  --bs-text-muted: #777;
  --comment-background: #3A3B3C;
  --card-background: #242526;
  --theme-bg-1: #18191a;
  --theme-dark: #0E0E10;
  --theme-post: #1c1e21;
  --theme-medium: #1C1C1E;
}
ion-list {
  padding: 0;
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
  margin: 5px 0;
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
.header {
  padding: 12px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--theme-bg-1);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
}
.header div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.header div ion-icon {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
  margin-right: 7px;
}
</style>