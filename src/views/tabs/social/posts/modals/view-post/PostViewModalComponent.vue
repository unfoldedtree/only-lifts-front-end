<template>
    <div class="post-modal-container">
        <post-view-post-modal-component v-bind:post="post"></post-view-post-modal-component>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import PostViewPostModalComponent from './components/PostViewPostModalComponent.vue';

export default defineComponent({
    components: {PostViewPostModalComponent},
    props: ['post'],
    methods: {},
    data() {
        return {}
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
