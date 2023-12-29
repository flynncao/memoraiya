import type { Axios, AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import type { App } from 'vue'
import { notify } from '@kyvg/vue3-notification'

function init(axios: Axios) {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_SERVICE_URL ? import.meta.env?.VITE_BASE_SERVICE_URL : 'http://20.2.221.94:9001/'
  axios.defaults.timeout = 10000
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      notify({
        type: 'success',
        title: 'Success',
        text: response.data.message,
      })
      return response
    },
    (error: AxiosError) => {
      notify({
        type: 'error',
        title: 'Error',
        text: error.message,
      })
      return Promise.reject(error)
    },
  )
}

export default {
  install: (app: App) => {
    init(axios)
    app.config.globalProperties.$axios = axios
    app.provide<Axios>('axios', axios)
  },
}
