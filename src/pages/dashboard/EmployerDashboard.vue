<template>
    <div class="overall-bg">
        <b-container class="form-white-bg px-5 employerdetails">
            <b-row>
                <b-col class="pb-3">
                    <h4>Employee Dashboard</h4>
                </b-col>
            </b-row>
            <div class="">
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">Employee ID :</p>
                    <p class="names">{{ employeedata && employeedata.id }}</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">Name :</p>
                    <p class="names">{{ employeedata && employeedata.name }}</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">Role :</p>
                    <p class="names">Employee</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">TL :</p>
                    <p class="names">{{ tlname && tlname.name }}</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">Process :</p>
                    <p class="names">{{ employeedata && employeedata.process }}</p>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/userstore';

export default defineComponent({
    setup() {
        const employeedata = ref<any>(null);
        const tlname = ref<any>(null);
        const userStore = useUserStore();
        const storevalue = ref(userStore.userArray);

        onMounted(() => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                employeedata.value = JSON.parse(userData);
                if (employeedata.value && employeedata.value.selectedTL) {
                    tlname.value = storevalue.value.find(option => option.id === employeedata.value.selectedTL);
                } else {
                    console.error('Error: userData or selectedTL is missing.');
                }
            } else {
                console.error('Error: userData not found in localStorage.');
            }
        });

        return {
            employeedata,
            tlname,
        }
    }
})
</script>

<style lang="scss" scoped>
.dashboardlabel {
    color: #999999;
}

.names {
    text-transform: capitalize;
}

.employerdetails {
    width: max-content;
    margin: 30px 50px;
}
</style>
