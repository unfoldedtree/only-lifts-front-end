<template>
  <div class="post-outer-div">
    <div class="header">
      <div>
        <ion-icon @click="closeModal()" :icon="close" />
        <ion-label>{{ getRoomName() }}</ion-label>
      </div>
    </div>
    <div class="post-content" id="post-content" ref="postContent">
      <div
          v-for="message in mappedMessages"
          :key="message.id"
          :message="message"
          class="message"
          :class="isAuthUser(message.posterId) ? 'currentUser' : ''"
      >
        <div class="message-user-pic"></div>
        <div class="message-contents">
          <div class="message-user-name">
            {{ getName(message.user) }}
          </div>
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="post-add">
      <ion-icon :icon="addCircleOutline" />
      <ion-input placeholder="What do you have to say?" v-model="newMessageText"></ion-input>
      <ion-icon :icon="send" @click="sendMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { close, addCircleOutline, send } from 'ionicons/icons';
import { IonIcon, IonLabel, modalController, IonInput } from '@ionic/vue';
import {userStore} from "@/stores/user";
import axios from "axios";

export default defineComponent({
  components: {
    IonIcon,
    IonLabel,
    IonInput
  },
  props: ['homeRef', 'room'],
  setup() {
    return {
      close,
      addCircleOutline,
      send
    }
  },
  data() {
    return {
      mappedMessages: [] as any[],
      newMessageText: '',
      authUser: this.getAuthUser()
    }
  },
  methods: {
    closeModal() {
      modalController.dismiss()
    },
    isAuthUser(posterId: any) {
      return userStore.state.sessionUser.userId === posterId
    },
    getAuthUser() {
      const authUser = this.room.users.filter((user: any) => user.userId == userStore.state.sessionUser.userId)[0]
      return authUser
    },
    getRoomName () {
      if (this.room.name) {
        return this.room.name
      } else {
        return this.processUsers()
      }
    },
    processUsers() {
      const displayUsers = this.room.users.filter((user: any) => user.userId !== userStore.state.sessionUser.userId)
      if (displayUsers.length > 1) {
        return `${this.getName(displayUsers[0])} + ${displayUsers.length - 1}`
      } else {
        return this.getName(displayUsers[0])
      }
    },
    async mapUserToMessages() {
      return new Promise((resolve, reject) => {
        const mappedMessages = [] as any[];
        this.room.messages.map((message: any) => {
          this.room.users.map((user: any) => {
            if (user.userId === message.posterId) {
              message.user = user;
            }
          })
          mappedMessages.push(message)
        })
        this.mappedMessages = mappedMessages;
        resolve(true)
      })
    },
    getName(user: any) {
      if (user.middleName) {
        return `${user.firstName} ${user.middleName} ${user.lastName}`
      } else {
        return `${user.firstName} ${user.lastName}`
      }
    },
    async sendMessage() {
      const messageObj = {
        content: this.newMessageText,
        taggedIds: [],
        attachments: []
      }
      const { data } = await axios.post(`http://localhost:3000/chat-room/${this.room.id}`, { message: messageObj })
      this.updateRoom(data);
      data.user = this.authUser;
      this.mappedMessages.push(data)
      console.log(data)
      this.newMessageText = '';
      this.scrollToBottom()
    },
    updateRoom(newMessage: any) {
      const modifiedRoom = JSON.parse(JSON.stringify(this.room))
      modifiedRoom.messages.push(newMessage)
      this.homeRef.updateRoom(this.room, modifiedRoom)
    },
    scrollToBottom() {
      const el = this.$refs.postContent;
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        });
      }
    }
  },
  async mounted() {
    await this.mapUserToMessages()
    this.scrollToBottom()
  }
})
</script>

<style scoped>
.fullscreen {
  --height: 100%;
  --width: 100%;
}
.fullscreen .ion-page {
  height: 100%;
}
.post-outer-div {
  margin: 0 auto 55px auto;
  /*padding: 0 0 50px 0;*/
  padding: 0 0 0 0;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: #000000;
}
.header {
  position: absolute;
  width: 100%;
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
.post-content {
  margin-top: 48px;
  padding: 10px 10px 0 10px;
}
.message {
  width: 100%;
  display: flex;
  flex-direction: row;
  max-height: max-content;
  margin-bottom: 10px;
  /*scroll-padding-bottom: 10px;*/
  /*scroll-margin-bottom: 10px;*/
}
.message.currentUser {
  flex-direction: row-reverse;
}
.message-user-pic {
  height: 20px;
  width: 20px;
  background-color: var(--bs-text-muted);
  border-radius: 25px;
  margin-right: 10px;
  margin-top: auto;
  flex: none;
}
.currentUser .message-user-pic {
  margin-right: 0;
  margin-left: 10px;
}
.message-user-name{
  font-size: 85%;
  margin: 0 0 5px 0;
}
.currentUser .message-user-name {
  margin: 0 0 5px 0;
  text-align: end;
}
.message-contents {
  display: flex;
  flex-direction: column;
}
.message-content {
  padding: 5px 10px;
  background-color: var(--card-background-flat);
  border-radius: 25px;
  align-self: flex-start;
}
.currentUser .message-content {
  background-color: var(--theme-purple);
  align-self: flex-end;
}
.post-add {
  height: 55px;
  background-color: #000000;
  position: absolute;
  bottom:  0;
  width: 100%;
  display: flex;
  align-items: center;
}
.post-add ion-icon {
  color: var(--theme-purple);
  font-size: 24px;
  margin: 5px;
}
.post-add ion-input {
  --padding-bottom: 10px;
  --padding-start: 10px;
  --padding-end: 10px;
  --padding-top: 10px;
  border-radius: 25px;
  background-color: var(--card-background-flat);
}
</style>