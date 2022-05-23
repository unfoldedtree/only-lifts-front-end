<template>
    <div class="post-outer-div">
        <div class="post-upper-details">
            <div class="post-profile-pic">
                <div class="post-profile-image"></div>
            </div>
            <div class="post-profile-user-info" @click="openViewRoomModal">
                <div>{{ processUsers() }}</div>
                <div>
                    <span class="post-date-info">{{ room.messages[room.messages.length - 1].content }}</span>
                </div>
            </div>
             <div class="post-options">
                 <div class="post-options-button" @click="presentActionSheet(room)">
                     <ion-icon class="post-options-button" :icon="ellipsisHorizontal" />
                 </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IonIcon, modalController, actionSheetController } from '@ionic/vue';
  import { thumbsUp, mail, ellipsisHorizontal, caretForwardCircle, close, heart, trash, share } from 'ionicons/icons';
  import ChatRoomViewModalComponent from "@/views/tabs/talk/messages/modals/room/ChatRoomViewModalComponent.vue";
  import {userStore} from "@/stores/user";

  export default defineComponent({
    components: {
        IonIcon
    },
    setup() {
      return {
          thumbsUp,
          mail,
          ellipsisHorizontal
      };
    },
    props: ['homeRef', 'room', 'users'],
    data() { return {} },
    methods: {
        async openViewRoomModal():Promise<any> {
            const modal = await modalController
                .create({
                    component: ChatRoomViewModalComponent,
                    cssClass: 'fullscreen',
                    swipeToClose: false,
                    componentProps: {
                        homeRef: this.homeRef,
                        room: this.room
                    }
                })
            return modal.present()
        },
        processUsers() {
          const displayUsers = this.users.filter((user: any) => user.userId !== userStore.state.sessionUser.userId)
          if (displayUsers.length > 1) {
            return `${this.getName(displayUsers[0])} + ${displayUsers.length - 1}`
          } else {
            return this.getName(displayUsers[0])
          }
        },
        getName(user: any) {
          if (user.middleName) {
            return `${user.firstName} ${user.middleName} ${user.lastName}`
          } else {
            return `${user.firstName} ${user.lastName}`
          }
        },
        processDate(postDate: number) {
            let timeText = "Now"
            const milliseconds = Math.abs(postDate - Date.now());
            const hours = milliseconds / 36e5
            const h = Math.floor(hours);
            const m = Math.floor(hours * 60)
            const s = Math.floor(hours * 3600)
            const d = Math.floor(hours / 24)
            const y = Math.floor(d / 365)
            if (s > 0 && s < 60) {
                timeText = `${s}s`
            } else if (m > 0 && m < 60) {
                timeText = `${m}m`
            } else if (h > 0 && h < 24) {
                timeText = `${h}h`
            } else if (d > 0 && d < 365) {
                timeText = `${d}d`
            } else if (y > 0) {
                timeText = `${y}y`
            }
            return timeText
        },
        async presentActionSheet(post: any) {
            const actionSheet = await actionSheetController
            .create({
                header: 'Options',
                cssClass: 'my-custom-class',
                buttons: [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: trash,
                    id: 'delete-button', 
                    data: {
                    type: 'delete'
                    },
                    handler: () => {
                        console.log('Should Delete Post')
                        console.log(post)
                    },
                },
                {
                    text: 'Share',
                    icon: share,
                    data: 10,  
                    handler: () => {
                        console.log('Should Share Post')
                        console.log(post)
                    },
                },
                {
                    text: 'Edit',
                    icon: caretForwardCircle,
                    data: 'Data value',
                    handler: () => {
                        console.log('Should Edit Post')
                        console.log(post)
                    },
                },
                {
                    text: 'Favorite',
                    icon: heart,
                    handler: () => {
                        console.log('Should Favorite Post')
                        console.log(post)
                    },
                },
                {
                    text: 'Cancel',
                    icon: close,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked')
                        console.log(post)
                    },
                },
                ],
            });
            await actionSheet.present();

            const { role, data } = await actionSheet.onDidDismiss();
            console.log('onDidDismiss resolved with role and data', role, data);
        },
    },
  });
</script>

<style scoped>
    * {
        --bs-gray-base: #a7a7a7;
        --primary-text: #E4E6EB;
        --card-background-flat: #323436;
        --bs-text-muted: #777;
        --card-background: #242526;
        --theme-bg-1: #18191a;
        --theme-dark: #0E0E10;
        --theme-post: #1c1e21;
        --theme-medium: #1C1C1E;
    }
    .post-outer-div {
        width: 100%;
        /*box-shadow: 0 2px 4px rgb(0 0 0 / 30%);*/
        background-color: var(--theme-bg-1);
        padding: 5px 15px 0px 15px;
        /*margin: 0 -15px 10px -15px;*/
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
        margin-left: 15px;
    }
    .post-profile-image {
        border-radius: 50%;
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: whitesmoke;
    }
    .post-upper-details {
        margin: 0px -15px;
        width: calc(100% + 30px);
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .post-options {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: flex-start;
        color: var(--bs-gray-base);
        margin-right: 15px;
        margin-bottom: 20px;
    }
    .post-options-button {
        cursor: pointer;
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
    .post-date-info {
        font-size: 85%;
        color: var(--bs-gray-base);
    }
</style>