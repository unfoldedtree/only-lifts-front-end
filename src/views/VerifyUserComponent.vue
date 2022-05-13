<template>
  <ion-page>
    <ion-content>
      <div class="outer">
        <div class="inner">
          <div class="title">VERIFY</div>
<!--          <div class="intro">-->
<!--            <span>NEW TO WORKOUT APP?&nbsp;</span>-->
<!--            <span class="signup-text">SIGN UP FOR FREE</span>-->
<!--          </div>-->
          <ion-item class="email-div">
            <ion-label position="stacked">Code</ion-label>
            <ion-input v-model="code" placeholder="Enter email code here..."></ion-input>
          </ion-item>
<!--          <ion-item class="password-div">-->
<!--            <ion-label position="stacked">Password</ion-label>-->
<!--            <ion-input v-model="pass" type="password" placeholder="Enter password here..."></ion-input>-->
<!--          </ion-item>-->
<!--          <div class="forgot-div">-->
<!--            <div>-->
<!--              <ion-label>REMEMBER ME</ion-label>-->
<!--              <ion-checkbox color="tertiary"></ion-checkbox>-->
<!--            </div>-->
<!--            <a @click="goToReset">FORGOT?</a>-->
<!--          </div>-->
          <ion-button class="login-standard" expand="full" color="tertiary" @click="verify">REGISTER</ion-button>
<!--          <div class="or-label">OR</div>-->
<!--          <ion-button class="login-other" expand="full" color="danger">LOG IN WITH GOOGLE</ion-button>-->
<!--          <ion-button class="login-other" expand="full" color="primary">LOG IN WITH FACEBOOK</ion-button>-->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonLabel, IonItem, IonInput, IonButton, IonPage, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from "axios";

export default defineComponent({
  components: {
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonPage,
    IonContent
  },
  data() {
    return {
      code: '',
      email: this.$route.params.username,
    }
  },
  methods: {
    async verify() {
      const { data } = await axios.post('http://localhost:3000/auth/send-reset-code', { username: this.email, code: this.code })
      console.log(data)
      if (data) {
        await this.$router.push({ name: 'login' })
      }
    }
  },
  mounted() {
    console.log(this.$route.params.username)
  }
});
</script>

<style scoped>
  .outer {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .inner {
    padding: 10px;
    width: 100%;
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 190%;
    padding: 20px 0 10px 0;
    margin-bottom: 10px;
  }
  .intro {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
  .intro .signup-text {
    cursor: pointer;
    color: var(--theme-purple);
  }
  .email-div {
    margin-bottom: 20px;
    padding: 0;
    --padding-start: 0;
    --padding-end: 0;
  }
  .password-div {
    margin-bottom: 10px;
    padding: 0;
    --padding-start: 0;
    --padding-end: 0;
  }
  .forgot-div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .forgot-div div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
  }
  .forgot-div div ion-label {
    margin-left: 10px;
  }
  .forgot-div a, .forgot-div div {
    font-size: 90%;
    color: #bbbbbb;
  }
  .login-standard {
    margin-top:  50px;
  }
  .login-other {
    margin-bottom: 15px;
  }
  .or-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    /*color: var(--bs-text-muted);*/
    color: #bbbbbb;
  }
</style>