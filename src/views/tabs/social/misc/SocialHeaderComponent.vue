<template>
  <div class="social-header">
    <div class="social-header-upper">
      <div class="social-app-label">WorkoutApp</div>
      <div class="social-upper-options">
        <div class="option" @click="$emit('goToSearchPage')"><ion-icon :icon="search" /></div>
        <div class="option"><ion-icon :icon="settings" /></div>
      </div>
    </div>
    <div class="social-header-lower">
      <div class="social-details" @click="$emit('goToUserPage', user.userId)">
        <div class="social-profile-pic"></div>
        <div>{{ user.getUserName() }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { search, settings } from "ionicons/icons";
import {userStore} from "@/stores/user";

export default defineComponent({
  components: {
    IonIcon
  },
  setup() {
    return {
      search,
      settings
    };
  },
  data() {
    return {
      user: userStore.state.sessionUser
    }
  },
  methods: {}
});
</script>

<style scoped>
  .social-header {
    display: flex;
    justify-content: center;
    align-self: center;
    width: 100%;
    flex-direction: column;
    background-color: var(--theme-bg-1);
    padding: 15px;
  }
  .social-header-upper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .social-app-label {
    font-size: 28px;
  }
  .social-upper-options {
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .social-upper-options .option {
    margin-left: 10px;
    background-color: var(--comment-background);
    color: var(--primary-text);
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .social-header-lower {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .social-details {
    display: flex;
    align-items: center;
  }
  .social-profile-pic {
    background-color: whitesmoke;
    height: 30px;
    width: 30px;
    border-radius: 25px;
    margin-right: 10px;
  }
</style>