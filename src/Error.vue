<script setup>
import { ref, reactive, onMounted } from 'vue'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref(null)
const message = computed(() => route.query.message)
const status = computed(() => route.query.status)

onMounted(() => {
    try {
        const userDataString = Cookies.get('userData')
        console.log(userDataString)
        if (userDataString) {
            router.push('/jobs')
        }
    } catch (err) {        
        console.log(err.message);
        console.log(message);
    }
})

</script>

<template>
    <div class="container-fluid">
        <div class="card d-flex position-absolute top-50 start-50 translate-middle bg-white shadow border-3 rounded">
            <div class="col">
                <div class="card-body col mt-2 justify-content-end">                     
                     <div class="d-flex">
                         <span class="font-monospace">{{ message !== undefined ? message : "Упс...Что-то пошло не так!" }}</span>                        
                     </div>
                     <div class="d-flex">
                         <span class="font-monospace">{{ status }}</span>
                     </div>
                </div>                
                <div class="d-flex m-2 justify-content-center">
                    <router-link to="/" class="font-monospace">Попробовать снова</router-link>
                </div>
                <div v-if="loading" class="loading">Загрузка...</div>
            </div>
        </div>
    </div>
</template>