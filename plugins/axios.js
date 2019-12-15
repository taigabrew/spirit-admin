import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import { useAuthStore } from '~/store/auth'

Vue.use(VueCompositionApi)
const authStore = useAuthStore()

export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (authStore.state.token) {
      config.headers.common.Authorization = `Bearer ${authStore.state.token}`
    }
    return config
  })
}
