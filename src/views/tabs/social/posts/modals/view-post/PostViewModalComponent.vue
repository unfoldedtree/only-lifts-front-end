<template>
    <div class="post-modal-container">
        <post-view-post-modal-component
            :post="viewPost"
            @updatePost="updatePost"
        >
        </post-view-post-modal-component>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostViewPostModalComponent from './components/PostViewPostModalComponent.vue';
import {Post} from "@/models/post";

export default defineComponent({
    components: {PostViewPostModalComponent},
    props: ['homeRef', 'post'],
    data() {
      return {
        viewPost: this.post
      }
    },
    methods: {
      async updatePost(oldPost: Post, newPost: Post) {
        newPost.user = oldPost.user
        await this.homeRef.updatePost(oldPost, newPost)
        this.viewPost = newPost
      }
    }
})
</script>

<style>
    .fullscreen {
        --height: 100%;
        --width: 100%;
    }
    .fullscreen .ion-page {
        height: 100%;
    }
    .post-modal-container {
        padding: 0 0 0 0;
        overflow: auto;
        display: flex;
        justify-content: center;
        height: 100%;
    }
</style>
