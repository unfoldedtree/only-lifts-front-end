<template>
  <ion-page>
    <ion-content>
      <div class="social-header">
        <div class="social-header-upper">
          <div class="option"><ion-icon :icon="arrowBack" @click="goBack" /></div>
          <div class="social-app-label">{{ user.getUserName() }}</div>
          <div class="option"><ion-icon :icon="search" /></div>
        </div>
        <div class="social-header-lower">
          <div class="social-pic-container">
            <div class="social-pic">
              <div class="user-img"></div>
            </div>
          </div>
          <div class="account-details">
            <div class="detail-options">
              <div class="detail-option">
                <div>{{ filteredPosts.length }}</div>
                <div>Posts</div>
              </div>
              <div class="detail-option">
                <div>{{ user.followers.length }}</div>
                <div>Followers</div>
              </div>
              <div class="detail-option">
                <div>{{ user.following.length }}</div>
                <div>Following</div>
              </div>
            </div>
          </div>
          <div class="account-views">
            <div class="btn-group btn-group-1">
              <div class="btn">
                <span>Posts</span>
              </div>
              <div class="btn">
                <span>About</span>
              </div>
            </div>
            <div class="btn-group btn-group-2">
              <div class="btn">
                <span>Follow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="social-posts">
        <post-component
            v-for="post in filteredPosts"
            :key="post.id"
            :post="post"
            @goToUserPage="goToUserPage"
            @viewPost="openViewPostModal"
            @updatePost="updatePost"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonIcon, IonPage, IonContent, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import PostComponent from "@/views/tabs/social/posts/PostComponent.vue";
import { search, settings, arrowBack } from "ionicons/icons";
import axios from "axios";
import {User} from "@/models/user";
import {Post} from "@/models/post";

export default defineComponent({
  components: {
    PostComponent,
    IonIcon,
    IonPage,
    IonContent
  },
  setup() {
    return {
      ionRouter: useIonRouter(),
      search,
      settings,
      arrowBack
    };
  },
  data() {
    return {
      user: new User({}),
      filteredPosts: [] as any[]
    }
  },
  methods: {
    goBack() {
      this.ionRouter.back()
      // this.ionRouter.push({ name: 'social' })
    },
    getName(user: any) {
      if (user.middleName) {
        return `${user.firstName} ${user.middleName} ${user.lastName}`
      } else {
        return `${user.firstName} ${user.lastName}`
      }
    },
    async getUser() {
      const foundProfile = await axios.get(`http://localhost:3000/profile/${this.$route.params.userId}`)
      return new User(foundProfile.data)
    },
    async getPosts() {
      let posts = [] as Post[];
      const { data } = await axios.get(`http://localhost:3000/posts/${this.$route.params.userId}`)
      posts = data.map((it: any) => new Post(it) )

      console.log("Posts: ", posts)
      return posts
    }
  },
  async mounted() {
    this.user = await this.getUser()
    this.filteredPosts = await this.getPosts()
  }
});
</script>

<style scoped>
.social-header {
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  flex-direction: column;
  background-color: var(--theme-bg-1);
  padding: 8px 5px 5px 5px;
}
.social-header-upper {
  background-color: var(--card-background);
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 24px;
  padding: 5px;
  border-radius: 25px;
}
.social-app-label {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.option {
  background-color: var(--comment-background);
  color: var(--primary-text);
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.social-header-lower {
  width: 100%;
  max-width: 800px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}
.social-pic-container {
  background-color: var(--card-background);
  /* box-shadow: 0 2px 4px rgb(0 0 0 / 30%); */
  border-radius: 50%;
  padding: 1px;
  position: relative;
}
.social-pic {
  width: 180px;
  height: 180px;
  margin: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--card-background-flat);
}
.user-img {
  width: 100%;
  height: 100%;
  background-color: var(--bs-text-muted);
  border-radius: 50%;
}
.account-details {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.account-details .detail-options {
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-text);
  margin-bottom: 15px;
}
.detail-option {
  font-size: 85%;
  width: 90px;
  /*margin: 0 10px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.account-views {
  padding: 5px;
  border-radius: 25px;
  background-color: var(--card-background);
  /*width: calc(100% - 10px);*/
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.account-views .btn-group {
  display: flex;
  flex-direction: row;
}
.account-views .btn-group .btn {
  height: 35px;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-background-flat);
}
.account-views .btn-group .btn:first-of-type {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.account-views .btn-group .btn:last-of-type {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.account-views .btn-group-2 .btn {
  border-radius: 25px;
  background-color: var(--theme-purple);
}
.social-posts {
  padding: 10px 0;
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>