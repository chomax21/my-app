<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import Cookies from 'js-cookie'

const form = reactive({
    login: ''
})

const jobList = ref([[]])
const testData = ref(null)
const login = ref(false)
const error = ref(null)
const message = ref(null)
const data = ref(null);


onMounted(async () => {
    try {
        const userDataString = Cookies.get('userData')
        console.log(userDataString)
        if (!userDataString) {
            router.push('/')
        } else {
            let response = await api.get(
                'api/jobs', {}
            )
            if (response.status == 200) {
                testData.value = response.data
            }
        }
    } catch (err) {
        error.value = err.response?.data?.message || err.message
        console.log(err);
    }
})

async function logout(){
    Cookies.remove('userData')
    router.push('/')
}
</script>

<template>
    <div class="container-fluid">
        <div class="position-absolute top-50 start-50 translate-middle">
            <div class="d-flex">
                <div class="col">
                    <h3>СПИСОК ЗАДАЧ!</h3>
                </div>                
            </div>
            <div class="d-flex">
                <div class="d-flex mt-3 justify-content-center">
                    <!-- <button type="submit" class="btn btn-success shadow">Создать</button> -->
                    <router-link class="btn btn-success shadow" to="/create-jobs">Создать</router-link>
                </div>
            </div>
            <div class="d-flex">
                <div class="d-flex mt-3 justify-content-center">
                    <!-- <router-link to="/">Назад</router-link> -->
                     <a v-on:click="logout" href="/">Выйти</a>
                </div>
            </div>
        </div>
    </div>
</template>