<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Talk</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="talk-outer">
        <div id="talk-upper">
          <div class="talk-info-bar">
            <div class="talk-messages-counter">Messages (20)</div>
            <div class="talk-search-messages"><ion-icon :icon="search" /></div>
          </div>
          <div class="talk-tab-bar">
            <div class="talk-tab"
                 v-for="(tab, index) in tabArr"
                 :class="activeTab === index ? 'active' : ''"
                 :key="index"
                 @click="activeTab = index"
            >
              {{ tab }}
            </div>
          </div>
        </div>
        <div id="talk-container">
          <div v-if="filteredRooms.length">
            <talk-component v-for="room in filteredRooms" :homeRef="this" :key="room.id" :room="room" :users="room.users" />
          </div>
          <div class="no-messages-div" v-else>No Conversations</div>
        </div>
      </div>
      <talk-new-button-component @createRoom="createRoom" :users="filteredUsers"  />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
import { search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import TalkNewButtonComponent from "@/views/tabs/talk/TalkNewButtonComponent.vue";
import TalkComponent from "@/views/tabs/talk/messages/modals/TalkComponent.vue";
import axios from "axios";

export default defineComponent({
  components: {
    TalkNewButtonComponent,
    TalkComponent,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon
  },
  setup() {
    return {
      search
    }
  },
  data() {
    return {
      activeTab: 0,
      tabArr: ['all', 'friends', 'trainers', 'groups'],
      filteredUsers: [] as any[],
      filteredRooms: [] as any[]
    }
  },
  methods: {
    extractUsers(users: any[]) {
      this.filteredUsers = users.map((it: any) => {
        let name = `${it.firstName} ${it.lastName}`
        if (it.middleName) {
          name = `${it.firstName} ${it.middleName} ${it.lastName}`
        }

        return {
          id: it.userId,
          picture: it.profilePic,
          name: name
        }
      })
    },
    async updateRoom(oldRoom: any, newRoom: any) {
      this.filteredRooms[this.filteredRooms.indexOf(oldRoom)] = newRoom
    },
    async createRoom(details: any) {
      const message = details.messageObj;
      const room = details.chatMembers;
      const { data } = await axios.post('http://localhost:3000/chat-room/create', {
        message: message,
        room: room
      });
      this.filteredRooms.unshift(data)
    },
  },
  async beforeMount() {
    const profiles= await axios.get('http://localhost:3000/profiles/minimal');
    this.extractUsers(profiles.data)
    const chatRooms = await axios.get('http://localhost:3000/chat-rooms');
    this.filteredRooms = chatRooms.data.sort((a: any, b: any) => +b.firstMessage > +a.firstMessage ? 1 : -1)
  }
});
</script>

<style scoped>
.talk-outer {
  position: relative;
  background-color: var(--theme-bg-1);
  height: 100%;
}

#talk-upper {
  background-color: #000000;
  width: 100%;
  padding-bottom: 40px;
}

.talk-info-bar {
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.talk-tab-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.talk-tab {
  padding: 10px 15px;
  border-radius: 25px;
  margin: 0 7px;
}

.talk-tab.active {
  background-color: var(--theme-bg-1);
}

#talk-container {
  min-height: 75px;
  transform: translateY(-25px);
  width: 100%;
  position: absolute;
  background-color: var(--theme-bg-1);
  padding-top: 25px;
  border-radius: 25px;
}

.no-messages-div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
}
</style>