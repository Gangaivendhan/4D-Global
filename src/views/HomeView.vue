<template>
  <b-container>
    <div class="loginform">
      <b-card>
        <h5>Login Form</h5>
        <b-form @submit.prevent="isSubmit">
          <b-row>
            <b-col>
              <label for="name">Email</label>
              <b-form-input v-model="isForm.email" type="email" required></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <label for="name">Password</label>
              <b-form-input v-model="isForm.password" type="password" required></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex justify-content-end">
              <b-button variant="outline-primary" type="submit">Login</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </div>
    <div class="toastposition">
      <b-toast :no-auto-hide="true" id="login-toast" v-model="toastShow" :title="toastTitle" :variant="toastVariant" :append-to-body="true" class="toast-right">{{ toastMessage }}</b-toast>
    </div>
  </b-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from '../stores/userstore';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const storevalue = ref(userStore.userArray);
    const isForm = ref({
      email: '',
      password: '',
    });
    const toastShow = ref(false);
    const toastTitle = ref('');
    const toastMessage = ref('');
    const toastVariant = ref('');

    const isSubmit = () => {
      let loggedIn = false;

      for (let i = 0; i < storevalue.value.length; i++) {
        const element = storevalue.value[i];
        if (isForm.value.email === element['email'] && isForm.value.password === element['password']) {
          loggedIn = true;
          if (element.selectedRole === 1) {
            router.push('/EmployerDashboard');
          } else if (element.selectedRole === 2) {
            router.push('/TLDashboard');
          } else if (element.selectedRole === 3) {
            router.push('/AdminDashboard');
          }
          localStorage.setItem('userData', JSON.stringify(element));
          break;
        }
      }

      if (!loggedIn) {
        showToast('Invalid credentials. Please try again.', 'Error', 'danger'); // Show toast if credentials are invalid
      }
    };

    const showToast = (message, title, variant) => {
      toastMessage.value = message;
      toastTitle.value = title;
      toastVariant.value = variant;
      toastShow.value = true;
    };

    return {
      isForm,
      isSubmit,
      toastShow,
      toastTitle,
      toastMessage,
      toastVariant,
      showToast
    }
  }
})
</script>

<style lang="scss">
.loginform {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 475px;
    padding: 15px;
    margin: 15px;
  }

  .toast-right {
    top: 20px;
    right: 20px;
  }
}

.toastposition{
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
