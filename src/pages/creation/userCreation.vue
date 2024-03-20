<template>
    <div class="overall-bg">
        <b-container class="form-white-bg px-5">
            <!-- Header -->
            <b-row>
                <b-col class="d-flex align-items-center gap-2">
                    <i class="pi pi-arrow-left" style="color: #3096FF;"></i>
                    <p class="mb-0 blue-txt" @click="$router.push('/AdminDashboard')">Back to dashboard</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="pb-3">
                    <h4>User Creation</h4>
                </b-col>
            </b-row>

            <!-- Form -->
            <b-form @submit.prevent="isSubmit">
                <b-row>
                    <b-col lg="4" md="4" sm="12" cols="12">
                        <label for="name">Name</label>
                        <b-form-input v-model="isForm.name" :required="true"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="4" md="4" sm="12" cols="12">
                        <label for="range-1">Role </label>
                        <b-form-select v-model="isForm.selectedRole" :options="roleoption"
                            :required="true"></b-form-select>
                    </b-col>
                    <b-col lg="4" md="4" sm="12" cols="12" v-if="isForm.selectedRole === 1">
                        <label for="range-1">TL </label>
                        <b-form-select v-model="isForm.selectedTL" :options="tloptions"
                            :required="isForm.selectedRole === 1 ? true : false"></b-form-select>
                    </b-col>
                </b-row>
                <b-row v-if="isForm.selectedRole !== 3">
                    <b-col lg="4" md="4" sm="12" cols="12">
                        <label for="range-1">Process </label>
                        <b-form-input v-model="isForm.process" :disabled="processdisabled"
                            :required="isForm.selectedRole === 3 ? false : true"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg="4" md="4" sm="12" cols="12">
                        <label for="range-1">Email </label>
                        <b-form-input v-model="isForm.email" type="email" :required="true"></b-form-input>
                    </b-col>
                    <b-col lg="4" md="4" sm="12" cols="12">
                        <label for="range-1">Password </label>
                        <b-form-input v-model="isForm.password" type="password" :required="true"></b-form-input>
                    </b-col>
                </b-row>
                <!-- Submit button -->
                <b-row>
                    <b-col class="d-flex justify-content-end">
                        <b-button type="submit" variant="outline-primary">{{ btnlabel }}</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
    </div>

</template>


<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../../stores/userstore';

export default defineComponent({
    setup() {

        onMounted(() => {
            if (route.query.EmployerId) {
                isEdit(route.query.EmployerId)
                btnlabel.value = 'Update'

            }
        })

        const router = useRouter();
        const route = useRoute();
        const userStore = useUserStore();
        const storevalue = ref(userStore.userArray); // Use ref to make the value reactive
        let processdisabled = ref(false)
        const isForm = ref({
            id: 0,
            name: "",
            selectedRole: 0,
            selectedTL: 0,
            process: '',
            email: '',
            password: '',
        });
        const copyisFormModel = JSON.parse(JSON.stringify(isForm.value));
        const btnlabel = ref('Create');

        const tloptions: any = ref([])
        const roleoption = ref([
            { text: "Employee", value: 1 },
            { text: "TL", value: 2 },
            { text: "Admin", value: 3 },
        ]);


        const LoadTL = () => {
            debugger;
            tloptions.value = storevalue.value.filter((i: any) => i.selectedRole === 2).map((i: any) => {
                i.text = i.name;
                i.value = i.id;
                return i;
            });
        }

        watch(() => isForm.value.selectedRole, (newValue, oldValue) => {
            if (isForm.value.selectedRole === 1) {
                LoadTL()
                // alert('pp')
            }
        });

        watch(() => isForm.value.selectedTL, (newValue, oldValue) => {
            handleSelectChange()
        });

        const handleSelectChange = () => {
            debugger;
          if(tloptions.value.length > 0){
            const selectedOption = tloptions.value.find(option => option.id === isForm.value.selectedTL);
            if (selectedOption) {
                isForm.value.process = selectedOption.process;
                processdisabled.value = true;
            } else {
                console.error('No option found for selectedTL:', isForm.value.selectedTL);
            }
          }
        };

        const isEdit = (data) => {
            debugger;
            let datavalue = storevalue.value.find(option => option.id === Number(data));
            console.log(datavalue);
            Object.keys(isForm.value).forEach((key) => {
                if (datavalue[key]) isForm.value[key] = datavalue[key];
            });
        }

        const isSubmit = () => {
            if (route.query.EmployerId) {
                userStore.addUser(isForm.value);
            isForm.value = { ...isForm.value };
            Object.assign(isForm.value, copyisFormModel);
            }else{
                debugger;
            isForm.value.id = storevalue.value.length + 2;
            userStore.addUser(isForm.value);
            isForm.value = { ...isForm.value };
            Object.assign(isForm.value, copyisFormModel);
        }
        router.push('/AdminDashboard')

        };

        return {
            isForm,
            btnlabel,
            storevalue,
            isSubmit,
            roleoption,
            tloptions,
            handleSelectChange,
            processdisabled,
        };
    }
});
</script>

<style lang="scss" scoped>
/* Your styles here */
</style>