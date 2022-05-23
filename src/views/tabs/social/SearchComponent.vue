<template>
  <ion-page>
    <ion-content>
      <div class="search-outer-div">
        <div class="search-header">
          <div class="back-button" @click="goBack">
            <ion-icon :icon="arrowBack" />
          </div>
          <ion-input
              v-model="searchValue"
              placeholder="Search for..."
              debounce="750"
              clearInput="true"
              @ionChange="searchTrigger" />
        </div>

        <div class="search-content">
          <SearchUserComponent
              v-for="user in foundUsers"
              :key="user.userId"
              :user="user"
              @click="goToUserPage(user.userId)"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, arrowBack } from 'ionicons/icons';
import { IonIcon, IonInput, IonPage, IonContent, useIonRouter } from '@ionic/vue';
import SearchUserComponent from './misc/SearchUserComponent.vue';
import { defineComponent } from 'vue';
import { userStore } from "@/stores/user";
import axios from "axios";
import {User} from "@/models/user";

export default defineComponent({
  components: {
    IonIcon,
    IonInput,
    IonPage,
    IonContent,
    SearchUserComponent
  },
  setup() {
    return {
      ionRouter: useIonRouter(),
      thumbsUp,
      mail,
      ellipsisHorizontal,
      chevronBackOutline,
      send,
      arrowBack
    };
  },
  data() {
    return {
      searchValue: '',
      foundUsers: [] as any[]
    }
  },
  methods: {
    goBack() {
      this.ionRouter.back()
    },
    goToUserPage(userId: string) {
      this.ionRouter.push({ name: 'view-user', params: { userId: userId} });
    },
    async searchTrigger() {
      if (this.searchValue) {
        const { data } = await axios.get(`http://localhost:3000/profile/search/${this.searchValue.trim()}`)
        data.map((user: any) => {
          this.foundUsers.push(new User(user))
        })
      } else {
        this.foundUsers = []
      }
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
.search-outer-div {
  margin: 0 auto;
  padding: 0 0 0 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: var(--theme-bg-1);
}
.back-button {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  margin-right: 10px;
  cursor: pointer;
}
.search-header {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  background-color: var(--theme-bg-1);
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  margin-bottom: 10px;
}
.search-header ion-input {
  --padding-top: 10px;
  --padding-end: 15px;
  --padding-bottom: 10px;
  --padding-start: 15px;
  border-radius: 25px;
  background-color: var(--card-background-flat);
  flex: 1;
}
</style>