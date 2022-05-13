<template>
  <div class="all-time-outer">
    <div class="stat-row">
      <div>All time stats</div>
    </div>
    <div class="stat-row">
      <div class="stat-col">
        <div class="stat-label">Workouts</div>
        <div class="stat-data">{{ stats.totalWorkouts || 0 }}</div>
      </div>
      <div class="stat-col">
        <div class="stat-label">Rest Days</div>
        <div class="stat-data">{{ stats.totalRestDays || 0 }}</div>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-col">
        <div class="stat-label">Total Sets</div>
        <div class="stat-data">{{ stats.totalSets || 0 }}</div>
      </div>
      <div class="stat-col">
        <div class="stat-label">Total Reps</div>
        <div class="stat-data">{{ stats.totalReps || 0 }}</div>
      </div>
    </div>
    <div class="stat-row">
      <div class="stat-col">
        <div class="stat-label">Total Volume</div>
        <div class="stat-data">{{ stats.totalVolume || 0}}</div>
      </div>
      <div class="stat-col">
        <div class="stat-label">Avg. Volume</div>
        <div class="stat-data">{{ stats.averageVolume || 0}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    props: ["stats"]
  })
</script>

<style scoped>
  .all-time-outer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
  }

  .stat-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .stat-col {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .stat-label {
    width: 60%;
  }
  .stat-data {
    width: 40%;
  }
</style>