<template>
  <header class="bg-white">
    <div class="container mx-auto flex items-center relative px-8">
      <NuxtLink to="/" class="focus-outline flex items-center bg-transparent">
        <figure class="w-6 h-6 md:mr-3 bg-indigo-600 rounded-sm" />
        <h1
          class="hidden md:block font-bold text-lg leading-none text-gray-700"
        >
          Умная помощь
        </h1>
      </NuxtLink>

      <ul class="flex ml-4 sm:ml-8">
        <li>
          <NuxtLink to="/person/" class="block c-btn rounded-none py-4"
            >Обвиняемые</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/sessions/" class="block c-btn rounded-none py-4"
            >Заседания</NuxtLink
          >
        </li>
      </ul>

      <button
        @click="logout"
        class="absolute right-8 top-1/2 align-vertical flex items-center focus-outline"
      >
        <Icon name="icon-door-o" class="w-6 h-6 md:mr-2 text-gray-600" />
        <span class="hidden md:block">Выйти</span>
      </button>
    </div>
  </header>
</template>

<script>
import Icon from '~/components/layout/Icon'

import { useAuthStore } from '~/store/auth'

export default {
  components: { Icon },
  setup(props, { root }) {
    const authStore = useAuthStore()
    /** Refs */
    /** Template refs */
    /** Computed */
    /** Functions */
    const logout = function() {
      if (localStorage.token) localStorage.removeItem('token')
      authStore.state.isAuthorized = false
      root.$router.replace('/login')
    }

    return {
      logout
    }
  }
}
</script>
