<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref(null)

onMounted(() => {
    try {
        const userDataString = Cookies.get('userData')
        console.log(userDataString)
        if (userDataString) {
            router.push('/jobs')
        }
    } catch (err) {
        error.value = err.response?.data?.message || err.message
        console.log(err);
    }
})

</script>

<template>
    <div class="container-fluid">
        <div class="d-flex position-absolute top-50 start-50 translate-middle bg-dark">
            <div class="col">
                <div class="d-flex mt-2 justify-content-end">
                    <span class="font-monospace">Упс...Что-то пошло не так!</span>
                </div>                
                <div class="d-flex m-2 justify-content-center">
                    <router-link to="/" class="font-monospace">Попробовать снова</router-link>
                </div>
                <div v-if="loading" class="loading">Загрузка...</div>
            </div>
        </div>
    </div>
</template>