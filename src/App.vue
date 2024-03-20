<!-- <script setup lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
const router = useRouter();

let route = ref(window.location.pathname)

watch(() => route.value, (newValue) => {
  alert(newValue)
  route.value = newValue
});


const logout = () => {
  router.push('/')
  localStorage.removeItem("userData");
}


</script> -->

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Header from '@/pages/Layout/Header.vue'
export default defineComponent({
  components: {
    Header
    },


  setup() {

    
    return {
      
    }
  }

})
</script>


<template>
  
<!-- <Header /> -->
  <RouterView />
</template>

<style lang="scss">




</style>
