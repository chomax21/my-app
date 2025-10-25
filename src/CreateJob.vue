<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/services/api'
import VueSelect from "vue3-select-component";
import Cookies from 'js-cookie'

onMounted(async () => {
  try {
    const userDataString = JSON.parse(Cookies.get('userData'))
    if (userDataString === undefined || userDataString === null) {
      router.push('/')
    } else {
      form.CreatedAt = userDataString.login
      const response = await api.get(
        'api/users', {
        params: {
          login: userDataString.login
        }
      }
      )
      const users = response.data
      const selectUsers = []
      for (let user of Object.entries(users.usersDict)) {
        selectUsers.push({label: user[1], value: user[0]})
      }
      userList.value = selectUsers
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  }
})

const form = reactive({
  Title: '',
  Description: '',
  Status: '',
  CreatedBy: '',
  AssignedTo: '',
  CreatedAt: '',
  UpdatedAt: ''
})

const loading = ref(false)
const error = ref(null)
const message = ref(null)
const userList = ref(null)

async function submitForm() {
  error.value = null
  message.value = null

  try {
    const response = await api.post(
      'api/users', {}
    )

  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex position-absolute top-50 start-50 translate-middle">
      <form @submit.prevent="submitForm">
        <div class="col"><label for="login"></label>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Заголовок</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.Title" type="text" required />
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Описание</span>
          </div>
          <div class="d-flex">
            <textarea class="form-control shadow p-3 bg-body rounded" v-model="form.Name" style="height: 300px"
              type="text" required></textarea>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Статус задачи</span>
          </div>
          <div class="d-flex">
            <VueSelect class="form-control shadow p-3 bg-body rounded" v-model="form.Status" :options="[
              { label: 'ToDo', value: '1' },
              { label: 'InProgress', value: '2' },
              { label: 'Do', value: '3' },
            ]" placeholder="Статус задачи" required />
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Создатель</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.CreatedAt" type="text" readonly />
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Назначена</span>
          </div>
          <div class="d-flex">
            <VueSelect class="form-control shadow p-3 bg-body rounded" v-model="form.AssignedTo" :options="userList" placeholder="Выбрать пользователя" required />
          </div>
          <div class="d-flex mt-3 justify-content-center">
            <button type="submit" class="btn btn-success  shadow">Создать</button>
          </div>
          <div class="d-flex mt-3 justify-content-center">
            <router-link to="/">Назад</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>