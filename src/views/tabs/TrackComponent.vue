<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Track</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <calendar-view
          :items="historyItems"
          :show-date="showDate"
          @click-item="clickItem"
      >
        <template #header="{ headerProps }">
          <calendar-view-header
              :header-props="headerProps"
              @input="setShowDate"
          />
        </template>
      </calendar-view>
    </ion-content>
  </ion-page>
</template>

<script>
  import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, modalController} from '@ionic/vue';
  import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
  import { defineComponent } from 'vue';
  import "../../../../myApp/node_modules/vue-simple-calendar/dist/style.css";
  import "../../../../myApp/node_modules/vue-simple-calendar/static/css/default.css"
  import {workoutStore} from "@/stores/workoutInfo";
  import PastWorkoutModalComponent from "@/views/tabs/train/workouts/modals/view-workout/PastWorkoutModalComponent";
  import {Workout} from "@/models/workout";

  export default defineComponent({
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      CalendarView,
      CalendarViewHeader,
    },
    data: function() {
      return {
        showDate: new Date(),
        historyItems: workoutStore.state.workoutHistory.map((it) => {
          return {
            id: it._id,
            title: it._id,
            startDate: new Date(it.finishedTimestamp)
          }
        })
      }
    },
    methods: {
      setShowDate(d) {
        this.showDate = d;
      },
      clickItem(e) {
        const pastWorkout = workoutStore.state.workoutHistory.filter((it) => it._id === e.id)[0]
        this.openModal(pastWorkout)
      },
      async openModal(workout) {
        const modal = await modalController.create({
          component: PastWorkoutModalComponent,
          componentProps: {
            pastWorkout: workout
          },
          cssClass: "fullscreen",
          swipeToClose: false,
        });

        this.$router.replace({
          query: { id: workout._id },
        });

        await modal.present();

        await modal.onDidDismiss()

        this.$router.push(this.$route.path);
        location.hash = "";
      },
    },
    mounted() {
      if (this.$route.query.id) {
        const foundDay = workoutStore.state.workoutHistory.filter((it) => {
          return it._id === this.$route.query.id
        })

        if (foundDay.length > 0) {
          this.openModal(foundDay[0])
        } else {
          this.$router.push(this.$route.path);
        }
      }
    },
  });
</script>

<style>
  .cv-wrapper {
    height: auto;
    min-height: auto;
    max-height: max-content;
    width: 95%;
    margin: 10px auto 0 auto;
    background-color: var(--theme-bg-1);
  }

  .cv-header {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 5px;
  }

  .cv-header, .cv-header button {
    border-color: #000000 !important;
  }

  .cv-day, .cv-header button {
    background-color: var(--card-background) !important;
  }

  .cv-header button {
    border-radius: 25px;
    margin: 0 3px;
    padding: 6px 12px;
  }

  .cv-day.hasItems {
    background-color: red !important;
  }

  .cv-day.today {
    background-color: var(--theme-purple) !important;
  }

  .outsideOfMonth {
    background-color: var(--theme-bg-1) !important;
  }

  .cv-item {
    /*display: none;*/
    top: 0 !important;
    height: 100%;
    opacity: 0;
  }

  .cv-wrapper .cv-header-days, .cv-header-day, .cv-weeks, .cv-week, .cv-day, .cv-item {
    border-style: solid;
    border-color: black !important;
  }

  ion-datetime {
    width: 100%;
    max-width: 800px;
  }
</style>