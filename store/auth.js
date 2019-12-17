import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { createStore } from 'pinia'

Vue.use(VueCompositionApi)

const token = localStorage.token || null

export const useAuthStore = createStore(
  'auth',
  () => ({
    isAuthorized: Boolean(token),
    token
  }),
  {}
)

const store = useAuthStore()

export function authorize(token) {
  store.state.isAuthorized = true
  localStorage.token = token
}

export function logout() {
  store.state.isAuthorized = false
  if (localStorage.token) localStorage.removeItem('token')
}
