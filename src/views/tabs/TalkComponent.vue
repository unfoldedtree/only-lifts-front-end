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
            <div class="talk-tab active">Friends</div>
            <div class="talk-tab">Trainers</div>
            <div class="talk-tab">Groups</div>
            <div class="talk-tab">All</div>
          </div>
        </div>
        <div id="talk-container">
          <talk-component v-for="message in filteredMessages" :key="message.id" :message="message" :users="getUsers(message)" />
        </div>
      </div>
      <talk-new-button-component @create-message="createMessage" :users="filteredUsers"  />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import user_data from '../../../public/dev-data/user/user-data.json';
  import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/vue';
  import { search } from 'ionicons/icons';
  import { defineComponent } from 'vue';
  import TalkNewButtonComponent from "@/views/tabs/talk/TalkNewButtonComponent.vue";
  import TalkComponent from "@/views/tabs/talk/messages/modals/TalkComponent.vue";

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
        userJson: user_data,
        filteredUsers: [] as any[],
        filteredMessages: [] as any[]
      }
    },
    methods: {
      extractUsers() {
        this.filteredUsers = this.userJson.map((it: any) => {
          return {
            id: it._id,
            picture: it.picture,
            name: it.name
          }
        })

        console.log(this.filteredUsers)
      },
      getUsers(message: any) {
        return this.filteredUsers.filter((it: any) => message.recipients.includes(it.id))
      },
      createMessage(message: any) {
        this.filteredMessages.unshift(message)
      }
    },
    beforeMount() {
      this.extractUsers()
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
</style>