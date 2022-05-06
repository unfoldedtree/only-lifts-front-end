<template>
  <div class="to-content-header" :class="inList ? 'in-list' : ''">
    <div class="to-profile-pic">
      <div class="to-profile-image"></div>
    </div>
    <div class="to-profile-user-info">
      <div>{{ user.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
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
  props: ["user", "inList"],
  data() {
    return {
      postContent: ""
    }
  },
  methods: {
    closeModal() {
      return;
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
  .to-content-header {
    padding: 5px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .to-content-header.in-list {
    background-color: var(--card-background-flat);
  }
  .to-profile-pic {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  }
  .to-profile-image {
    border-radius: 50%;
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: whitesmoke;
  }
  .to-profile-user-info {
    color: var(--primary-text);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    margin: 7px 14px 7px 7px;
    text-wrap: none;
  }
</style>