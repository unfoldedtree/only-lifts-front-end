<template>
    <div class="post-outer-div">

        <div class="post-upper-details">
            <div class="modal-back-button" @click="closeModal()">
                <ion-icon :icon="close" />
            </div>
            <div>New Conversation</div>
            <div class="create-post-submit" @click="buildMessage()">
                <ion-icon :icon="send" />
            </div>
        </div>
        
        <div class="post-content">
          <div class="post-recipients">
            <div class="post-to">To</div>
            <div class="to-user-array">
              <div class="to-user" v-for="user in recipients" :key="user.id">{{ user.name }}</div>
            </div>
          </div>

            <ion-textarea auto-grow placeholder="What would you like to say?" v-model="messageContent"></ion-textarea>
        </div>

    </div>
</template>

<script lang="ts">
  import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
  import { IonIcon, modalController, IonTextarea } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { Post } from "@/models/post";

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
    props: ["recipients"],
    data() {
      return {
        messageContent: ""
      }
    },
    methods: {
      closeModal() {
        modalController.dismiss()
      },
      buildMessage() {
        const messageObj = {
          id: Date.now(),
          send: Date.now(),
          content: this.messageContent,
          recipients: this.recipients.map((it: any) => it.id)
        }
        modalController.dismiss(messageObj)
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
    .post-recipients {
      display: flex;
      align-items: center;
      padding: 10px 10px 0 10px;
    }
    .post-to {
      padding-right: 10px;
      padding-bottom: 10px;
    }
    .to-user-array {
      padding-bottom: 10px;
      display: flex;
      flex: 1;
      overflow: auto;
    }
    .to-user {
      white-space: nowrap;
      font-size: 75%;
      margin: 5px;
      padding: 5px 8px;
      border-radius: 25px;
      background-color: var(--theme-purple);
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
        /*margin-top: 10px;*/
        padding: 0 10px;
    }
</style>