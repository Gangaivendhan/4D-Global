<template>
    <div class="overall-bg">
        <b-container class="form-white-bg px-5">
            <b-row>
                <b-col class="pb-3">
                    <h4>Welcome Admin!{{ employeedata && employeedata.name }}</h4>
                </b-col>
                <b-col>
                    <div class="d-flex align-items-center gap-2 float-end">
                        <b-button size="sm" variant="primary" @click="$router.push('/userCreation')">Add
                            Employee</b-button>
                    </div>
                </b-col>
            </b-row>
            <div v-for="item in overalldata" :key="item.tlname" class="mt-2">
                <div class="d-flex align-items-center gap-2">
                    <p class="dashboardlabel">TL Name :</p>
                    <p class="names">{{ item?.tlname }}</p>
                </div>
                <div class="d-flex justify-content-end">
                    <!-- Search input field moved inside the loop -->
                    <b-form-input v-model="item.searchText" placeholder="Type to search"
                        class="w-25 my-3"></b-form-input>
                </div>
                <b-table :items="filteredData(item)" :fields="fields" :border="true" striped bordered hover responsive>
                    <template v-slot:cell(action)="data">
                        <div>
                            <b-dropdown :id="item?.data.id" text="Action" class="mt-0">
                                <b-dropdown-item @click="edititems(data)">Edit</b-dropdown-item>
                                <b-dropdown-item @click="deleteitems(data)">Delete</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template v-slot:cell(role)="data">
                        <p>Employee</p>
                    </template>
                </b-table>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from '../../stores/userstore';

export default defineComponent({
    setup() {
        const router = useRouter();
        const employeedata = ref<any>(null);
        const userStore = useUserStore();
        const storevalue = ref(userStore.userArray);
        let tlarray: any = ref([])
        let copytlarray: any = ref([])

        const fields = ref([
            { key: 'id', label: 'Employer Id' },
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'process', label: 'Process' },
            { key: 'action', label: '' },
        ]);

        onMounted(() => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                employeedata.value = JSON.parse(userData);
                copytlarray.value = storevalue.value.filter((i) => i.selectedRole === 2)
                console.log(copytlarray.value);
                for (let i = 0; i < copytlarray.value.length; i++) {
                    const element = copytlarray.value[i]['id'];
                    tlarray.value.push(element)
                }
                console.log(tlarray.value);
            } else {
                console.error('Error: userData not found in localStorage.');
            }
            filterDatas()
        });

        let overalldata: any = ref([]);

        const filterDatas = () => {
            if (!overalldata.value) {
                overalldata.value = [];
            }

            storevalue.value.forEach(item => {
                if (item && tlarray.value.includes(item.selectedTL)) {
                    if (!overalldata.value[item.selectedTL]) {
                        overalldata.value[item.selectedTL] = {
                            tlname: '',
                            data: []
                        };
                    }
                    overalldata.value[item.selectedTL].tlname = storevalue.value.find(i => i.id === item.selectedTL)?.name || '';
                    overalldata.value[item.selectedTL].data.push(item);
                }
            });

            overalldata.value = overalldata.value.filter(item => item !== null);
            console.log(overalldata.value);
        }

        const filteredData = (item) => {
            return item.data.filter(entry => {
                const searchRegex = new RegExp(item.searchText, 'i');
                return searchRegex.test(entry.name);
            });
        };

        const edititems = (data) => {
            console.log(data['item']);
            router.push({
                path: "/userCreation",
                query: {
                    EmployerId: data['item'].id,
                },
            });
        }

        const deleteitems = (data) => {
            console.log(data['item']);
            let deleteddata = data['item']
            deleteddata.status = 0
            console.log(deleteddata);
            userStore.addUser(deleteddata);
            storevalue.value = userStore.userArray
            window.location.reload();
        }

        return {
            employeedata,
            tlarray,
            overalldata,
            edititems,
            deleteitems,
            fields,
            filteredData
        }
    }
})
</script>

<style lang="scss" scoped>
.names {
    text-transform: capitalize;
}
.dashboardlabel {
  color: #999999;
}


</style>
