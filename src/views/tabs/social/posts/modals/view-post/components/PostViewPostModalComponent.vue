<template>
    <div class="post-outer-div">

        <div class="post-upper-details">
            <div class="modal-back-button" @click="closeModal()">
                <ion-icon :icon="chevronBackOutline" />
            </div>
            <div class="post-profile-pic">
                <div class="post-profile-image"></div>
            </div>
            <div class="post-profile-user-info">
                <div>William McMahan</div>
                <div>
                    <span class="post-date-info">{{ processDate(post.postDate) }}</span>
                </div>
            </div>
             <div class="post-options">
                 <div class="post-options-button">
                     <ion-icon class="post-options-button" :icon="ellipsisHorizontal" />
                 </div>
            </div>
        </div>
        
        <p>{{ post.content }}</p>

        <div class="post-lower-details">
            <div class="post-likes-div">
                <span class="post-likes-count">{{ post.likes.length }}</span>
                <ion-icon :icon="thumbsUp" />
            </div>

            <div class="post-comments-div">
                <span class="post-comments-count">{{ post.comments.length }} comments</span>
            </div>
        </div>

        <div class="post-button-div">
            <div class="post-button">Like</div>
            <div class="post-button">Comment</div>
            <div class="post-button">Share</div>
        </div>

        <div class="post-comments-container-div">
            <div class="post-comment" v-for="comment in post.comments" v-bind:key="comment.id">
                <div class="comment-details">
                    <div class="comment-profile-pic">
                        <div class="comment-profile-image"></div>
                    </div>
                    <div class="comment-info">
                        <div class="comment-user-info">Ashley McMahan</div>
                        <div class="comment-content">
                            {{ comment.content }}
                        <!-- <span class="comment-date-info">{{ processDate(post.postDate) }}</span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IonIcon, modalController } from '@ionic/vue';
  import { thumbsUp, mail, ellipsisHorizontal, chevronBackOutline } from 'ionicons/icons';

  export default defineComponent({
    components: {
        IonIcon
    },
    setup() {
      return {
          thumbsUp,
          mail,
          ellipsisHorizontal,
          chevronBackOutline
      };
    },
    props: ['post'],
    data() {
        return {
            
        }
    },
    methods: {
        closeModal() {
            modalController.dismiss()
        },
        dateStringToNumber(dateString: string) {
            const dateArray = dateString.split(/[\sT]+/)
            return Date.parse(`${dateArray[0]} ${dateArray[1]}`);
        },
        processDate(postDate: string) {
            let timeText = "Now"
            const milliseconds = Math.abs(this.dateStringToNumber(postDate) - Date.parse(Date()));
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
    .post-modal-container {
        padding: 0 0 0 0;
        overflow: auto;
    }
    .post-outer-div {
        width: 100%;
        background-color: var(--theme-bg-1);
        padding: 5px 15px 0px 15px;
        max-width: 800px;
    }
    .modal-back-button {
        color: var(--bs-gray-base);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 150%;
        cursor: pointer;
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
        margin-left: 10px;
    }
    .post-profile-image {
        border-radius: 50%;
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: whitesmoke;
    }
    .post-upper-details {
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
        /* margin-bottom: 20px; */
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
    .post-lower-details {
        margin:  0 5px;
        display: flex;
        justify-content: space-between;
    }
    .post-likes-div, .post-comments-div {
        margin-right: 10px;
        display: flex;
        align-items: center;
        font-size: 85%;
        color: var(--bs-gray-base);
    }
    .post-likes-count {
        margin-right: 5px;
    }
    .post-comments-count {
        cursor: pointer;
    }
    .post-button-div {
        margin: 15px -15px 0px -15px;
        display: flex;
        flex-direction: row;
        height: 40px;
        justify-content: space-evenly;
        align-items: center;
        width: calc(100% + 30px);
        box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
    }
    .post-button {
        cursor: pointer;
        width: 100%;
        display: flex;
        height: 40px;
        justify-content: space-evenly;
        align-items: center;
        color: var(--bs-text-muted);
        border-top: 1px;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        border-style: solid;
        border-color: var(--card-background-flat);
    }
    .post-button:nth-of-type(2) {
        border-left: 1px;
        border-right: 1px;
        border-style: solid;
        border-color: var(--card-background-flat);
    }
    .post-button:hover {
        background-color: var(--card-background-flat);
    }
    .post-comments-container-div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 0;
    }   
    .post-comment {
        margin: 10px 0 0 0;
    }
    .comment-profile-pic {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        margin: 7px 10px 0 0;
    }
    .comment-profile-image {
        border-radius: 50%;
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: whitesmoke;
    }
    .comment-details {
        display: flex;
        flex-direction: row;
        margin-bottom: 7px;
    }
    .comment-info {
        background-color: var(--comment-background);
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-radius: 10px;
    }
    .comment-user-info {
        margin-bottom: 7px;
        color: var(--bs-text-muted);
    }
</style>