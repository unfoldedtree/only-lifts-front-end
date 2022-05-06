<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Social</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="post-container">
          <post-component v-for="post in filteredPosts" v-bind:key="post.id" v-bind:post="post" />
      </div>
      <social-new-button-component @create-post="createPost" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import user_data from '../../../public/dev-data/user/user-data.json';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import SocialNewButtonComponent from '@/views/tabs/social/SocialNewButtonComponent.vue';
  import PostComponent from './social/posts/PostComponent.vue';
  import {Post} from "@/models/post";

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      SocialNewButtonComponent,
      PostComponent,
    },
    setup() {
      return {};
    },
    data() {
      return {
        userJson: user_data,
        filteredPosts: [{}]
      }
    },
    methods: {
      extractPosts() {
        const posts = this.userJson.map(({ posts }) => posts).flat()
        const filteredPosts = posts.flat().sort((a, b) => b.postDate - a.postDate)
        this.filteredPosts = filteredPosts
      },
      createPost(post: Post) {
        this.filteredPosts.unshift(post)
      }
    },
    beforeMount() {
      this.extractPosts()
    }
  });
</script>

<style>
  #post-container {
    padding: 10px 0;
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>