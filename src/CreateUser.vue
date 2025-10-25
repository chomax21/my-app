<script setup>
import { ref, reactive } from 'vue'
import api from '@/services/api'

const form = reactive({
  Login: '',
  Name: '',
  SurName: '',
  LastName: '',
  Position: '',
  Password: '',
})

const loading = ref(false)
const error = ref(null)
const message = ref(null)


async function submitForm() {
  error.value = null
  message.value = null
  

  try {
    const response = await api.post(
      'api/user',
      form
    )

  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container-fluid bg-color-dark">
    <div class="d-flex position-absolute top-50 start-50 translate-middle">
      <form @submit.prevent="submitForm">
        <div class="col"><label for="login"></label>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Логин</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.Login" type="text" required/>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Имя</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.Name" type="text" required/>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Фамилия</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.SurName" type="text" required/>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Отчество</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.LastName" type="text" required/>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Должность</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.Position" type="text" required/>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Пароль</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded" v-model="form.Password" type="text" required/>
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