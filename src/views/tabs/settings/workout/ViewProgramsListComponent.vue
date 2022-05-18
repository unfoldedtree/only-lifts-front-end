<template>
  <div class="post-outer-div">
    <div class="header">
      <div>
        <ion-icon @click="closeModal()" :icon="close" />
        <ion-label>View Programs</ion-label>
      </div>
    </div>

    <div class="post-content">
      <div class="program" v-for="(program , index) in programsList" v-bind:key="program.id" @click="openViewModal(program)" v-bind:program="program" v-bind:index="index">
        <div class="program-name">{{ program.name }}</div>
        <div class="program-description">{{ program.description }}</div>
        <div class="program-tags">
          <div class="program-tag" v-for="tag in program.tags" v-bind:key="tag">{{ tag }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { workoutStore } from '@/stores/workoutInfo'
import {
  ellipsisHorizontal,
  chevronBackOutline,
  thumbsUp,
  mail,
  send,
  close,
  pizza,
  settingsOutline,
} from "ionicons/icons";
import { modalController, IonIcon, IonLabel } from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
import ViewProgramComponent from "./ViewProgramComponent.vue";
import EditProgramComponent from "./EditProgramComponent.vue";

export default defineComponent({
  components: {
    IonIcon,
    IonLabel
  },
  setup() {
    return {
      thumbsUp,
      mail,
      ellipsisHorizontal,
      chevronBackOutline,
      send,
      close,
      pizza,
      settingsOutline,
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    async openViewModal(program: any):Promise<any> {
      let query = Object.assign({}, this.$route.query);
      query.id = program.id;
      await this.$router.push({ query });
      const modal = await modalController
          .create({
            component: ViewProgramComponent,
            cssClass: 'fullscreen',
            swipeToClose: false,
            componentProps: {
              program: program
            }
          })

      await modal.present()
      const { data } = await modal.onDidDismiss();

      if (data) {
        await this.openEditModal(data)
      } else {
        await this.removeIdQuery();
      }
    },
    async removeIdQuery() {
      const query = Object.assign({}, this.$route.query);
      query.view = 'view-programs';
      delete query["id"]
      await this.$router.push({ query })
    },
    async openEditModal(program: any) {
      await this.$router.push({ query: { view: 'edit-program', id: program.id } })
      const modal = await modalController
          .create({
            component: EditProgramComponent,
            cssClass: 'fullscreen',
            swipeToClose: false,
            componentProps: {
              program: program
            }
          })
      await modal.present();
      await modal.onDidDismiss();
      await this.removeIdQuery();
    },
    async getPrograms() {
      const { data } = await axios.get('http://localhost:3000/workouts')
      this.programsList = data
    }
  },
  data() {
    return {
      programsList: [] as any[]
    }
  },
  async mounted() {
    await this.getPrograms()

    if (this.$route.query.view == 'view-programs' && this.$route.query.id) {
      const foundProgram = this.programsList.filter((it: any) => it.id == this.$route.query.id)[0]
      if (foundProgram) {
        await this.openViewModal(foundProgram)
      }
    }
    else if (this.$route.query.view == 'edit-program' && this.$route.query.id) {
      const foundProgram = this.programsList.filter((it: any) => it.id == this.$route.query.id)[0]
      if (foundProgram) {
        await this.openEditModal(foundProgram)
      }
    }
  }
});
</script>

<style>
.fullscreen {
  --height: 100%;
  --width: 100%;
}
.fullscreen .ion-page {
  height: 100%;
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
  padding: 12px 5px;
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
}
.header div ion-icon {
  color: var(--bs-gray-base);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  cursor: pointer;
  margin-right: 7px;
}
.header a {
  cursor: pointer;
  color: var(--theme-purple);
  padding: 7px;
  margin-right: 5px;
}
.program {
  margin-bottom: 10px;
  padding: 15px 10px;
  background-color: transparent;
  border-bottom: var(--theme-bg-1) solid 1px;
}
.program-name {
  font-size: 110%;
}
.program-description {
  margin: 10px 0 12px 0;
}
.program-tags {
  display: flex;
  flex-direction: row;
}
.program-tag {
  padding: 3px 7px;
  margin-right: 7px;
  border-radius: 25px;
  background-color: var(--theme-purple);
}
</style>