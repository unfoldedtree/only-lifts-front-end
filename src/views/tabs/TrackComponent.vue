<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Track</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false">
      <calendar-view
          :items="getHistoryItems"
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
      <track-totals :stats="getSumData"></track-totals>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, modalController } from '@ionic/vue';
  import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
  import { defineComponent } from 'vue';
  import "../../../../workout-app-vue/node_modules/vue-simple-calendar/dist/style.css";
  import "../../../../workout-app-vue/node_modules/vue-simple-calendar/static/css/default.css"
  import { workoutStore } from "@/stores/workoutInfo";
  import PastWorkoutModalComponent from "@/views/tabs/train/workouts/modals/view-workout/PastWorkoutModalComponent";
  import TrackTotals from "@/views/tabs/track/TrackTotals";

  export default defineComponent({
    components: {
      TrackTotals,
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
        stats: {
          totalWorkouts: 0
        }
      }
    },
    computed: {
      getHistoryItems: function () {
        return workoutStore.state.workoutHistory.map((it) => {
          return {
            id: it._id,
            title: it._id,
            startDate: new Date(+it.finishedTimestamp)
          }
        })
      },
      getSumData: function () {
        const workouts = workoutStore.state.workoutHistory;
        let exercises = workouts.map(it => it.exercises).flat()
        let sets = exercises.map(it => it.sets).flat();

        let totalWorkouts = workouts.length;
        let totalSets = sets.length;
        let totalReps = sets.map(it => it.reps).reduce((a, b) => a + b, 0);
        let totalVolume = sets.map(it => it.reps * it.weight).reduce((a, b) => a + b, 0)
        let averageVolume = (totalVolume / workouts.length)

        return {
          totalWorkouts: this.formatNumbers(totalWorkouts),
          totalSets: this.formatNumbers(totalSets),
          totalReps: this.formatNumbers(totalReps),
          totalVolume: this.formatNumbers(totalVolume),
          averageVolume: this.formatNumbers(averageVolume)
        }
      }
    },
    methods: {
      formatNumbers(number) {
        if (number > 10000) {
          return `${Math.round(((number / 1000) + Number.EPSILON) * 100) / 100}K`
        } else {
          return `${Math.round(((number) + Number.EPSILON) * 100) / 100}`
        }
      },
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

  .cv-day.today {
    background-color: var(--bs-text-muted) !important;
  }

  .cv-day.outsideOfMonth {
    background-color: var(--theme-bg-1) !important;
  }

  .cv-day.hasItems {
    background-color: var(--theme-purple) !important;
  }

  .cv-item {
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