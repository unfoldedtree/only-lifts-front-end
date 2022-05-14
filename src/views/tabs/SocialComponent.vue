<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Social</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="post-container">
          <post-component @viewPost="openViewPostModal" v-for="post in filteredPosts" v-bind:key="post.id" v-bind:post="post" />
      </div>
      <social-new-button-component @create-post="createPost" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, modalController} from '@ionic/vue';
  import { defineComponent } from 'vue';
  import SocialNewButtonComponent from '@/views/tabs/social/SocialNewButtonComponent.vue';
  import PostComponent from './social/posts/PostComponent.vue';
  import {Post} from "@/models/post";
  import axios from "axios";
  import PostViewModalComponent from "@/views/tabs/social/posts/modals/view-post/PostViewModalComponent.vue";
  import { search } from "ionicons/icons";

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonToolbar,
      IonTitle,
      SocialNewButtonComponent,
      PostComponent,
    },
    setup() {
      return {
        search
      };
    },
    data() {
      return {
        filteredPosts: [] as any[]
      }
    },
    methods: {
      async createPost(post: Post) {
        const { data } = await axios.post('http://localhost:3000/posts', post)
        const newPost = new Post(data)
        this.filteredPosts.unshift(newPost)
      },
      async openViewPostModal(post: any):Promise<any> {
        const modal = await modalController
            .create({
              component: PostViewModalComponent,
              cssClass: 'fullscreen',
              swipeToClose: false,
              componentProps: {
                post: post
              }
            })
        await this.$router.push({
          query: { id: post.id }
        });
        await modal.present()
        await modal.onDidDismiss()
        await this.$router.replace(this.$route.path)
      },
    },
    async mounted() {
      const { data } = await axios.get('http://localhost:3000/posts')
      this.filteredPosts = data


      if (this.$route.query.id) {
          const foundPost = this.filteredPosts.filter((it: any) => it.id == this.$route.query.id)[0]
          if (foundPost) {
            await this.openViewPostModal(foundPost)
          }
      }
    }
  });
</script>

<style scoped>
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