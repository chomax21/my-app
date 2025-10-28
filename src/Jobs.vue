<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import Cookies from 'js-cookie'
import draggable from 'vuedraggable'
import { useRouter } from 'vue-router'

const router = useRouter()
const testData = ref(null)
const login = ref(false)
const error = ref(null)
const message = ref(null)
const data = ref(null)
const jobs = ref([])

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
                jobs.value = JSON.parse(JSON.stringify(response.data))
                console.log(jobs.value)
            }
        }
    } catch (err) {
        error.value = err.response?.data?.message || err.message
        console.log(err);
    }
})

function logout() {
    Cookies.remove('userData')
    Cookies.remove('usersDataList')
    router.push('/')
}

function UpdateJob(jobId) {
    router.push({
        name: 'job',
        params: { id: jobId }
    })
}
</script>

<template>
    <div class="container-fluid">
        <div class="position-relative py-2 px-4 shadow border-3 rounded mt-5">
            <div class="d-flex justify-content-center align-items-center">
                <draggable v-model="jobs" item-key="id">
                    <template #item="{ element }">
                        <div class="border border-3 rounded m-1 p-2 font-monospace">
                            <p>
                                <strong>Заголовок: </strong> {{ element.title }}
                            </p>
                            <p>
                                <strong>Описание: </strong>{{ element.description }}
                            </p>
                            <p class="p-0 m-0">
                                <strong>Статус:</strong> [{{ element.status.statusCode }}][{{ element.status.statusName
                                }}]
                            </p>
                            <p class="p-0 m-0">
                                <strong>Создано: </strong> {{ element.createdAt }}
                            </p>
                            <p class="p-0 m-0">
                                <strong>Обновлено: </strong> {{ element.updatedAt }}
                            </p>
                            <p class="p-0 m-0">
                                <strong>Создатель: </strong> {{ element.createdBy.login }}
                            </p>
                            <p class="p-0 m-0">
                                <strong>Назначена: </strong> {{ element.assignedTo.login }}
                            </p>
                            <div class="col offset-md-9 ">
                                <button v-on:click="UpdateJob(element.id)" class="btn btn-secondary m-0 p-0">Редактировать</button>
                            </div>
                        </div>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="position-relative py-2 px-4 mt-5">
            <div class="col">
                <div class="d-flex">
                    <div class="col align-self-center offset-md-5">
                        <div class="d-flex mt-3 ">
                            <router-link class="btn btn-success shadow font-monospace" to="/job">Добавить новую
                                задачу</router-link>
                        </div>
                        <div class="d-flex mt-3 ms-5 ps-4 font-monospace">
                            <a v-on:click="logout" href="/">Выйти</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>