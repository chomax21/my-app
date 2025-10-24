<script setup>
import { ref, reactive } from 'vue'
import api from '@/services/api'

const form = reactive({
    login: ''
})

const JobList = ref([[]])
const testData = ref(null)

onMounted(async() => {
    try {
        const userDataString = Cookies.get('userData')
        console.log(userDataString)
        if (!userDataString) {
            router.push('/')
        } else {
            let response = await api.get(
                'api/jobs', {}
            )
            if(response.status == 200){
                
            }
        }
    } catch (err) {
        error.value = err.response?.data?.message || err.message
        console.log(err);
    }
})

const login = ref(false)
const error = ref(null)
const message = ref(null)
const data = ref(null);


</script>

<template>
    <div class="container-fluid bg-color-dark">
        <div>
            <div class="d-flex position-absolute top-50 start-50 translate-middle">
                <div class="col">
                    {{  }}
                </div>
            </div>
        </div>
    </div>
</template>