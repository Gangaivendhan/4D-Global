<template>
  <div class="overall-bg">
    <b-container class="form-white-bg px-5">
      <b-row>
        <b-col class="pb-3">
          <h4>Team Leader Dashboard</h4>
        </b-col>
      </b-row>
      <div class="d-flex align-items-center gap-2">
        <p class="dashboardlabel">Name :</p>
        <p class="names">{{ employeedata && employeedata.name }}</p>
      </div>
      <div v-if="filteredItems.length > 0">
        <div class="d-flex justify-content-end">
          <b-form-input v-model="searchTerm" placeholder="Type to search" class="w-25 my-3"></b-form-input>
        </div>
        <b-table :items="filteredItems" :fields="fields" striped bordered hover responsive>
        </b-table>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useUserStore } from '../../stores/userstore';
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const employeedata = ref<any>(null);
    const userStore = useUserStore();
    const storevalue = ref(userStore.userArray);
    const searchTerm = ref('');
    const fields = [
      { key: 'id', label: 'Employee Id' },
      { key: 'name', label: 'Name' },
      { key: 'selectedRole', label: 'Role' },
      { key: 'process', label: 'Process' },
    ];

    onMounted(() => {
      const userData = localStorage.getItem('userData');
      if (userData) {
        employeedata.value = JSON.parse(userData);
      } else {
        console.error('Error: userData not found in localStorage.');
      }
      loadList();
    });

    const loadList = () => {
      storevalue.value = userStore.userArray;
      if (employeedata.value) {
        storevalue.value = storevalue.value.filter(i => i.selectedTL === employeedata.value.id);
      }
    };

    const filteredItems = computed(() => {
      const searchTermLowerCase = searchTerm.value.toLowerCase();
      return storevalue.value.filter(item =>
        item.name.toLowerCase().includes(searchTermLowerCase)
      );
    });

    return {
      employeedata,
      searchTerm,
      filteredItems,
      fields,
    };
  }
});
</script>

<style lang="scss" scoped>
.dashboardlabel {
  color: #999999;
}

.names {
  text-transform: capitalize;
}
</style>