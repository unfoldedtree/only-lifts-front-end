<template>
    <div class="post-outer-div">

        <div class="post-upper-details">
            <div class="modal-back-button" @click="closeModal()">
                <ion-icon :icon="close" />
            </div>
            <div>Create Post</div>
            <div class="create-post-submit" @click="buildPost()">
                <ion-icon :icon="send" />
            </div>
        </div>
        
        <div class="post-content">
            <div class="post-content-header">
                <div class="post-profile-pic">
                    <div class="post-profile-image"></div>
                </div>
                <div class="post-profile-user-info">
                    <div>{{ getUserName() }}</div>
                </div>
                <div class="post-options">
                    <div class="post-options-button">
                        <ion-icon class="post-options-button" :icon="ellipsisHorizontal" />
                    </div>
                </div>
            </div>

            <ion-textarea auto-grow placeholder="What progress did you make today?" v-model="postContent"></ion-textarea>
        </div>

    </div>
</template>

<script lang="ts">
  import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
  import { IonIcon, modalController, IonTextarea } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { Post } from "@/models/post";
  import { userStore } from "@/stores/user";

  export default defineComponent({
    components: {
        IonIcon,
        IonTextarea
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
        postContent: ""
      }
    },
    methods: {
      closeModal() {
        modalController.dismiss()
      },
      getUserName() {
        return userStore.state.sessionUser.getUserName()
      },
      buildPost() {
        const postObj = {
          content: this.postContent
        }
        const post = new Post(postObj)
        modalController.dismiss(post)
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
    .post-outer-div {
        margin: 0 auto;
        padding: 0 0 0 0;
        overflow: auto;
        width: 100%;
        height: 100%;
        max-width: 800px;
        background-color: var(--theme-bg-1);
    }
    .modal-back-button {
        color: var(--bs-gray-base);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 150%;
        cursor: pointer;
    }
    .post-upper-details {
        padding: 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: var(--card-background-flat);
        box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
    }
    .create-post-submit {
        font-size: 120%;
        color: #6a64ff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .post-options-button {
        cursor: pointer;
    }
    .post-content {
        padding-top: 10px;
    }
    .post-content-header {
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .post-profile-pic {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
    }
    .post-profile-image {
        border-radius: 50%;
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: whitesmoke;
    }
    .post-profile-user-info {
        color: var(--primary-text);
        text-decoration: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 100%;
        margin: 7px 14px 7px 7px;
    }
    .post-options {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: flex-start;
        color: var(--bs-gray-base);
    }
    ion-textarea {
        margin-top: 10px;
        padding: 0 10px;
    }
</style>