<template>
    <div class="post-outer-div">
      <div class="header">
        <div>
          <ion-icon @click="closeModal()" :icon="close" />
          <ion-searchbar mode="ios" v-model="filterValue"></ion-searchbar>
        </div>
      </div>
        
        <div class="post-content">
              <ion-accordion-group>
                <ion-accordion mode="md" toggle-icon="" v-for="exercise in filterExercises()" :key="exercise.id">
                    <ion-item slot="header">
                        <ion-label>{{ exercise.name }}</ion-label>
                    </ion-item>

                    <ion-list slot="content">
                        <ion-item>
                        <ion-label>Explanation: {{ exercise.explanation }}</ion-label>
                        </ion-item>
                        <ion-item>
                        <ion-label>URL: {{ exercise.url }}</ion-label>
                        </ion-item>
                        <ion-item>
                        <ion-label>Type: {{ exercise.type }}</ion-label>
                        </ion-item>
                        <ion-item>
                        <ion-label>Target: {{ exercise.target }}</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-accordion>

            </ion-accordion-group>
        </div>

    </div>
</template>

<script lang="ts">
  import { ellipsisHorizontal, chevronBackOutline, thumbsUp, mail, send, close } from 'ionicons/icons';
  import { IonList, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonIcon, modalController, IonSearchbar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import axios from "axios";

  export default defineComponent({
    components: {
        IonIcon,
        IonAccordion, 
        IonAccordionGroup,
        IonList, 
        IonLabel, 
        IonItem,
        IonSearchbar
    },
    setup() {
      return {
          thumbsUp,
          mail,
          ellipsisHorizontal,
          chevronBackOutline,
          send,
          close
      };
    },
    methods: {
      closeModal() {
        modalController.dismiss()
      },
      filterExercises() {
          const filteredExercises = this.exerciseJson.filter((it :any) => {
              const formattedName = it.name.toLowerCase().replace(/\s/g, '')
              const formattedSearch = this.filterValue.toLowerCase().replace(/\s/g, '')
              return formattedName.includes(formattedSearch)
          })

          return filteredExercises
      }
    },
    data() {
        return {
            exerciseJson: [] as any[],
            filterValue: ''
        }
    },
    async mounted() {
      const { data } = await axios.get('http://localhost:3000/exercises')
      this.exerciseJson = data;
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
    .post-outer-div {
        margin: 0 auto;
        padding: 0 0 0 0;
        overflow: auto;
        width: 100%;
        height: 100%;
        max-width: 800px;
        background-color: #000000;
    }
    .header {
      padding: 0 5px;
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
      width: 100%;
    }
    .header div ion-icon {
      color: var(--bs-gray-base);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 150%;
      cursor: pointer;
    }
    .header a {
      cursor: pointer;
      color: var(--theme-purple);
      padding: 7px;
      margin-right: 5px;
    }
</style>