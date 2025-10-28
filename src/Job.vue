<script setup>
import { ref, reactive, onMounted, onUpdated } from 'vue'
import api from '@/services/api'
import VueSelect from "vue3-select-component";
import Cookies from 'js-cookie'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: false
  },
  type: {
    type: Number
  }
})

onMounted(async () => {
  try {

    console.log(props.id)
    
    let cookieData = Cookies.get('userData')
    
    if (cookieData === undefined) {
      router.push('/')
    } else {
      const userData = JSON.parse(cookieData)
      form.CreatedBy = userData.login
      const response = await api.get(
        'api/users', {
        params: {
          login: userData.login
        }
      })

      const users = response.data
      const selectUsers = []

      Cookies.set('usersDataList',
        users.usersDict
        , {
          expires: 1,
          secure: false,
          sameSite: 'strict'
        })
      
      for (let user of Object.entries(users.usersDict)) {
        selectUsers.push({ label: user[1], value: user[0] })
      }
      userList.value = selectUsers
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  }
})

onUpdated(() => {
  const usersDataList = JSON.parse(JSON.stringify(Cookies.get('usersDataList')))
  if (usersDataList === undefined || usersDataList === null) {
    const selectUsers = []
    for (let user of Object.entries(usersDataList)) {
      selectUsers.push({ label: user[1], value: user[0] })
    }
    userList.value = selectUsers
  }
  else {
    router.push('/')
  }
})

async function submitForm() {
  error.value = null
  message.value = null

  try {
    const response = await api.post(
      'api/job',
      {
        "id": null,
        "status": form.Status,
        "createdBy": form.CreatedBy,
        "assignedTo": form.AssignedTo,
        "title": form.Title,
        "description": form.Description,
        "createdAt": null,
        "updatedAt": null
      }
    )
    if (response.data.status == 200) {

    }

  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}

const form = reactive({
  Title: '',
  Description: '',
  Status: '',
  CreatedBy: '',
  AssignedTo: '',
  CreatedAt: '',
  UpdatedAt: ''
})

const route = useRoute()
const router = useRouter()
const currentuser = ref("")
const loading = ref(false)
const error = ref(null)
const message = ref(null)
const userList = ref([])
const classes = ref({
  container: 'w-full max-w-md',
  control: 'border-0 border-gray-200 hover:border-gray-300',
  valueContainer: 'p-1',
  placeholder: 'text-gray-400',
  singleValue: 'text-gray-800 font-medium',
  multiValue: 'bg-blue-100 rounded-md',
  multiValueLabel: 'text-blue-800 px-2 py-1',
  multiValueRemove: 'hover:bg-blue-200 px-2',
  inputContainer: 'p-',
  searchInput: 'text-gray-700',
  menuContainer: 'mt-1 border border-gray-200 rounded-md shadow-lg',
  menuOption: 'px-3 py-2 hover:bg-gray-100',
  noResults: 'text-gray-500 p-3',
  taggableNoOptions: 'text-blue-600 p- hover:bg-blue-50',
})
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
            <textarea class="form-control shadow p-3 bg-body rounded" v-model="form.Description" style="height: 300px"
              type="text" required></textarea>
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Статус задачи</span>
          </div>
          <div class="d-flex">
            <VueSelect class="form-control shadow bg-body rounded font-monospace" v-model="form.Status" :options="[
              { label: 'ToDo', value: '1' },
              { label: 'InProgress', value: '2' },
              { label: 'Do', value: '3' },
            ]" placeholder="Статус задачи" required :classes="classes" />
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Создатель</span>
          </div>
          <div class="d-flex">
            <input class="form-control shadow p-3 bg-body rounded font-monospace" v-model="form.CreatedBy" type="text" readonly />
          </div>
          <div class="d-flex mt-2 justify-content-end">
            <span class="font-monospace">Назначена</span>
          </div>
          <div class="d-flex">
            <VueSelect class="form-control shadow  bg-body rounded custom-select font-monospace" v-model="form.AssignedTo"
              :options="userList" placeholder="Выбрать пользователя" required :classes="classes" />
          </div>
          <div class="d-flex mt-3 justify-content-center font-monospace">
            <button type="submit" class="btn btn-success  shadow">Создать</button>
          </div>
          <div class="d-flex mt-3 justify-content-center font-monospace">
            <router-link to="/jobs">Назад</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>