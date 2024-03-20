<template>

<section>
    <div class="header">
      <h5 class="mb-0">Vue Project</h5>
      <!-- <p>Logout</p> -->
      <img src="/src/assets/Icons/logouticon.svg" alt="" @click="logout">
    </div>
  </section>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

export default defineComponent({


    setup() {

        const router = useRouter();

        let route = ref(window.location.pathname)
       


        const logout = () => {
            router.push('/')
            localStorage.removeItem("userData");
        }
        return {
            logout,
            route,
        }
    }

})
</script>

<style lang="scss" scoped>

.header {
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
margin-bottom: 30px;

  h4 {
    margin-bottom: 0;
  }
}</style>