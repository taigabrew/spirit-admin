import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

import { useAuthStore } from '~/store/auth'

Vue.use(VueCompositionApi)
const authStore = useAuthStore()

export default function({ redirect, route, from }) {
  const isAuthorized = authStore.state.isAuthorized

  if (!isAuthorized) {
    if (route.path !== '/login/') return redirect('/login/')
  }

  if (isAuthorized) {
    if (route.path === '/login/') return redirect('/')
  }
}
