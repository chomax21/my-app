<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'


const form = reactive({
    login: '',
    password: ''
})

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const message = ref(null)
const data = ref(null);
const userData = ref(null);


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

async function signIn() {
    loading.value = true
    error.value = null
    message.value = null

    try {
        data.value = ''
        let response = await api.get(
            'api/user', {
            params: {
                login: form.login,
                password: form.password
            }
        }
        )

        if (response.status === 200) {
            data.value = response
            console.log(JSON.parse(JSON.stringify(data.value.data)))
            userData.value = JSON.parse(JSON.stringify(data.value.data))
            
            const userinfo = JSON.stringify({
                    login: userData.value.login,
                    name: userData.value.name,
                    sname: userData.value.sname,
                    lname: userData.value.lname,
                    password: userData.value.password
                })

            Cookies.set('userData', 
                userinfo
               ,{
                expires: 1,
                secure: false,
                sameSite: 'strict'
            })
            router.push('/jobs')
        }


    } catch (err) {
        error.value = err.response?.data?.message || err.message
        console.log(err);
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="container-fluid bg-color-dark">
        <form @submit.prevent="signIn">
            <div class="d-flex position-absolute top-50 start-50 translate-middle">
                <div class="col">
                    <div class="d-flex mt-2 justify-content-end">
                        <span class="font-monospace">Логин</span>
                    </div>
                    <div class="d-flex">
                        <input class="form-control shadow p-3 bg-body rounded" v-model="form.login" type="text"
                            required />
                    </div>
                    <div class="d-flex mt-2 justify-content-end">
                        <span class="font-monospace">Пароль</span>
                    </div>
                    <div class="d-flex">
                        <input class="form-control shadow p-3 bg-body rounded" v-model="form.password" type="password"
                            required />
                    </div>
                    <div class="d-flex m-2 justify-content-center">
                        <button type="submit" class="btn btn-success m-2 shadow">Войти</button>
                    </div>
                    <div class="d-flex m-2 justify-content-center">
                        <router-link to="/create-user" class="font-monospace">Новый пользователь</router-link>
                    </div>
                    <div v-if="loading" class="loading">Загрузка...</div>
                </div>
            </div>
        </form>
    </div>
</template>