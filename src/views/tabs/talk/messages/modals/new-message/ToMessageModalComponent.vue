<template>
    <div class="post-outer-div">

        <div class="post-upper-details">
            <div class="modal-back-button" @click="closeModal()">
                <ion-icon :icon="close" />
            </div>
            <div>New Conversation</div>
            <div class="create-post-submit" @click="continueProcess()">
                <ion-icon :icon="send" />
            </div>
        </div>
        
        <div class="post-content">
            <ion-item>
              <ion-label position="floating">To</ion-label>
              <ion-input clear-input="true" v-model="filterText" @ionChange="filterUsers"></ion-input>
            </ion-item>
            <div class="to-user-array">
              <div class="to-user" v-for="user in addArray" :key="user.id">{{ user.name }}</div>
            </div>
            <div class="to-user-container">
              <ToUserComponent v-for="user in filteredUsers" :key="user.id" :inList="addArray.includes(user)" :user="user" @click="addUser(user)" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
  import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
  import {IonIcon, modalController, IonInput, IonLabel, IonItem} from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { Post } from "@/models/post";
  import ToUserComponent from "@/views/tabs/talk/messages/modals/new-message/ToUserComponent.vue";

  export default defineComponent({
    components: {
        IonIcon,
        IonInput,
        IonLabel,
        IonItem,
        ToUserComponent
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
    props: ["users"],
    data() {
      return {
        filterText: "",
        postContent: "",
        addArray: [] as any[],
        filteredUsers: this.users,
      }
    },
    methods: {
      closeModal() {
        modalController.dismiss()
      },
      addUser(user: any) {
        if (this.addArray.includes(user)) {
          this.addArray.splice(this.addArray.indexOf(user), 1)
        } else {
          this.addArray.push(user)
        }
      },
      filterUsers() {
        this.filteredUsers = this.users.filter((it: any) => it.name.toLowerCase().includes(this.filterText.toLowerCase()))
      },
      continueProcess() {
        modalController.dismiss(this.addArray)
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
        --padding-start: 18px;
        --padding-end: 18px;
    }
    .post-outer-div {
        margin: 0 auto;
        padding: 0 0 0 0;
        overflow: auto;
        width: 100%;
        height: 100%;
        max-width: 800px;
        /*background-color: var(--theme-bg-1);*/
        background-color: #000000;
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
    .to-user-array {
      padding: 10px 12px;
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
    ion-textarea {
        margin-top: 10px;
        padding: 0 10px;
    }
</style>